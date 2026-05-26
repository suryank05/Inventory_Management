import Login from "../Component/Authentication/Login";
import LoginAction from "../Component/Authentication/LoginAction";
import Register from "../Component/Authentication/Register";
import RegisterAction from "../Component/Authentication/RegisterAction";


export const Authentication={
    path:"auth",
    children:[
        {
            index:true,
            action:LoginAction,
            element:<Login />
        },
        {
            path: "register",
            element: <Register />,
            action: RegisterAction
        }
    ]
}

