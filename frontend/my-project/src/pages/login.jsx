import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-black px-6">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        <h2 className="text-4xl font-bold text-center text-white">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-center mt-2 mb-8">
          Login to continue generating AI captions
        </p>

        <form className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-400">
              <input type="checkbox" className="accent-indigo-500" />
              Remember me
            </label>

            <button
              type="button"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition duration-300 font-semibold text-lg text-white"
          >
            Login
          </button>
        </form>

        <div className="relative my-8">
          <div className="border-t border-white/10"></div>

          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-slate-900 px-3 text-sm text-gray-400">
            OR
          </span>
        </div>

        <div className="space-y-4">
          <button className="w-full py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition font-medium">
            Continue with Google
          </button>

          <button className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-white font-medium">
            Continue with GitHub
          </button>
        </div>

        <p className="text-center text-gray-400 mt-8">
          Don't have an account?
          <span className="text-indigo-400 ml-2 cursor-pointer hover:text-indigo-300">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;