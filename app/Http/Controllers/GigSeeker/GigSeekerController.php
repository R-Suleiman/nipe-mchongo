<?php
namespace App\Http\Controllers\GigSeeker;
use App\Helpers\ErrorHandler;
use App\Http\Controllers\Controller;
use App\Models\Gig;
use App\Models\GigApplication;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Log;
class GigSeekerController extends Controller
{
    public function gigSeekerDashboard()
    {
        $gigApplications = GigApplication::where('gig_seeker_id', '=', 1);
        return response()->json(data: $gigApplications);
    }
    public function getGigs(Request $request)
    {
        $seekerId = $request->query('seeker_id');
        $category = $request->query('category');
        $title = $request->query('title');

        $query = Gig::select(
            'gigs.id',
            'gigs.gig_poster_id as poster_id',
            'gigs.title',
            'gigs.description',
            'gigs.payment',
            'gigs.location',
            'users.firstname as gig_poster_first_name',
            'users.lastname as gig_poster_last_name',
            'gig_categories.name as gig_category_name',
            DB::raw("EXISTS (
            SELECT 1 FROM gig_applications
            WHERE gig_applications.gig_id = gigs.id
            AND gig_applications.gig_seeker_id = {$seekerId}
        ) as has_applied")
        )
            ->join('users', 'gigs.gig_poster_id', '=', 'users.id')
            ->join('gig_categories', 'gigs.gig_category_id', '=', 'gig_categories.id')
            ->orderBy('gigs.created_at', 'desc');

        if ($category) {
            $query->where('gig_categories.name', $category);
        }

        if ($title) {
            $query->where('gigs.title', 'like', '%' . $title . '%');
        }

        return $query->get();
    }

    public function storeGigApplication(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gig_id' => 'required|exists:gigs,id',
            'user_id' => 'required|exists:users,id',
            'poster_id' => 'required|exists:users,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }
        if (
            GigApplication::where('gig_seeker_id', $request->user_id)
                ->where('gig_id', $request->gig_id)
                ->exists()
        ) {
            return response()->json(['errors' => ['You have already applied for this gig.']], 422);
        }
        $validated = $validator->validated();
        try {
            $application = GigApplication::create([
                'gig_id' => $validated['gig_id'],
                'gig_seeker_id' => $validated['user_id'],
                'gig_poster_id' => $validated['poster_id'],
                'application_status_id' => 3,
            ]);
            return response()->json([
                'message' => 'Application submitted successfully',
                'data' => $application,
            ], 201);
        } catch (Exception $e) {
            return ErrorHandler::handleException($e);
        }
    }
    public function cancelGigApplication($id)
    {
        // Find the application
        $application = GigApplication::find($id);// Check if application exists
        if (!$application) {
            return response()->json(['error' => 'Application not found'], 404);
        }
        // Delete the application
        $application->delete();
        return response()->json(['message' => 'Controller says, Application cancelled successfully'], 200);
    }
    public function gigSeekerApplications($id)
    {
        $gigApplications = DB::table('gig_applications')
            ->where('gig_seeker_id', '=', $id)
            ->leftJoin('gigs', 'gig_applications.gig_id', '=', 'gigs.id')
            ->leftJoin('users', 'gigs.gig_poster_id', '=', 'users.id')
            ->leftJoin('gig_categories', 'gigs.gig_category_id', '=', 'gig_categories.id')
            ->leftJoin('gig_application_statuses', 'gig_applications.application_status_id', '=', 'gig_application_statuses.id')
            ->select(
                'users.id as user_id',
                'gig_applications.id',
                'gig_applications.gig_id',
                'gig_applications.gig_seeker_id',
                'gig_applications.gig_poster_id',
                'gig_applications.created_at',
                'gig_application_statuses.name as application_status',
                'gig_categories.name as gig_category_name',
                'gigs.title as gig_title',
                'gigs.description as gig_description',
                'gigs.payment as gig_payment',
                'gigs.location as location',
                'users.firstname as gig_poster_first_name',
                'users.lastname as gig_poster_last_name'
            )
            ->orderBy('gig_applications.created_at', 'desc')
            ->get();

        return response()->json($gigApplications);
    }

    public function recentGigApplications(Request $request)
    {
        $seekerId = $request->query('seeker_id'); // Ensure seeker_id is passed correctly
        $applications = DB::table('gig_applications')
            ->where('gig_seeker_id', '=', $seekerId)
            ->leftJoin('gigs', 'gig_applications.gig_id', '=', 'gigs.id')
            ->leftJoin('users', 'gigs.gig_poster_id', '=', 'users.id')
            ->leftJoin('gig_categories', 'gigs.gig_category_id', '=', 'gig_categories.id')
            ->leftJoin('gig_application_statuses', 'gig_applications.application_status_id', '=', 'gig_application_statuses.id')
            ->select(
                'gig_applications.id',
                'gig_applications.gig_id',
                'gig_applications.gig_seeker_id',
                'gig_applications.gig_poster_id',
                'gig_applications.created_at',
                'gig_application_statuses.name as application_status',
                'gig_categories.name as gig_category_name',
                'gigs.title as gig_title',
                'gigs.description as gig_description',
                'gigs.payment as gig_payment',
                'gigs.location as location',
                'users.firstname as gig_poster_first_name',
                'users.lastname as gig_poster_last_name'
            )
            ->orderBy('gig_applications.created_at', 'desc')
            ->get();

        return response()->json($applications);
    }

    // gig categories
    public function searchGigs(Request $request)
    {
        $query = DB::table('gigs')
            ->select('gigs.id', 'gigs.title');
        if ($request->has('title') && $request->title !== '') {
            $query->where('gigs.title', 'LIKE', '%' . $request->title . '%');
        }
        return response()->json($query->orderBy('gigs.created_at', 'desc')->get());
    }
}
