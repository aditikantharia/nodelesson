import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/userContext";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [setError] = useState("");

  const { userdata } = useContext(userDataContext);

  useEffect(() => {
    if (userdata) {
      setFormData({ username: userdata.username, email: userdata.email });
    }
  }, [userdata]);

  const navigate = useNavigate();

  async function SubmitForm() {
    console.log("Form Submitted");

    try {
      let response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      let err = error.response;
      setError(err);
      console.log(error.response);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            Edit Profile
          </h1>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            SubmitForm();
          }}
        >
          {/* {error && (
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
          )} */}

          {/* Username Field */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-white/50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder:text-slate-400 text-sm"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-5 py-4 bg-white/50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder:text-slate-400 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-4 bg-slate-900 text-white text-sm font-semibold rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
          >
            Edit Profile
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <div className="mt-6 pt-6 border-t border-slate-200/50">
            <p className="text-sm text-slate-500">
              Go to Back :
              <Link
                to="/profile"
                className="text-slate-900 font-semibold hover:underline"
              >
                Profile
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
