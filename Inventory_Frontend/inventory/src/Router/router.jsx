import App from "../App";
import GlobalError from "../GlobalElement";
import { Authentication } from "./Authentication";
import { InventoryRouter } from "./InventoryRouter";
import { UserRouter } from "./UserRouter";
import { createBrowserRouter } from 'react-router-dom'
import LandingPage from "../Component/Landing/LandingPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <GlobalError></GlobalError>,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            InventoryRouter,
            UserRouter,
            Authentication
        ]
    }
])

export default router;
