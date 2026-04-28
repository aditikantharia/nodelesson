import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/UserContext";

export default function ProfilePage() {
  const [data, setdata] = useState("");
  const [error, setError] = useState("");

  const {centerData} = useContext(DataContext);
  console.log(centerData);

  const navigate = useNavigate();

  useEffect(() => {
    const FetchData = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        console.log(localStorage.getItem("token"));
        setdata(response?.data?.user);
      } catch (error) {
        console.log(error.response);
        setError(error.response?.data?.message);
      }
    };
    FetchData();
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.setItem("token", " ");
      navigate("/login");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {error && (
        <div className="w-full h-screen flex items-center justify-center text-9xl font-bold text-red-600">
          Access Denied !!
        </div>
      )}

      {/* user profile */}
      {data.username && (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden font-sans">
          {/* Background Wash Parallax */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[20%] left-[-5%] w-80 h-80 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-slate-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob delay-2000" />
          </div>

          {/* Profile Card */}
          <div className="relative z-10 w-full max-w-sm p-10 mx-4 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col items-center text-center">
              {/* Minimal Avatar Placeholder */}
              <div className="w-24 h-24 mb-6 rounded-full bg-linear-to-tr from-slate-100 to-slate-200 flex items-center justify-center border border-white shadow-inner">
                <span className="text-2xl font-light text-slate-400">
                  {data?.username?.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* User Info */}
              <div className="space-y-1 mb-10">
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  @{data?.username}
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                  {data?.email}
                </p>
              </div>

              {/* Minimal Actions */}
              <div className="w-full space-y-3">
                <Link
                  to="/edit-profile"
                
                >
                  <button  className="w-full py-3 bg-white border border-slate-200 text-slate-900 text-sm font-medium rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98] mb-5">Edit Profile</button>
                </Link>
                <button className="w-full py-3 bg-slate-900 text-white text-sm font-medium rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-sm">
                  Account Settings
                </button>
              </div>
            </div>

            {/* Logout Link */}
            <div className="mt-10 pt-6 border-t border-slate-200/50 text-center">
              <button
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-widest"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
