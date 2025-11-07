<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminTransactionsController extends Controller
{
    public function mchongoPoints()
    {
        $totalPostingPoints = Transaction::where('status', 'SUCCESS')
            ->where('type', 'posting')
            ->sum('points_purchased');

        $totalApplicationPoints = Transaction::where('status', 'SUCCESS')
            ->where('type', 'applying')
            ->sum('points_purchased');

        $todaysPostingPoints = Transaction::where('status', 'SUCCESS')
            ->where('type', 'posting')
            ->whereDate('created_at', Carbon::today('Africa/Nairobi'))
            ->sum('points_purchased');

        $todaysApplicationPoints = Transaction::where('status', 'SUCCESS')
            ->where('type', 'applying')
            ->whereDate('created_at', Carbon::today('Africa/Nairobi'))
            ->sum('points_purchased');

        // Prepare months (last 12 months)
        $start = now()->subMonths(11)->startOfMonth();
        $end = now()->endOfMonth();
        $period = \Carbon\CarbonPeriod::create($start, '1 month', $end);

        $months = collect();
        foreach ($period as $date) {
            $months->put($date->format('Y-m'), [
                'month' => $date->format('Y-m'),
                'jobs' => 0,
                'applications' => 0,
            ]);
        }

        // grapgh stats
        $postingPointsGraph = Transaction::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, SUM(points_purchased) as total_points")
            ->where('status', 'SUCCESS')
            ->where('type', 'posting')
            ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m')")
            ->pluck('total_points', 'month');

        $applicationPointsGraph = Transaction::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, SUM(points_purchased) as total_points")
            ->where('status', 'SUCCESS')
            ->where('type', 'applying')
            ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m')")
            ->pluck('total_points', 'month');

        $graphData = $months->map(function ($items, $month) use ($postingPointsGraph, $applicationPointsGraph) {
            return [
                'month' => $month,
                'posting' => $postingPointsGraph[$month] ?? 0,
                'application' => $applicationPointsGraph[$month] ?? 0,
            ];
        })->values();


        return response()->json(['success' => true, 'totalPostingPoints' => $totalPostingPoints, 'totalApplicationPoints' => $totalApplicationPoints, 'todaysPostingPoints' => $todaysPostingPoints, 'todaysApplicationPoints' => $todaysApplicationPoints, 'graphData' => $graphData]);
    }

    public function getTransactions(Request $request)
    {
        $query = Transaction::with('user');

        // Parse filters
        $filters = $request->filled('filters') ? json_decode($request->filters, true) : [];

        if (!empty($filters['created_at']['value'])) {
            $date = Carbon::parse($filters['created_at']['value']);
            $query->whereDate(DB::raw("CONVERT_TZ(created_at, '+00:00', '+03:00')"), $date);
        }

        if (isset($filters['user']['value']) && $filters['user']['value']) {
            $query->whereHas('user', function ($q) use ($filters) {
                $value = '%' . $filters['user']['value'] . '%';
                $q->where('firstname', 'like', $value)
                    ->orWhere('lastname', 'like', $value);
            });
        }

        if (isset($filters['user.usertype']['value']) && $filters['user.usertype']['value']) {
            $query->whereHas('user', function ($q) use ($filters) {
                $q->where('usertype', $filters['user.usertype']['value']);
            });
        }

        if (isset($filters['points_purchased']['value']) && $filters['points_purchased']['value']) {
            $query->where('points_purchased', 'like', '%' . $filters['points_purchased']['value'] . '%');
        }

        if (isset($filters['phone_number']['value']) && $filters['phone_number']['value']) {
            $query->where('phone_number', 'like', '%' . $filters['phone_number']['value'] . '%');
        }

        if (isset($filters['channel']['value']) && $filters['channel']['value']) {
            $query->where('channel', $filters['channel']['value']);
        }

        if (isset($filters['amount']['value']) && $filters['amount']['value']) {
            $query->where('amount', 'like', '%' . $filters['amount']['value'] . '%');
        }

        if (isset($filters['collected_amount']['value']) && $filters['collected_amount']['value']) {
            $query->where('collected_amount', 'like', '%' . $filters['collected_amount']['value'] . '%');
        }

        if (isset($filters['status']['value']) && $filters['status']['value']) {
            $value = (array) $filters['status']['value']; // Handles single or array
            $query->whereIn('status', $value);
        }

        if (isset($filters['reference']['value']) && $filters['reference']['value']) {
            $query->where('reference', 'like', '%' . $filters['reference']['value'] . '%');
        }

        if (isset($filters['customer_details']['value']) && $filters['customer_details']['value']) {
            $query->where('customer_details', 'like', '%' . $filters['customer_details']['value'] . '%');
        }

        if (isset($filters['failure_reason']['value']) && $filters['failure_reason']['value']) {
            $query->where('failure_reason', 'like', '%' . $filters['failure_reason']['value'] . '%');
        }

        // Sorting (single-column)
        $sortField = $request->sortField ?? 'created_at';
        $sortOrder = $request->sortOrder == 1 ? 'asc' : 'desc';

        if ($sortField === 'user.usertype') {
            $query->join('users', 'transactions.user_id', '=', 'users.id')
                ->orderBy('users.usertype', $sortOrder)
                ->select('transactions.*'); // Avoid ambiguous columns
        } else {
            $query->orderBy($sortField, $sortOrder);
        }

        // Pagination
        $perPage = $request->rows ?? 10;
        $page = ($request->first / $perPage) + 1;

        $transactions = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $transactions,
            'total' => $transactions->total(),
            'filters' => $filters
        ]);
    }
}
