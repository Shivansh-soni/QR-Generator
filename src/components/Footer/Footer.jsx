import React from "react";
const Footer = () => {
  return (
    <div className="footer -mt-20 flex flex-col items-center">
      <p
        className="text-center -mt-4 mb-4 font-bold text-[#333333] cursor-pointer"
        onClick={() => (window.location.href = "https://shivanshsoni.in")}
      >
        Made with ❤️ by Shivansh Soni
      </p>{" "}
    </div>
  );
};

export default Footer;
