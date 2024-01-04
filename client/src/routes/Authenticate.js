import React from "react";
import Auth from "../components/Auth/Auth";

function Authenticate({ setIsLoggedIn, isLoggedIn, setUser }) {
  return (
    <>
      <Auth
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
    </>
  );
}

export default Authenticate;
