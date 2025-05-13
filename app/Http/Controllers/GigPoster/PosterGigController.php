<?php

namespace App\Http\Controllers\GigPoster;

use App\Http\Controllers\Controller;
use App\Models\Gig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PosterGigController extends Controller
{
    public function getJobs(Request $request)
    {
        $search = $request->search;
        $page = $request->input('page');

        $query = Gig::with('applications', 'status')->where('gig_poster_id', Auth::user()->id);
        if ($search) {
            $query->where('title', 'LIKE', "%{$search}%")
                ->orWhereHas('status', function ($query) use ($search) {
                    $query->where('name', 'LIKE', "%{$search}%");
                });

        }
        $jobs = $query->orderBy('created_at', 'desc')->paginate(12);

        return response()->json(['success' => true, 'jobs' => $jobs]);
    }
}
