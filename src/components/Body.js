import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { addUser,removeUser } from "../utils/userSlice";

const Body = () => {
    const dispatch=useDispatch();
    

    const appRouter = createBrowserRouter([
        {
            path: "/browse",
            element: <Browse />
        },
        {
            path: "/",
            element: <Login />
        }
    ]);

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                const {uid, email, displayName, photoURL}=user;
                dispatch(addUser({
                    uid:uid, 
                    email:email, 
                    displayName:displayName, 
                    photoURL: photoURL
                }));
                
            }
            else{
                dispatch(removeUser());
               
            }
        });
    },[]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};

export default Body;
