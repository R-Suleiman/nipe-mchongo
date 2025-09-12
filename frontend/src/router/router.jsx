import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
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
import JobSeekerLayout from "../layouts/JobSeekerLayout";
import JobSeekerPurchasePoints from "../pages/JobSeeker/balance/JobSeekerPurchasePoints";
import SeekerMchongoPoints from "../pages/JobSeeker/balance/SeekerMchongoPoints";
import AboutGig from "../pages/JobSeeker/AboutGig";
import Signup from "../pages/auth/Signup";
import OtpVerification from "../pages/auth/OtpVerification";
import ForgotPassword from "../pages/auth/password-reset/ForgotPassword";
import PasswordResetOtpVerification from "../pages/auth/password-reset/PasswordResetOtpVerification";
import ResetPassword from "../pages/auth/password-reset/ResetPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";
import ProtectedAuthRoute from "../components/ProtectedAuthRoute";
import PaymentSuccess from "../pages/JobPoster/balance/PaymentSuccess";
import Transactions from "../pages/JobPoster/balance/Transactions";
import AdminTransactions from "../pages/Admin/mchongoPoints/AdminTransactions";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: (
            <ProtectedAuthRoute>
                <Login />
            </ProtectedAuthRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <ProtectedAuthRoute>
                <Signup />
            </ProtectedAuthRoute>
        ),
    },
    {
        path: "/verify-otp",
        element: (
            <ProtectedAuthRoute>
                <OtpVerification />
            </ProtectedAuthRoute>
        ),
    },
    {
        path: "/forgot-password",
        element: (
            <ProtectedAuthRoute>
                <ForgotPassword />
            </ProtectedAuthRoute>
        ),
    },
    {
        path: "/verify-password-reset-otp",
        element: (
            <ProtectedAuthRoute>
                <PasswordResetOtpVerification />
            </ProtectedAuthRoute>
        ),
    },
    {
        path: "/reset-password",
        element: (
            <ProtectedAuthRoute>
                <ResetPassword />
            </ProtectedAuthRoute>
        ),
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },

    // Job Poster
    {
        path: "/jobposter",
        element: (
            <ProtectedRoute allowedUser="poster">
                <JobPosterLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "account",
                element: <Account />,
            },
            {
                path: "account/edit",
                element: <AccountForm />,
            },
            {
                path: "jobs",
                element: <Jobs />,
            },
            {
                path: "jobs/:id",
                element: <Job />,
            },
            {
                path: "jobs/create",
                element: <JobsForm />,
            },
            {
                path: "jobs/:id/edit",
                element: <JobsEditForm />,
            },
            {
                path: "applications",
                element: <Applications />,
            },
            {
                path: "applications/:id",
                element: <Application />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "points",
                element: <MchongoPoints />,
            },
            {
                path: "purchase-points",
                element: <PurchasePoints />,
            },
            {
                path: "payment-success",
                element: <PaymentSuccess />,
            },
            {
                path: "transactions",
                element: <Transactions />,
            },
        ],
    },

    {
        path: "/job/seeker",
        element: (
            <ProtectedRoute allowedUser="seeker">
                <JobSeekerLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "dashboard",
                element: <JobSeekerDashboard />,
            },
            {
                path: "my-applications",
                element: <MyApplications />,
            },
            {
                path: "about-gig/:id",
                element: <AboutGig />,
            },
            {
                path: "search-jobs",
                element: <SearchJobs />,
            },
            {
                path: "my-balance",
                element: <SeekerMchongoPoints />,
            },
            {
                path: "purchase-points",
                element: <JobSeekerPurchasePoints />,
            },
            {
                path: "update-profile",
                element: <UpdateProfile />,
            },
            {
                path: "settings",
                element: <JobSeekerSettings />,
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },

    // admin
    {
        path: "/",
        element: (
            <ProtectedRoute allowedUser="admin">
                <AdminLayout />
            </ProtectedRoute>
        ),
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
                path: "/admin/transactions",
                element: <AdminTransactions />,
            },
            {
                path: "/admin/users/blocked-users",
                element: <BlockedUsers />,
            },
        ],
    },
]);

export default Router;
