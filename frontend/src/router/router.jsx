import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import PageNotFound from '../pages/PageNotFound'
import JobPosterLayout from '../layouts/JobPosterLayout'
import Jobs from '../pages/JobPoster/jobs/Jobs'
import Job from '../pages/JobPoster/jobs/Job'
import Applications from '../pages/JobPoster/applications/Applications'
import Application from '../pages/JobPoster/applications/Application'
import Settings from '../pages/JobPoster/settings/Settings'
import Account from '../pages/JobPoster/account/Account'
import AccountForm from '../pages/JobPoster/account/AccountForm'
import Dashboard from '../pages/JobPoster/Dashboard'
import JobsForm from '../pages/JobPoster/jobs/JobsForm'
import JobsEditForm from '../pages/JobPoster/jobs/JobsEditForm'
import MchongoPoints from '../pages/JobPoster/balance/MchongoPoints'
import PurchasePoints from '../pages/JobPoster/balance/PurchasePoints'
import JobSeekerDashboard from '../pages/JobSeeker/JobSeekerDashboard'
import MyApplications from '../pages/JobSeeker/MyApplications'
import SearchJobs from '../pages/JobSeeker/SearchJobs'
import MyAccount from '../pages/JobSeeker/MyAccount'
import UpdateProfile from '../pages/JobSeeker/UpdateProfile'
import JobSeekerSettings from '../pages/JobSeeker/JobSeekerSettings'

const Router = createBrowserRouter([
    {
        path: '/login',
        element: <Home />
    },
    // Job Poster
    {
        path: '/',
        element: <JobPosterLayout />,
        children: [
            {
                path: '/jobposter/dashboard',
                element: <Dashboard />
            },
            {
                path: '/jobposter/account',
                element: <Account />
            },
            {
                path: '/jobposter/account/edit',
                element: <AccountForm />
            },
            {
                path: '/jobposter/jobs',
                element: <Jobs />
            },
            {
                path: '/jobposter/jobs/:id',
                element: <Job />
            },
            {
                path: '/jobposter/jobs/create',
                element: <JobsForm />
            },
            {
                path: '/jobposter/jobs/:id/edit',
                element: <JobsEditForm />
            },
            {
                path: '/jobposter/applications',
                element: <Applications />
            },
            {
                path: '/jobposter/applications/:id',
                element: <Application />
            },
            {
                path: '/jobposter/settings',
                element: <Settings />
            },
            {
                path: '/jobposter/points',
                element: <MchongoPoints />
            },
            {
                path: '/jobposter/purchase-points',
                element: <PurchasePoints />
            }
        ]
    },
    // Job Seeker Routes
    {
        path: '/job/seeker/dashboard',
        element: <JobSeekerDashboard />
    },
    {
        path: '*',
        element: <PageNotFound />
    },
    {
        path: '/job/seeker/my-applications',
        element: <MyApplications />
    },
    {
        path: '/job/seeker/search-jobs',
        element: <SearchJobs />
    },
    {
        path: '/job/seeker/my-balance',
        element: <MyAccount />
    },
    {
        path: '/job/seeker/update-profile',
        element: <UpdateProfile />
    },
    {
        path: '/job/seeker/settings',
        element: <JobSeekerSettings />
    },
])

export default Router
