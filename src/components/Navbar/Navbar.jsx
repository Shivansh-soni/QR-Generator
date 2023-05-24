import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="navbar mb-5 bg-base-100 lg:px-20 justify-center">
        <div className="flex-1">
          <img
            className="w-28 mt-2"
            src="https://cdn.jsdelivr.net/gh/Tejas2805/EkkoAssets/common/ekko_navbar.svg"
            alt=""
          />
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
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
