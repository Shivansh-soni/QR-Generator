import React from "react";
import Logo from "../../assets/Logo.png";
const Navbar = () => {
  return (
    <div>
      <div className="navbar mb-5  lg:px-20 justify-center">
        <div className="flex-1">
          <img className="w-44 absolute mt-5" src={Logo} alt="" />
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-black">
            <li>
              <a href="#">Login</a>
            </li>

            <li>
              <a href="#">Create Account</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
