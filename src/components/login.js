import Header from "./Header";

const Login = () => {
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
        <form className="w-3/12 p-12 bg-black bg-opacity-70 rounded-lg text-white">
          <h1 className="font-bold text-3xl pb-4">Sign In</h1>
          <input
            type="text"
            placeholder="Email Address"
            className="p-2 my-4 w-full bg-gray-800 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-800 text-white"
          />

          <button className="p-4 my-6 w-full bg-red-700 hover:bg-red-800 rounded-lg">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;