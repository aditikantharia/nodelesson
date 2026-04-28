import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/userContext";

export default function JoinUsPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUserdata } = useContext(userDataContext);

  async function SubmitForm() {
    console.log("Form Submitted");

    let UserData = { username: username, email: email, password: password };

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        UserData,
      );

      if (response.status === 200) {
        const data = response.data;

        setUserdata(data.user);
        localStorage.setItem("token", data.token);
        navigate("/profile");
      }
    } catch (error) {
      let err = error.response?.data?.erorr;
      setError(err);
      console.log(error.response?.data.erorr);
    }

    setEmail("");
    setPassword("");
    setUsername("");
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden font-sans">
      {/* Parallax Wash Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob delay-4000" />
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
          onSubmit={(e) => e.preventDefault(SubmitForm())}
        >
          {error && <div>
              {error.map((val, index)=>{
                return <p key={index} className="bg-red-50 text-red-400 text-sm p-2 text-center rounded-xl mb-2">{val.msg}</p>
              })}

            </div>}



          {/* Username Field */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
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
                setEmail(e.target.value);
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
                setPassword(e.target.value);
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
