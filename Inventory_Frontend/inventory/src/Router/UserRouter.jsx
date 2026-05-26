import { deleteUser } from "../Axions/UserAxios"
import AddUser from "../Component/User/AddUser"
import AddUserAction from "../Component/User/AddUsersAction"
import DeleteUserAction from "../Component/User/DeleteUserAction"
import GetUsers from "../Component/User/getUsers"
import UploadExcel from "../Component/User/UploadExcel"
import { UploadExcelAction } from "../Component/User/UploadExcelAction"
import userListLoader from "../Loaders/User/userListLoader"
export const UserRouter={
    path:"user",
    children:[
        {
            index:true,
            loader:userListLoader,
            element:<GetUsers></GetUsers>
        },
        {
            path:"add",
            action:AddUserAction,
            element:<AddUser></AddUser>
        },
        // {
        //     path:"update",
        //     action:UpdateUser,
        //     loader:UpdatedUsers,
        //     element:<UpdateUser></UpdateUser>
        // },
        {
            path:"delete/:id",
            action:DeleteUserAction
        },
        {
            path:"upload-excel",
            action:UploadExcelAction,
            element:<UploadExcel></UploadExcel>
        }
    ]
}