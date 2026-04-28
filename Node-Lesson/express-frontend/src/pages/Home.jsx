import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <Link to="/login">
          <button className="w-full bg-black/50 px-4 py-2 font-bold">
            Go to Login Page
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
