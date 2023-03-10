import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../contextApi/Authcontext";

const Navbar = () => {
  const { logout, user } = useContext(myContext);

  return (
    <div>
      <h2>Navbar page</h2>
      {user?.email ? (
        <button onClick={logout}>LogOut</button>
      ) : (
        <Link to="/login">Login Now</Link>
      )}
    </div>
  );
};

export default Navbar;
