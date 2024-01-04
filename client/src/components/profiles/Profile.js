import React from "react";
import { useAuth } from "../Auth/AuthContext";
import UserProfile from "./UserProfile";
import ChefProfile from "./ChefProfile";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div>
      {user.userType === "user" && <UserProfile />}
      {user.userType === "chef" && <ChefProfile />}
      {/* Add more user types if needed */}
    </div>
  );
};

// const UserDetails = ({ user }) => (
//   <div>
//     <h2>User Profile</h2>
//     <p>Name: {user.userName}</p>
//     {/* Display other user-specific details */}
//   </div>
// );

// const ChefDetails = ({ user }) => (
//   <div>
//     <h2>Chef Profile</h2>
//     <p>Name: {user.userName}</p>
//     {/* Display other chef-specific details */}
//   </div>
// );

export default Profile;
