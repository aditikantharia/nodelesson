import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/userContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [err1, setErr1] = useState("");

  const navigate = useNavigate();
  const { setUserdata } = useContext(userDataContext);

  const userData = { email: email, password: password };

  let submitForm = async () => {
    console.log("Form Submitted");

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        userData,
      );

      if (response.status === 200) {
        const data = response.data;
console.log(data.user)
        setUserdata(data.user);
        localStorage.setItem("token", data.token);
        navigate("/profile");
      }

      setPassword("");
      setEmail("");
    } catch (error) {
      let err = error.response?.data?.error;
      setError(err);
      console.log(error.response.data.message);
      let err1 = error.response.data.message;
      setErr1(err1);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden">
      {/* Background Wash Parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-0 -right-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob delay-2000" />
        <div className="absolute -bottom-20 left-20 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob delay-4000" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm p-8 mx-4 bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-light tracking-tight text-slate-900">
            Welcome
          </h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => e.preventDefault(submitForm())}
        >
          {error && (
            <div>
              {error.map((val, index) => {
                return (
                  <p
                    key={index}
                    className="bg-red-50 text-red-400 text-sm p-2 text-center rounded-xl mb-2"
                  >
                    {val.msg}
                  </p>
                );
              })}
            </div>
          )}

          {err1 && (
            <p className="bg-red-50 text-red-400 text-sm p-2 text-center rounded-xl mb-2">
              {err1}
            </p>
          )}

          <div className="space-y-1">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className="w-full px-4 py-3 bg-white/60 border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder:text-slate-400 text-sm"
            />
          </div>

          <div className="space-y-1">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full px-4 py-3 bg-white/60 border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder:text-slate-400 text-sm"
            />
          </div>

          <button className="w-full py-3 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
            Continue
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href="#"
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            Forgot password?
          </a>
          <div className="h-px w-8 bg-slate-200"></div>
          <p className="text-xs text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/joinus"
              className="text-slate-900 font-medium hover:underline"
            >
              Join us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
