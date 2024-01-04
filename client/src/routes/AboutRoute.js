import React from "react";
import About from "../components/About";

function AboutRoute({ isLoggedIn }) {
  return (
    <div>
      <About isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default AboutRoute;
