import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import JobPosterLayout from "../layouts/JobPosterLayout";
import Jobs from "../pages/JobPoster/jobs/Jobs";
import Job from "../pages/JobPoster/jobs/Job";
import Applications from "../pages/JobPoster/applications/Applications";
import Application from "../pages/JobPoster/applications/Application";
import Settings from "../pages/JobPoster/settings/Settings";
import Account from "../pages/JobPoster/account/Account";
import AccountForm from "../pages/JobPoster/account/AccountForm";
import Dashboard from "../pages/JobPoster/Dashboard";
import JobsForm from "../pages/JobPoster/jobs/JobsForm";
import JobsEditForm from "../pages/JobPoster/jobs/JobsEditForm";
import MchongoPoints from "../pages/JobPoster/balance/MchongoPoints";
import PurchasePoints from "../pages/JobPoster/balance/PurchasePoints";
import JobSeekerDashboard from "../pages/JobSeeker/JobSeekerDashboard";
import MyApplications from "../pages/JobSeeker/MyApplications";
import SearchJobs from "../pages/JobSeeker/SearchJobs";
import UpdateProfile from "../pages/JobSeeker/UpdateProfile";
import JobSeekerSettings from "../pages/JobSeeker/JobSeekerSettings";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminAccount from "../pages/Admin/account/AdminAccount";
import AdminAccountForm from "../pages/Admin/account/AdminAccountForm";
import AdminJobs from "../pages/Admin/jobs/AdminJobs";
import AdminJobsForm from "../pages/Admin/jobs/AdminJobsForm";
import AdminJobsEditForm from "../pages/Admin/jobs/AdminJobsEditForm";
import AdminJob from "../pages/Admin/jobs/AdminJob";
import AdminApplications from "../pages/Admin/applications/adminApplications";
import AdminApplication from "../pages/Admin/applications/AdminApplication";
import GigPosters from "../pages/Admin/users/gigposters/GigPosters";
import GigSeekers from "../pages/Admin/users/gigseekers/GigSeekers";
import GigPoster from "../pages/Admin/users/gigposters/GigPoster";
import GigSeeker from "../pages/Admin/users/gigseekers/GigSeeker";
import AdminMchongoPoints from "../pages/Admin/mchongoPoints/AdminMchongoPoints";
import CreateUser from "../pages/Admin/users/CreateUser";
import BlockedUsers from "../pages/Admin/users/blocked/BlockedUsers";
import Home from "../pages/Home";

const Router = createBrowserRouter([
     {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    // Job Poster
    {
        path: "/",
        element: <JobPosterLayout />,
        children: [
            {
                path: "/jobposter/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/jobposter/account",
                element: <Account />,
            },
            {
                path: "/jobposter/account/edit",
                element: <AccountForm />,
            },
            {
                path: "/jobposter/jobs",
                element: <Jobs />,
            },
            {
                path: "/jobposter/jobs/:id",
                element: <Job />,
            },
            {
                path: "/jobposter/jobs/create",
                element: <JobsForm />,
            },
            {
                path: "/jobposter/jobs/:id/edit",
                element: <JobsEditForm />,
            },
            {
                path: "/jobposter/applications",
                element: <Applications />,
            },
            {
                path: "/jobposter/applications/:id",
                element: <Application />,
            },
            {
                path: "/jobposter/settings",
                element: <Settings />,
            },
            {
                path: "/jobposter/points",
                element: <MchongoPoints />,
            },
            {
                path: "/jobposter/purchase-points",
                element: <PurchasePoints />,
            },
        ],
    },
    // Job Seeker Routes
    {
        path: "/job/seeker/dashboard",
        element: <JobSeekerDashboard />,
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
    {
        path: "/job/seeker/my-applications",
        element: <MyApplications />,
    },
    {
        path: "/job/seeker/search-jobs",
        element: <SearchJobs />,
    },
    {
        path: "/job/seeker/my-balance",
        element: <MchongoPoints />,
    },
    {
        path: "/job/seeker/update-profile",
        element: <UpdateProfile />,
    },
    {
        path: "/job/seeker/settings",
        element: <JobSeekerSettings />,
    },

    // admin
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminDashboard />,
            },
            {
                path: "/admin/account",
                element: <AdminAccount />,
            },
            {
                path: "/admin/account/edit",
                element: <AdminAccountForm />,
            },
            {
                path: "/admin/jobs",
                element: <AdminJobs />,
            },
            {
                path: "/admin/jobs/:id",
                element: <AdminJob />,
            },
            {
                path: "/admin/jobs/create",
                element: <AdminJobsForm />,
            },
            {
                path: "/admin/jobs/:id/edit",
                element: <AdminJobsEditForm />,
            },
            {
                path: "/admin/applications",
                element: <AdminApplications />,
            },
            {
                path: "/admin/applications/:id",
                element: <AdminApplication />,
            },
             {
                path: "/admin/users/create",
                element: <CreateUser />,
            },
             {
                path: "/admin/users/gig-posters",
                element: <GigPosters />,
            },
             {
                path: "/admin/users/gig-posters/:id",
                element: <GigPoster />,
            },
             {
                path: "/admin/users/gig-seekers",
                element: <GigSeekers />,
            },
              {
                path: "/admin/users/gig-seekers/:id",
                element: <GigSeeker />,
            },
             {
                path: "/admin/mchongo-points",
                element: <AdminMchongoPoints />,
            },
             {
                path: "/admin/users/blocked-users",
                element: <BlockedUsers />,
            },
        ],
    },
]);

export default Router;
