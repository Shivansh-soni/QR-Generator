import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaCompass, FaFacebook, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsQrCode } from "react-icons/bs";
import { MdPhoneInTalk } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { toJpeg, toPng, toSvg } from "html-to-image";
import { saveAs } from "file-saver";
import "react-toastify/dist/ReactToastify.css";
const QRCodeStyling = require("qr-code-styling");
const Data = () => {
  const [urls, setUrls] = useState("your Website URL");
  const [inputText, setInputText] = useState("https://ekko.network");
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [activeButton, setActiveButton] = useState(1);
  const [domain, setDomain] = useState("");
  const [url, setUrl] = useState("");
  const [border, setBorder] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [frame, setFrame] = useState(false);
  const [frameColor, setFrameColor] = useState("#000000");
  const [frameStyle, setFrameStyle] = useState("bottom");
  const [textColor, setTextColor] = useState("#ffffff");

  const checkData = {
    dots: false,
    color: false,
    backgroundColor: false,
    cornerSquare: false,
    cornerDots: false,
    logo: false,
    frame: false,
  };
  const [checkbox, setCheckbox] = useState({
    dots: false,
    color: false,
    backgroundColor: false,
    cornerSquare: false,
    cornerDots: false,
    logo: false,
    frame: false,
  });
  const [style, setStyle] = useState({
    color: "#000000",
    cornerColor: "#000000",
    cornerDotsColor: "#000000",
    dots: "classy",
    corner: "extra-rounded",
    backgroundColor: "#ffffff",
    image: "",
    cornerDots: "",
    backgroundDots: false,
    width: "140",
  });

  // ------------QR CODE-------------
  const qrCode = new QRCodeStyling({
    width: `${style.width}`,
    height: `${style.width}`,
    image: `${style.image}`,
    dotsOptions: {
      color: `${style.color}`,
      type: `${style.dots}`,
    },
    cornersSquareOptions: {
      color: `${style.cornerColor}`,
      type: `${style.corner}`,
    },

    cornersDotOptions: {
      color: `${style.cornerDotsColor}`,
      type: `${style.cornerDots}`,
    },
    backgroundOptions: {
      color: `${style.backgroundColor}`,
    },
    imageOptions: {
      hideBackgroundDots: `${style.backgroundDots}`,
      crossOrigin: "anonymous",
      margin: 0,
      imageSize: 0.5,
    },
    qrOptions: {
      errorCorrectionLevel: "H",
    },
    type: "canvas",
  });
  const qrCode2 = new QRCodeStyling({
    width: 500,
    height: 500,
    image: `${style.image}`,
    dotsOptions: {
      color: `${style.color}`,
      type: `${style.dots}`,
    },
    cornersSquareOptions: {
      color: `${style.cornerColor}`,
      type: `${style.corner}`,
    },

    cornersDotOptions: {
      color: `${style.cornerDotsColor}`,
      type: `${style.cornerDots}`,
    },
    backgroundOptions: {
      color: `${style.backgroundColor}`,
    },
    imageOptions: {
      hideBackgroundDots: `${style.backgroundDots}`,
      crossOrigin: "anonymous",
      margin: 0,
      imageSize: 0.5,
    },
    qrOptions: {
      errorCorrectionLevel: "H",
    },
    type: "canvas",
  });
  // ------------USE EFFECTS--------
  useEffect(() => {
    qrCode.append(ref.current);
    qrCode2.append(ref2.current);
  }, [qrCode, ref]);
  useEffect(() => {
    qrCode.update({
      data: url,
    });
    qrCode2.update({
      data: url,
    });
  }, [qrCode, url]);
  useEffect(() => {
    if (inputText.includes(`${domain}`)) {
      setUrl(inputText);
    } else {
      setUrl(`${domain}${inputText}`);
    }
  }, [inputText, domain]);

  // -----------EVENT HANDLERS-------
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    setInputText("");
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleImageChange = (event) => {
    setStyle({ ...style, image: URL.createObjectURL(event.target.files[0]) });
  };
  const handleSubmit = async () => {
    if (url.includes(" ")) {
      toast.warning("spacing not allowed");
      setGenerated(false);
    } else {
      if (activeButton !== 1 && activeButton !== 5) {
      } else if (activeButton === 1) {
        setUrl(inputText);
      } else if (activeButton === 5) {
        setUrl(`tel:${inputText}`);
      }
      setGenerated(true);
    }
  };
  const handleDownload = async (type) => {
    // qrCode2.getRawData("jpeg").then((blob) => saveAs(blob, "hello world.jpeg"));

    const element = document.getElementById("main-qr");
    // element.innerHTML = "";
    // qrCode2.append(element);
    switch (type) {
      case "jpeg": {
        toJpeg(element).then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "QRCODE.jpeg";
          link.click();
        });
        break;
      }
      case "png": {
        toPng(element).then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "QRCODE.png";
          link.click();
        });
        break;
      }
      case "svg": {
        if (style.backgroundColor === "transparent") {
          toast.error("Trasnparent Bg is not supported in SVG");
          break;
        } else {
          toSvg(element).then((dataUrl) => {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "QRCODE.svg";
            link.click();
          });
        }
        break;
      }
      default: {
        toPng(element).then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "QRCODE.png";
          link.click();
        });
      }
    }
  };

  // --------------CSS---------------
  let buttonCSS = `w-28 h-9 text-sm rounded-full  ${
    generated ? `bg-accent` : `btn-disabled`
  } text-black  `;

  let radioButtonCSS = `  btn btn-sm rounded-full text-xs  hover:text-black hover:bg-white hover:drop-shadow-2xl hover:scale-110  `;

  return (
    <div className="h-full  ">
      <div className="w-full h-screen  lg:px-5  rounded-2xl">
        <div className="w-full mt-20  h-[900px]  bg-white border rounded-3xl border-gray-300  flex md:flex-row flex-col drop-shadow-2xl">
          {/* ----------------------------------------LEFT SIDE OF THE PAGE--------------------------------------- */}
          <div className=" h-full flex-[0.6] flex flex-col justify-between p-10  text-gray-400">
            <ul className="flex flex-col  gap-10">
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
               <button className="bg-accent rounded-full text-black py-3 text-sm w-32">
                 Subscribe to Pro
               </button>
             </div> */}
          </div>
          {/* ----------------------------------------LEFT SIDE ENDED------------------------------------------- */}
          {/* ---------------------------------------------------------------------------------------------------*/}
          {/* ----------------------------------------CENTER OF PAGE---------------------------------------- */}
          <div className=" h-full flex-[2.5] border-x border-gray-300 px-10 pt-10 text-black">
            <h1 className="text-lg text-black">Enter {urls}</h1>
            <input
              value={inputText}
              onChange={handleInputChange}
              type="text"
              className="mt-5 bg-white outline-none input input-bordered border-gray-500 w-full"
            />
            {inputText && (
              <div className="flex pt-5 justify-end  ">
                <button
                  className={`btn normal-case w-4/12 mr-4  text-sm  rounded-full  ${
                    generated
                      ? `bg-white text-black  border-solid border-black hover:bg-white btn-disabled`
                      : `bg-accent text-black hover:bg-primary hover:scale-110  border-none`
                  } `}
                  onClick={handleSubmit}
                >
                  {`${generated ? `Generated` : `Generate`}`}
                </button>
              </div>
            )}
          </div>
          {/* ----------------------------------------CENTER SIDE ENDED----------------------------------------- */}
          {/* --------------------------------------------------------------------------------------------------*/}
          {/* ---------------------------------------RIGHT SIDE OF PAGE --------------------------------------- */}
          <div className=" flex-[1.5] h-full lg:w-4/12 flex-col  p-5 items-center rounded-3xl">
            <div
              style={{
                color: "black",
              }}
            >
              <div className="flex justify-center my-2 ">
                {generated ? (
                  <div
                    className={`
          
        ${border ? "border-[8px] rounded-xl border-black  " : ""}
          flex justify-center  rounded-2xl  relative -z-50 p-2 -pl-5  `}
                    style={
                      frame
                        ? { backgroundColor: `${frameColor}` }
                        : { backgroundColor: `${style.backgroundColor}` }
                    }
                  >
                    <div
                      className={`flex ${
                        frameStyle === "bottom"
                          ? "flex-col"
                          : "flex-col-reverse"
                      } gap-2 items-center justify-end rounded-xl`}
                    >
                      <div ref={ref}></div>
                      {frame && (
                        <>
                          <p
                            className="text-[20px] font-bold text-center   "
                            style={{ color: `${textColor}` }}
                          >
                            SCAN ME
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <BsQrCode className="text-[150px] text-[#d2d2d5]" />
                  </>
                )}
                {/* //*--------------------BUTTONS-------------------- */}
              </div>
              <div className="mt-3 ">
                <p className="text-base mt-4">Download as</p>
              </div>
              <div className="gap-3  mt-3 flex items-center justify-between">
                <button
                  className={buttonCSS}
                  onClick={() => handleDownload("png")}
                >
                  PNG
                </button>
                <button
                  className={buttonCSS}
                  onClick={() => handleDownload("svg")}
                >
                  SVG
                </button>
                {/* <PDFDownloadLink
                  document={<MyDocument />}
                  fileName="qrcode.pdf"
                >
                  Download PDF
                </PDFDownloadLink> */}
                {/* <button
                  className={buttonCSS}
                  onClick={async () => {
                    await renderToFile(
                      <MyDocument />,
                      `${__dirname}/my-doc.pdf`
                    );
                  }}
                >
                  PDF
                </button> */}
                <button
                  className={buttonCSS}
                  onClick={() => handleDownload("jpeg")}
                >
                  JPG
                </button>
              </div>
              {/* --------------------------------------ACCORDIONS------------------------------------------------------- */}
              <ul className="mt-10 flex flex-col w-full ">
                {/* -----------------------DOTS-------------------------- */}
                <li
                  className={`collapse collapse-arrow ${
                    generated ? ` ` : `collapse-close text-[#d2d2d5]`
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkbox.dots}
                    onChange={() =>
                      setCheckbox({
                        ...checkData,
                        dots: !checkbox.dots,
                      })
                    }
                    id="dots"
                    className="peer "
                  />
                  <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:bg-white peer-checked:text-black-content">
                    Style
                  </div>
                  <div className="flex flex-wrap items-center gap-2 collapse-content bg-white text-black-content peer-checked:bg-white peer-checked:text-black-content">
                    <button
                      className={`${radioButtonCSS} ${
                        style.dots === "square"
                          ? "bg-white text-black"
                          : "bg-accent border-none text-black"
                      }`}
                      onClick={(e) => setStyle({ ...style, dots: "square" })}
                    >
                      <p className=" pl-1">Squared</p>
                    </button>
                    <button
                      className={`${radioButtonCSS} ${
                        style.dots === "dots"
                          ? "bg-white text-black"
                          : "bg-accent border-none text-black"
                      }`}
                      onClick={(e) => setStyle({ ...style, dots: "dots" })}
                    >
                      {" "}
                      <p className=" pl-1">Dotted</p>
                    </button>
                    <button
                      className={`${radioButtonCSS} ${
                        style.dots === "classy"
                          ? "bg-white text-black"
                          : "bg-accent border-none text-black"
                      }`}
                      onClick={(e) => setStyle({ ...style, dots: "classy" })}
                    >
                      {" "}
                      <p className=" pl-1">classy</p>
                    </button>
                    <div class="ml-10 mt-2">
                      <input
                        class="relative float-left -ml-[1.5rem]  mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="checkbox"
                        checked={border}
                        onClick={() => {
                          setBorder(!border);
                        }}
                      />
                      <label
                        class="inline-block  hover:cursor-pointer"
                        for="checkboxDefault"
                      >
                        Add Border
                      </label>
                    </div>
                  </div>
                </li>
                {/* -----------------------COLOR------------------------- */}
                <li
                  className={`collapse  collapse-arrow ${
                    generated ? ` ` : `collapse-close text-[#d2d2d5]`
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkbox.color}
                    onChange={() =>
                      setCheckbox({
                        ...checkData,
                        color: !checkbox.color,
                      })
                    }
                    id="color"
                    className="peer"
                  />
                  <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:bg-white peer-checked:text-black-content">
                    Color
                  </div>
                  <div className="flex flex-col items-start gap-4 collapse-content bg-white text-black-content peer-checked:bg-white peer-checked:text-black-content">
                    <div className="flex items-center gap-4 justify-start">
                      <button
                        className="btn btn-xs btn-circle "
                        onClick={(e) =>
                          setStyle({ ...style, color: "#000000" })
                        }
                      ></button>
                      <button
                        className="btn bg-[#f10909] border-none btn-xs btn-circle "
                        onClick={(e) =>
                          setStyle({ ...style, color: "#f10909" })
                        }
                      ></button>
                      <button
                        className="btn bg-[#1271de] border-none btn-xs btn-circle"
                        onClick={(e) =>
                          setStyle({ ...style, color: "#1271de" })
                        }
                      ></button>
                      <button
                        className="btn bg-[#159d57] border-none btn-xs btn-circle"
                        onClick={(e) =>
                          setStyle({ ...style, color: "#159d57" })
                        }
                      ></button>

                      <input
                        type="text"
                        value={style.color}
                        id="color"
                        className="input input-sm input-bordered lg:w-24 "
                        onChange={(e) =>
                          setStyle({ ...style, color: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex -ml-2 items-center gap-2 bg-white text-black-content ">
                      <button
                        className={`${radioButtonCSS} ${
                          style.backgroundColor === "#ffffff"
                            ? "bg-white text-black"
                            : "bg-accent border-none text-black"
                        }`}
                        onClick={(e) => {
                          setStyle({ ...style, backgroundColor: "#ffffff" });
                        }}
                      >
                        <p className=" pl-1">White</p>
                      </button>
                      <button
                        className={`${radioButtonCSS} ${
                          style.backgroundColor === "transparent"
                            ? "bg-white text-black"
                            : "bg-accent border-none text-black"
                        }`}
                        onClick={(e) => {
                          setStyle({
                            ...style,
                            backgroundColor: "transparent",
                          });
                        }}
                      >
                        {" "}
                        <p className=" pl-1">Transparent</p>
                      </button>
                    </div>
                  </div>
                </li>
                {/* -----------------------BACKGROUND COLOR------------------------- */}
                <li
                  className={`collapse  collapse-arrow ${
                    generated ? ` ` : `collapse-close text-[#d2d2d5]`
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkbox.backgroundColor}
                    onChange={() =>
                      setCheckbox({
                        ...checkData,
                        backgroundColor: !checkbox.backgroundColor,
                      })
                    }
                    id="color"
                    className="peer"
                  />
                  <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:bg-white peer-checked:text-black-content">
                    Background Color
                  </div>
                  <div className="flex flex-col items-start gap-4 collapse-content bg-white text-black-content peer-checked:bg-white peer-checked:text-black-content">
                    <div className="flex items-center gap-4 justify-start">
                      <button
                        className="btn btn-xs btn-circle "
                        onClick={(e) =>
                          setStyle({ ...style, backgroundColor: "#000000" })
                        }
                      ></button>
                      <button
                        className="btn bg-[#f10909] border-none btn-xs btn-circle "
                        onClick={(e) =>
                          setStyle({ ...style, backgroundColor: "#f10909" })
                        }
                      ></button>
                      <button
                        className="btn bg-[#1271de] border-none btn-xs btn-circle"
                        onClick={(e) =>
                          setStyle({ ...style, backgroundColor: "#1271de" })
                        }
                      ></button>
                      <button
                        className="btn bg-[#159d57] border-none btn-xs btn-circle"
                        onClick={(e) =>
                          setStyle({ ...style, backgroundColor: "#159d57" })
                        }
                      ></button>

                      <input
                        type="text"
                        value={style.backgroundColor}
                        id="color"
                        className="input input-sm input-bordered lg:w-24 "
                        onChange={(e) =>
                          setStyle({
                            ...style,
                            backgroundColor: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex -ml-2 items-center gap-2 bg-white text-black-content ">
                      <button
                        className={`${radioButtonCSS} ${
                          style.backgroundColor === "#ffffff"
                            ? "bg-white text-black"
                            : "bg-accent border-none text-black"
                        }`}
                        onClick={(e) => {
                          setStyle({ ...style, backgroundColor: "#ffffff" });
                        }}
                      >
                        <p className=" pl-1">White</p>
                      </button>
                      <button
                        className={`${radioButtonCSS} ${
                          style.backgroundColor === "transparent"
                            ? "bg-white text-black"
                            : "bg-accent border-none text-black"
                        }`}
                        onClick={(e) => {
                          setStyle({
                            ...style,
                            backgroundColor: "transparent",
                          });
                        }}
                      >
                        {" "}
                        <p className=" pl-1">Transparent</p>
                      </button>
                    </div>
                  </div>
                </li>
                {/* -----------------------FRAMES--------------------- */}
                <li
                  className={`collapse collapse-arrow ${
                    generated ? ` ` : `collapse-close text-[#d2d2d5]`
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkbox.frame}
                    onChange={() =>
                      setCheckbox({
                        ...checkData,
                        frame: !checkbox.frame,
                      })
                    }
                    id="dots"
                    className="peer "
                  />
                  <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:bg-white peer-checked:text-black-content">
                    Frames
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-4 collapse-content bg-white text-black-content peer-checked:bg-white peer-checked:text-black-content ">
                    <button
                      className={`${radioButtonCSS} ${
                        frameStyle === "bottom"
                          ? "bg-white text-black"
                          : "bg-accent border-none text-black"
                      }`}
                      onClick={(e) => {
                        if (frame) {
                          setFrameStyle("bottom");
                        } else {
                          setFrame(!frame);
                          setFrameStyle("bottom");
                        }
                      }}
                    >
                      <p className=" pl-1">Bottom Frame</p>
                    </button>
                    <button
                      className={`${radioButtonCSS} ${
                        frameStyle === "top"
                          ? "bg-white text-black"
                          : "bg-accent border-none text-black"
                      }`}
                      onClick={(e) => {
                        if (frame) {
                          setFrameStyle("top");
                        } else {
                          setFrame(!frame);
                          setFrameStyle("top");
                        }
                      }}
                    >
                      <p className=" pl-1">Top Frame</p>
                    </button>

                    <div className="flex items-center gap-2 ml-2">
                      <p>Frame Color :</p>
                      <input
                        type="text"
                        value={frameColor}
                        id="color"
                        className="input input-sm input-bordered lg:w-24 "
                        onChange={(e) => setFrameColor(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <p>Text Color :</p>
                      <input
                        type="text"
                        value={textColor}
                        id="color"
                        className="input input-sm input-bordered lg:w-24 "
                        onChange={(e) => setTextColor(e.target.value)}
                      />
                    </div>
                  </div>
                </li>
                {/* -----------------------CORNER SQUARE----------------- */}
                <li
                  className={`collapse  collapse-arrow ${
                    generated ? ` ` : `collapse-close text-[#d2d2d5]`
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkbox.cornerSquare}
                    onChange={() =>
                      setCheckbox({
                        ...checkData,
                        cornerSquare: !checkbox.cornerSquare,
                      })
                    }
                    id="corner"
                    className="peer"
                  />
                  <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:bg-white peer-checked:text-black-content">
                    Corner Square
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-4 collapse-content bg-white text-black-content peer-checked:bg-white peer-checked:text-black-content ">
                    <button
                      className={`${radioButtonCSS} ${
                        style.corner === "square"
                          ? "bg-white text-black"
                          : "bg-accent border-none text-black"
                      }`}
                      onClick={(e) => setStyle({ ...style, corner: "square" })}
                    >
                      <p className=" pl-1">Squared</p>
                    </button>
                    <button
                      className={`${radioButtonCSS} ${
                        style.corner === "dots"
                          ? "bg-white text-black"
                          : "bg-accent border-none text-black"
                      }`}
                      onClick={(e) => setStyle({ ...style, corner: "dots" })}
                    >
                      {" "}
                      <p className=" pl-1">Dotted</p>
                    </button>
                    <button
                      className={`${radioButtonCSS} ${
                        style.corner === "extra-rounded"
                          ? "bg-white text-black"
                          : "bg-accent border-none text-black"
                      }`}
                      onClick={(e) =>
                        setStyle({ ...style, corner: "extra-rounded" })
                      }
                    >
                      {" "}
                      <p className=" pl-1">Extra Rounded</p>
                    </button>
                    <div className="flex items-center gap-2 ml-2">
                      <p>Color :</p>
                      <input
                        type="text"
                        value={style.cornerColor}
                        id="color"
                        className="input input-sm input-bordered lg:w-24 "
                        onChange={(e) =>
                          setStyle({ ...style, cornerColor: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </li>

                {/* -----------------------CORNER DOTS------------------- */}
                <li
                  className={`collapse collapse-arrow ${
                    generated ? ` ` : `collapse-close text-[#d2d2d5]`
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkbox.cornerDots}
                    onChange={() =>
                      setCheckbox({
                        ...checkData,
                        cornerDots: !checkbox.cornerDots,
                      })
                    }
                    id="cornerDots"
                    className="peer "
                  />
                  <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:bg-white peer-checked:text-black-content">
                    Corner Dots
                  </div>
                  <div className="flex  items-start gap-4 collapse-content bg-white text-black-content peer-checked:bg-white peer-checked:text-black-content">
                    <div className="flex gap-2">
                      <button
                        className={`${radioButtonCSS} ${
                          style.cornerDots === "square"
                            ? "bg-white text-black"
                            : "bg-accent border-none text-black"
                        }`}
                        onClick={(e) =>
                          setStyle({ ...style, cornerDots: "square" })
                        }
                      >
                        <p className=" pl-1">Squared</p>
                      </button>
                      <button
                        className={`${radioButtonCSS} ${
                          style.cornerDots === "dot"
                            ? "bg-white text-black"
                            : "bg-accent border-none text-black"
                        }`}
                        onClick={(e) =>
                          setStyle({ ...style, cornerDots: "dot" })
                        }
                      >
                        {" "}
                        <p className=" pl-1">Circled</p>
                      </button>
                    </div>
                    <div className="flex  items-center gap-2 ml-2">
                      <p>Color :</p>
                      <input
                        type="text"
                        value={style.cornerDotsColor}
                        id="color"
                        className="input input-sm input-bordered lg:w-24 "
                        onChange={(e) =>
                          setStyle({
                            ...style,
                            cornerDotsColor: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </li>
                {/* -------------------------LOGO------------------------ */}
                <li
                  className={`collapse  collapse-arrow ${
                    generated ? ` ` : `collapse-close text-[#d2d2d5]`
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkbox.logo}
                    onChange={() =>
                      setCheckbox({
                        ...checkData,
                        logo: !checkbox.logo,
                      })
                    }
                    id="logo"
                    className="peer"
                  />
                  <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:bg-white peer-checked:text-black-content">
                    Logo
                  </div>
                  <div className="collapse-content flex items-center gap-2 w-full">
                    <button
                      className="btn btn-sm normal-case btn-accent lg:w-5/12"
                      onClick={() => document.getElementById("logo2").click()}
                    >
                      <AiOutlineCloudUpload className="text-xl mr-2" /> Upload
                    </button>

                    <div class="mb-[0.125rem] w-screen lg:ml-5 pl-[1.5rem]">
                      <input
                        class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="checkbox"
                        value={style.backgroundDots}
                        onClick={() => {
                          setStyle({
                            ...style,
                            backgroundDots: !style.backgroundDots,
                          });
                        }}
                        id="checkboxDefault"
                      />
                      <label
                        class="inline-block pl-[0.15rem] hover:cursor-pointer"
                        for="checkboxDefault"
                      >
                        Show Dots
                      </label>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      id="logo2"
                      className="file-input file-input-bordered file-input-sm   max-w-xs invisible"
                      onChange={handleImageChange}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* ----------------------------------------Right SIDE ENDED------------------------------------------- */}
        </div>
      </div>
      <div
        className={`
          
        ${border ? "border-[8px] rounded-xl border-black  " : ""}
         w-[550px] flex justify-center  rounded-2xl  relative -z-50 p-5 -pl-5  `}
        id="main-qr"
        style={
          frame
            ? { backgroundColor: `${frameColor}` }
            : { backgroundColor: `${style.backgroundColor}` }
        }
      >
        <div
          className={`flex ${
            frameStyle === "bottom" ? " flex-col" : " flex-col-reverse"
          } gap-2 items-center justify-end `}
        >
          <div ref={ref2} className={`rounded-xl `}></div>
          {frame && (
            <>
              <p
                className="text-[80px] font-bold text-center  -mb-5 "
                style={{ color: `${style.backgroundColor}` }}
              >
                SCAN ME
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Data;
