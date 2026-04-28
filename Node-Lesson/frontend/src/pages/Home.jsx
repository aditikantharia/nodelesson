import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <Link to="/login">
          <button className="w-full bg-black text-white p-2 text-center">
            Go to Login Page
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
