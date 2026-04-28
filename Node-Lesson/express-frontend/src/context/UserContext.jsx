import { createContext, useState } from "react";

export const userDataContext = createContext();


const UserContext = ({ children }) => {
  const [userdata, setUserdata] = useState("");

  console.log(userdata);

  return (
    <>
      <userDataContext.Provider value={{ userdata, setUserdata }}>
        <div>{children}</div>
      </userDataContext.Provider>
    </>
  );
};

export default UserContext;
