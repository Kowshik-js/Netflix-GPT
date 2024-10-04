import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validation";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
        const [isSignInForm, setisSignInForm] = useState(true);
        const [errorMessage, seterrorMessage]=useState(null)
        const navigate=useNavigate();
        const dispatch=useDispatch();

        const name=useRef(null);
        const email=useRef(null);
        const password=useRef(null);

        const handleButtonClick = ()=>{       
            const message=checkValidData(email.current.value, password.current.value)
            seterrorMessage(message);

            if(message) return;
             //create new user (sign in/sign up)
             if(!isSignInForm)
             {
              //sign Up logic
            createUserWithEmailAndPassword(auth, 
              email.current.value, 
              password.current.value
            )
            .then((userCredential) => {
            // Signed up 
              const user = userCredential.user;
              
              updateProfile(user, {
                displayName: "name.current.value", 
                photoURL: "https://avatars.githubusercontent.com/u/142918527?v=4"
              }).then(() => {
                // Profile updated! 
                const {uid, email, displayName, photoURL}=auth.currentUser;
                dispatch(addUser({
                    uid:uid, 
                    email:email, 
                    displayName:displayName, 
                    photoURL: photoURL
                }));      
                navigate("/browse");

              }).catch((error) => {
                // An error occurred
                // ...
                seterrorMessage(error.message);
              });

              console.log(user);
              navigate("/");
              
            })

              .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              seterrorMessage(errorCode + "-" + errorMessage)
            });



             }else {
              //sign In logic
              signInWithEmailAndPassword(auth, 
                email.current.value, 
                password.current.value
              )
              .then((userCredential) => {
                // Signed in
                  const user = userCredential.user;
                  console.log(user);
                  navigate("/browse");
              
             })
             .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              seterrorMessage(errorCode + "-" + errorMessage)
            });
          }   
        };

        const toggleSignInForm=()=>{   
        setisSignInForm(!isSignInForm);
    };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <div className="relative">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_medium.jpg"
          alt="logo"
          className="w-full h-screen object-cover opacity-50"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <form onSubmit={(e)=> e.preventDefault()} className="w-3/12 p-12 bg-black bg-opacity-70 rounded-lg text-white">
          <h1 className="font-bold text-3xl pb-4">
            {isSignInForm ? "sign In" : "sign Up"}
          </h1>
          
          {!isSignInForm && (
          <input
          ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-800 text-white"
          />
        )}

          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-2 my-4 w-full bg-gray-800 text-white"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-800 text-white"
          />

          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

          <button 
          className="p-4 my-6 w-full bg-red-700 hover:bg-red-800 rounded-lg" 
          onClick={handleButtonClick}>
          {isSignInForm ? "sign In" : "sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "alredy registered? Sign In Now..."}
            </p>
        </form>
      </div>
    </div>
  );
};
 
export default Login;
