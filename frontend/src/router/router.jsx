import {createBrowserRouter} from  'react-router-dom'
import Home from '../pages/Home'
import PageNotFound from '../pages/PageNotFound'
import JobPosterLayout from '../layouts/JobPosterLayout'
import Jobs from '../pages/JobPoster/jobs/Jobs'
import Job from '../pages/JobPoster/jobs/Job'
import Applications from '../pages/JobPoster/applications/applications'
import Application from '../pages/JobPoster/applications/Application'
import Settings from '../pages/JobPoster/settings/Settings'
import Account from '../pages/JobPoster/account/Account'
import AccountForm from '../pages/JobPoster/account/AccountForm'
import Dashboard from '../pages/JobPoster/Dashboard'
import JobsForm from '../pages/JobPoster/jobs/JobsForm'
import JobsEditForm from '../pages/JobPoster/jobs/JobsEditForm'
import MchongoPoints from '../pages/JobPoster/balance/MchongoPoints'
import PurchasePoints from '../pages/JobPoster/balance/PurchasePoints'

const Router = createBrowserRouter([
    {
        path: '/login',
        element: <Home />
    },
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
    {
        path: '*',
        element: <PageNotFound />
    }
])

export default Router
