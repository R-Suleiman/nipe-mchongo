<?php

namespace App\Http\Controllers\GigPoster;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionsController extends Controller
{
    public function getTransactions(Request $request)
    {
        $query = Transaction::query()->where('user_id', Auth::id());

        if ($request->filled(['start_date', 'end_date'])) {
            $start = Carbon::createFromFormat('Y-m-d', $request->start_date, 'Africa/Nairobi')->startOfDay()->utc();
            $end   = Carbon::createFromFormat('Y-m-d', $request->end_date, 'Africa/Nairobi')->endOfDay()->utc();

            $query->whereBetween('created_at', [$start, $end]);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $transactions = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json([
            'transactions' => $transactions
        ]);
    }
}
