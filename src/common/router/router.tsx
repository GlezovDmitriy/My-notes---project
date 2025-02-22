import {createBrowserRouter, Navigate} from "react-router-dom";
import {App} from "../../app/App";
import {Main} from "../../app/Main";
import {Login} from "../../features/auth/ui/Login/Login";
import {Page404} from "common/components/Page404/Page404";

export const Path = {
    Main: '/',
    Login: 'login',
} as const

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: Path.Main,
                element: <Main />,
            },
            {
                path: Path.Login,
                element: <Login />,
            },
            {
                path: '*',
                element: <Navigate to={'/404'}/>,
            },
            {
                path: '/404',
                element: <Page404 />,
            },
        ],
    },
])