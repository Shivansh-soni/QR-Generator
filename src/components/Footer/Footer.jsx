import React, { useState } from "react";
import { BsInstagram, BsYoutube, BsFacebook, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  //   const [mail, setMail] = useState < string > "";

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const mailData = {
  //       email: mail,
  //     };
  //     axios
  //       .post(
  //         `${process.env.NEXT_PUBLIC_SERVER}/${process.env.NEXT_PUBLIC_SERVER_API_VERSION}/mail`,
  //         mailData
  //       )
  //       .then(function (response) {
  //         console.log(response);
  //         setMail("");
  //         toast.success("Added Successfully");
  //       })
  //       .catch(function (error) {
  //         console.log("ERR", error);
  //         setMail("");
  //         toast.error("Something went wrong");
  //       });
  //   };

  return (
    <div className="footer flex flex-col items-center">
      <div className="w-full  footer lg:gap-44">
        <div className="lg:w-44 w-32 ml-32 lg:pt-36 lg:mr-10">
          <img
            width={500}
            height={0}
            role="button"
            src="https://cdn.jsdelivr.net/gh/Tejas2805/EkkoAssets/common/ekko_navbar.svg"
            alt="ekko logo"
          />
        </div>
        <footer className="footer flex bg-base-100  lg:flex-row flex-col-reverse items-center lg:items-start  gap-10 lg:gap-24  p-10  text-base-content">
          <div className="flex flex-col items-center lg:items-start">
            <span className="font-bold text-black text-md">Company</span>

            <a
              href="https://ekko.network/pricing"
              className="link link-hover font-semibold"
            >
              Pricing
            </a>
            <a
              href="https://ekko.network/buy-now"
              className="link link-hover font-semibold"
            >
              Classic Cards
            </a>
            <a
              href="https://ekko.network/custom-card"
              className="link link-hover font-semibold"
            >
              Design your own card
            </a>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <span className="font-bold text-black text-md">Support</span>
            <a
              href="https://ekko.network/contact-us"
              className="link link-hover font-semibold"
              as="/contact-us"
            >
              Contact Us
            </a>
            <a
              href="https://ekko.network/faq"
              as="/faq"
              className="link link-hover font-semibold"
            >
              FAQ
            </a>
            <a
              href="https://ekko.network/privacy-policy"
              as="/privacy-policy"
              className="link link-hover font-semibold"
            >
              Privacy Policy
            </a>
            <a
              href="https://ekko.network/terms-of-use"
              as="/terms-of-use"
              className="link link-hover font-semibold"
            >
              Terms Of Use
            </a>
            <a
              href="https://ekko.network/refund-policy"
              as="/refund-policy"
              className="link link-hover font-semibold"
            >
              Refund Policy
            </a>
            <a
              href="https://ekko.network/compatible-phones"
              className="link link-hover font-semibold"
            >
              Compatible Phones
            </a>
          </div>
          <div className="flex  items-center gap-8 lg:hidden">
            <a
              href="https://www.instagram.com/ekko_network/"
              className="link link-hover font-semibold"
            >
              <BsInstagram className="text-lg" />
            </a>
            <a href="" className="link link-hover font-semibold">
              <BsYoutube className="text-lg" />
            </a>
            <a
              href="https://www.facebook.com/ekko.network/"
              className="link link-hover font-semibold"
            >
              <BsFacebook className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/company/ekko-network/"
              className="link link-hover font-semibold"
            >
              <BsLinkedin className="text-lg" />
            </a>
          </div>
          <div className="lg:flex flex-col items-center lg:items-start hidden ">
            <span className="font-bold text-black text-md">Connect</span>
            <a
              href="https://www.instagram.com/ekko_network/"
              className="link link-hover font-semibold"
            >
              Instagram
            </a>
            <a href="" className="link link-hover font-semibold">
              Youtube
            </a>
            <a
              href="https://www.facebook.com/ekko.network/"
              className="link link-hover font-semibold"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/ekko-network/"
              className="link link-hover font-semibold"
            >
              LinkedIn
            </a>
          </div>
          {/* <div className="flex flex-col ">
            <span className="font-bold text-black text-md">Newsletter</span>
            <div className="form-control lg:w-80 ">
              <label className="label">
                <span className="label-text text-center">
                  Stay updated to latest events
                </span>
              </label>
              <div className="relative ">
                <form onSubmit={handleSubmit}>
                  <input
                    value={mail}
                    type="email"
                    placeholder="email"
                    className="input input-bordered w-full pr-16"
                    onChange={(e) => setMail(e.target.value)}
                  />
                  <button
                    className="btn bg-teal-800 text-white  absolute top-0 right-0 rounded-l-none"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div> */}
        </footer>
      </div>
      <p className="text-center -mt-4 mb-4 font-bold text-black">
        Copyright © 2023 YouEkko Communications Private Limited
      </p>
      {/* <ToastContainer position="bottom-right" /> */}
    </div>
  );
};

export default Footer;
