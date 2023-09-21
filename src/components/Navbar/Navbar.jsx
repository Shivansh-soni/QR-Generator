import React from "react";
import Logo from "../../assets/logo_white_1.png";
const Navbar = () => {
  return (
    <div>
      <div className="navbar mb-5  lg:px-20 justify-center items-center">
        <div className="flex-1">
          <img className="w-40 mt-2 " src={Logo} alt="" />
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <a href="tap-n.in">About Us</a>
            </li>

            <li>
              <a href="tap-n.in/auth/signup">Create Account</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
