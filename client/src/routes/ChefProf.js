import React from "react";
import ChefProfile from "../components/profiles/ChefProfile";

function ChefProf({ user }) {
  return (
    <div>
      <ChefProfile user={user} />
    </div>
  );
}

export default ChefProf;
