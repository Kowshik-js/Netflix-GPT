import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATHAR } from "../utils/constants";


const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    seterrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          // Update profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATHAR,
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL
            }));
            navigate("/browse"); // Navigate to the browse page
          }).catch((error) => {
            seterrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          const { uid, email, displayName, photoURL } = user;
          // Dispatch user info to Redux
          dispatch(addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          }));
          navigate("/browse"); // Navigate after sign-in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
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
        <form onSubmit={(e) => e.preventDefault()} className="w-3/12 p-12 bg-black bg-opacity-70 rounded-lg text-white">
          <h1 className="font-bold text-3xl pb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
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
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now..."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
