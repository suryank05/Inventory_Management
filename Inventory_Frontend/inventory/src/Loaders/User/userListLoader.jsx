import { getUser } from "../../Axions/UserAxios";

export default async function userListLoader(){
    try{
       const users= await getUser();
       return users.data;
    }
    catch(exception){
        throw new Response("Failed to load users", {
            status: 500,
        });
    }
}       