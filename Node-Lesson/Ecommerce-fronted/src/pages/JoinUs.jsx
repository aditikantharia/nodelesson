import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function JoinUsPage() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

 const navigate = useNavigate();


  const submitForm = async () => {
    console.log("Form Submitted !!");
    let userdata = { username: username, email: email, password: password };

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        userdata,
      );
      if (response.status === 200) {
        const data = response.data;

        localStorage.setItem("token", data.token);

        navigate("/login");
      }

      setusername("");
      setemail("");
      setpassword("");
    } catch (err) {
      console.log(err.response);
      const apiError = err.response?.data?.error || err.response?.data?.message || "Registration failed";
      setError(apiError);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden font-sans">
      {/* Parallax Wash Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute top-[10%] right-[-5%] w-100 h-100 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-150 h-150 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob Fdelay-4000" />
      </div>

      {/* Join Us Card */}
      <div className="relative z-10 w-full max-w-sm p-10 mx-4 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Join Us
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Create your account to get started
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          autoComplete="off"
        >
         {error &&  <div>
            {Array.isArray(error) ? (
              error.map((val, index) => (
                <p key={index} className="bg-red-50 rounded-xl p-2 w-full text-red-600 mb-2 text-center font-medium">{val.msg}</p>
              ))
            ) : (
              <p className="bg-red-50 rounded-xl p-2 w-full text-red-600 mb-2 text-center font-medium">{error}</p>
            )}
          </div>}

          {/* Username Field */}
          <div className="space-y-1">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              placeholder="Username"
              className="w-full px-5 py-4 bg-white/50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder:text-slate-400 text-sm"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Email address"
              className="w-full px-5 py-4 bg-white/50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder:text-slate-400 text-sm"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Password"
              className="w-full px-5 py-4 bg-white/50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder:text-slate-400 text-sm"
            />
          </div>

          <button className="w-full mt-2 py-4 bg-slate-900 text-white text-sm font-semibold rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            By joining, you agree to our <br />
            <a href="#" className="underline hover:text-slate-600">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-slate-600">
              Privacy Policy
            </a>
            .
          </p>

          <div className="mt-6 pt-6 border-t border-slate-200/50">
            <p className="text-sm text-slate-500">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-slate-900 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
