import React, { useState, useEffect, useRef } from "react";
import { FaCompass, FaFacebook, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsQrCode, BsThreeDotsVertical } from "react-icons/bs";
import { MdPhoneInTalk } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
const QRCodeStyling = require("qr-code-styling");
const QRgenerator = () => {
  const [urls, setUrls] = useState("your Website URL");
  const [inputText, setInputText] = useState("https://ekko.network");
  const ref = useRef(null);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [activeButton, setActiveButton] = useState(1);
  const [domain, setDomain] = useState("");
  const [url, setUrl] = useState("");
  const [qrColor, setqrColor] = useState("#000000");
  const [isChecked, setIsChecked] = useState(false);
  const [style, setStyle] = useState({
    color: "",
    dots: "",
    corner: "",
    backgroundColor: "",
  });
  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    // image:
    //   "https://cdn.jsdelivr.net/gh/Tejas2805/EkkoAssets/common/ekko_navbar.svg",
    dotsOptions: {
      color: `${style.color}`,
      type: `${style.dots}`,
    },
    cornersSquareOptions: {
      type: `${style.corner}`,
    },
    // backgroundOptions:{},
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20,
    },
  });
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    setInputText("");
  };
  useEffect(() => {
    qrCode.append(ref.current);
  }, [qrCode, ref]);
  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [qrCode, url]);
  const [generated, setGenerated] = useState(false);
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  useEffect(() => {
    if (inputText.includes(`${domain}`)) {
      setUrl(inputText);
    } else {
      setUrl(`${domain}${inputText}`);
    }
  }, [inputText, domain]);
  const handleSubmit = async () => {
    if (url.includes(" ")) {
      alert("spacing not allowed");
    } else {
      if (activeButton !== 1 && activeButton !== 5) {
      } else if (activeButton === 1) {
        setUrl(inputText);
      } else if (activeButton === 5) {
        setUrl(`tel:${inputText}`);
      }
    }
    setGenerated(true);
  };

  const handleDownload = (fileExt) => {
    qrCode.download({
      extension: fileExt,
    });
  };

  return (
    <>
      {/* <WebsiteNavbar /> */}
      <p className="text-4xl text-black z-50 font-bold p-10">
        QRcode Generator
      </p>
      <div className="-mt-8">
        {/* <HeadingComponent heading="QRcode Generator" /> */}
      </div>
      <div className="w-full h-screen py-10 lg:px-28  rounded-2xl">
        <div className="w-full h-full  bg-white border rounded-3xl border-gray-300  flex md:flex-row flex-col shadow-xl">
          {/* ----------------------------------------Left side of page---------------------------------------- */}
          <div className=" h-full flex-[0.7] flex flex-col justify-between p-10  text-gray-400">
            <ul className="flex flex-col  gap-5">
              <li
                className={`
                   flex items-center gap-2 hover:cursor-pointer
                   ${
                     activeButton === 1
                       ? `border-l-4 p-2 border-black text-black `
                       : `text-gray-400`
                   }
                 `}
                onClick={() => {
                  handleButtonClick(1);
                  setUrls(" your Website URL");
                  setGenerated(false);
                }}
                disabled={activeButton === 1}
              >
                <FaCompass></FaCompass>
                Website URL
              </li>
              <li
                className={`
                 flex items-center gap-2 hover:cursor-pointer
                 ${
                   activeButton === 2
                     ? `border-l-4 p-2 border-black text-black `
                     : `text-gray-400`
                 }
               `}
                onClick={() => {
                  handleButtonClick(2);
                  setUrls("Your Facebook username or link");
                  setDomain("www.facebook.com/");
                  setGenerated(false);
                }}
                disabled={activeButton === 2}
              >
                <FaFacebook></FaFacebook>
                Facebook
              </li>
              <li
                className={`
                 flex items-center gap-2 hover:cursor-pointer
                 ${
                   activeButton === 3
                     ? `border-l-4 p-2 border-black text-black `
                     : `text-gray-400`
                 }
               `}
                onClick={() => {
                  handleButtonClick(3);
                  setUrls(" your Instagram username");
                  setDomain("www.instagram.com/");
                  setGenerated(false);
                }}
                disabled={activeButton === 3}
              >
                <RiInstagramFill></RiInstagramFill>
                Instagram
              </li>
              <li
                className={`
                 flex items-center gap-2 hover:cursor-pointer
                 ${
                   activeButton === 4
                     ? `border-l-4 p-2 border-black text-black `
                     : `text-gray-400`
                 }
               `}
                onClick={() => {
                  handleButtonClick(4);
                  setUrls(" a YouTube link or channel (please include @)");
                  setDomain("www.youtube.com/@");
                  setGenerated(false);
                }}
                disabled={activeButton === 4}
              >
                <FaYoutube></FaYoutube>
                YouTube
              </li>
              <li
                className={`
                 flex items-center gap-2 hover:cursor-pointer
                 ${
                   activeButton === 5
                     ? `border-l-4 p-2 border-black text-black `
                     : `text-gray-400`
                 }
               `}
                onClick={() => {
                  handleButtonClick(5);
                  setUrls(" your phone number");
                  setGenerated(false);
                }}
                disabled={activeButton === 5}
              >
                <MdPhoneInTalk></MdPhoneInTalk>
                Phone Number
              </li>
              <li
                className={`
                 flex items-center gap-2 hover:cursor-pointer
                 ${
                   activeButton === 6
                     ? `border-l-4 p-2 border-black text-black `
                     : `text-gray-400`
                 }
               `}
                onClick={() => {
                  handleButtonClick(6);
                  setUrls(" your search term");
                  setDomain("www.google.com/search?q=");
                  setGenerated(false);
                }}
                disabled={activeButton === 6}
              >
                <BiSearchAlt2></BiSearchAlt2>
                Google Search
              </li>
            </ul>
            {/* <div className="w-full rounded-2xl flex flex-col border border-gray-300 p-5 gap-3 items-center">
               <p className="text-xs text-center">
                 Unlimited QR Codes, analytics, and more with Popl Pro
               </p>
               <button className="bg-black rounded-full text-white py-3 text-sm w-32">
                 Subscribe to Pro
               </button>
             </div> */}
          </div>
          {/* ----------------------------------------Center of the page---------------------------------------- */}
          <div className=" h-full flex-[2] border-x border-gray-300 px-10 pt-10 text-black">
            <h1 className="text-lg text-black">Enter {urls}</h1>
            <input
              value={inputText}
              onChange={handleInputChange}
              type="text"
              className="mt-5 bg-white outline-none input input-bordered border-gray-500 w-full"
            />
            {inputText && (
              <div className="flex pt-5  lg:pl-96">
                <button
                  className={`btn normal-case w-full text-sm  rounded-full  ${
                    generated
                      ? `bg-white text-black  border-solid border-black hover:bg-white btn-disabled`
                      : `bg-black text-white`
                  } `}
                  onClick={handleSubmit}
                >
                  {`${generated ? `Generated` : `Generate`}`}
                </button>
              </div>
            )}
          </div>
          {/* ----------------------------------------Right side of page ---------------------------------------- */}
          <div className=" h-full lg:w-4/12 flex-col  p-5 items-center rounded-3xl">
            <div
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              <div className="flex justify-center my-2 ">
                {generated ? (
                  <>
                    <div />
                  </>
                ) : (
                  <>
                    <div ref={ref} />
                  </>
                  // <QRCode
                  //   fgColor="#d2d2d5"
                  //   value={`${url}`}
                  //   size={100}
                  //   renderAs={"svg"}
                  //   centerImageSrc={
                  //     "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  //   }
                  //   level={"L"}
                  // />
                )}
              </div>
              <div className="mt-3 ">
                <p className="text-base mt-4">Download as</p>
              </div>
              <div className="gap-3 mt-3 flex items-center justify-between">
                <button
                  className={`btn w-24  rounded-full 	${
                    generated ? `bg-black` : `btn-disabled`
                  } text-white pt-1 `}
                  onClick={() => handleDownload("png")}
                >
                  PNG
                </button>
                <button
                  className={`btn w-24 ${
                    generated ? `bg-black` : `btn-disabled`
                  }  rounded-full  text-white pt-1 `}
                  onClick={() => handleDownload("svg")}
                >
                  SVG
                </button>
                <button
                  className={`btn w-24 rounded-full 	${
                    generated ? `bg-black` : `btn-disabled`
                  } text-white  pt-1 `}
                  onClick={() => handleDownload("pdf")}
                >
                  PDF
                </button>
              </div>
              <ul className="mt-10 flex flex-col w-full ">
                <li
                  className={`collapse collapse-arrow ${
                    generated ? ` ` : `collapse-close text-[#d2d2d5]`
                  }`}
                >
                  <input type="checkbox" className="peer " />
                  <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:bg-white peer-checked:text-black-content">
                    Style
                  </div>
                  <div className="flex items-center gap-2 collapse-content bg-white text-black-content peer-checked:bg-white peer-checked:text-black-content">
                    <button
                      className="btn btn-sm rounded-full bg-black text-white text-xs"
                      onClick={(e) => setStyle({ ...style, dots: "square" })}
                    >
                      <TbGridDots></TbGridDots> <p className=" pl-1">Squared</p>
                    </button>
                    <button
                      className="btn btn-sm rounded-full bg-black text-white text-xs"
                      onClick={(e) => setStyle({ ...style, dots: "dots" })}
                    >
                      <BsThreeDotsVertical></BsThreeDotsVertical>{" "}
                      <p className=" pl-1">Dotted</p>
                    </button>
                    <button
                      className="btn btn-sm rounded-full bg-black text-white text-xs"
                      onClick={(e) => setStyle({ ...style, dots: "classy" })}
                    >
                      <BsThreeDotsVertical></BsThreeDotsVertical>{" "}
                      <p className=" pl-1">classy</p>
                    </button>
                    {/* <input
                      type="checkbox"
                      className="cursor-pointer text-right"
                      checked={isChecked}
                      onChange={(event) => setIsChecked(event.target.checked)}
                    />
                    <label className="text-sm"> Add border</label> */}
                  </div>
                </li>
                <li
                  className={`collapse collapse-arrow ${
                    generated ? ` ` : `collapse-close text-[#d2d2d5]`
                  }`}
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:bg-white peer-checked:text-black-content">
                    Color
                  </div>
                  <div className="flex items-center gap-2 collapse-content bg-white text-black-content peer-checked:bg-white peer-checked:text-black-content">
                    <button
                      className="btn btn-xs btn-circle "
                      onClick={(e) => setStyle({ ...style, color: "#000000" })}
                    ></button>
                    <button
                      className="btn btn-error btn-xs btn-circle "
                      onClick={(e) => setStyle({ ...style, color: "#ff6161" })}
                    ></button>
                    <button
                      className="btn btn-info btn-xs btn-circle"
                      onClick={(e) => setStyle({ ...style, color: "#68abdf" })}
                    ></button>
                    <button
                      className="btn btn-warning btn-xs btn-circle"
                      onClick={(e) => setStyle({ ...style, color: "#bc8a0b" })}
                    ></button>
                    <input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setqrColor(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="#000000"
                      value={qrColor}
                      onChange={(e) => setqrColor(e.target.value)}
                      className="input input-bordered w-28"
                    />
                  </div>
                </li>
                <li
                  className={`collapse collapse-arrow ${
                    generated ? ` ` : `collapse-close text-[#d2d2d5]`
                  }`}
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:bg-white peer-checked:text-black-content">
                    Corner Square
                  </div>
                  <div className="flex items-center gap-2 collapse-content bg-white text-black-content peer-checked:bg-white peer-checked:text-black-content ">
                    <button
                      className="btn btn-sm rounded-full bg-black text-white text-xs"
                      onClick={(e) => setStyle({ ...style, corner: "square" })}
                    >
                      <TbGridDots></TbGridDots> <p className=" pl-1">Squared</p>
                    </button>
                    <button
                      className="btn btn-sm rounded-full bg-black text-white text-xs"
                      onClick={(e) => setStyle({ ...style, corner: "dots" })}
                    >
                      <BsThreeDotsVertical></BsThreeDotsVertical>{" "}
                      <p className=" pl-1">Dotted</p>
                    </button>
                    <button
                      className="btn btn-sm rounded-full bg-black text-white text-xs"
                      onClick={(e) =>
                        setStyle({ ...style, corner: "extra-rounded" })
                      }
                    >
                      <BsThreeDotsVertical></BsThreeDotsVertical>{" "}
                      <p className=" pl-1">Extra Rounded</p>
                    </button>
                    {/* <input
                      type="checkbox"
                      className="cursor-pointer text-right"
                      checked={isChecked}
                      onChange={(event) => setIsChecked(event.target.checked)}
                    />
                    <label className="text-sm"> Add border</label> */}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default QRgenerator;
