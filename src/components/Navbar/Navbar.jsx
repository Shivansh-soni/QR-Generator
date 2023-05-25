import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="navbar mb-5  lg:px-20 justify-center">
        <div className="flex-1">
          <img
            className="w-28 mt-2"
            src="https://ekko.network/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.75338bda.png&w=256&q=75"
            alt=""
          />
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <a>Login</a>
            </li>

            <li>
              <a>Create Account</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
