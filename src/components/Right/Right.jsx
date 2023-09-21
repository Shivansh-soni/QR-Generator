import React, { useState, useEffect, useRef, useCallback } from "react";
import { BsQrCode } from "react-icons/bs";

import { saveAs } from "file-saver";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useQRStore, useStyleStore } from "../../utils/Store/QRStore";
const QRCodeStyling = require("qr-code-styling");
const Right = ({ handleDownload, setFileName, fileName }) => {
  const { url, generated } = useQRStore();
  const ref = useRef(null);
  const { style, setStyle, frame, setFrame } = useStyleStore();
  const { activate } = frame;
  const [border, setBorder] = useState(false);
  //   const [frame, setFrame] = useState(false);
  //   const [frame.frameColor, setFrame.frameColor] = useState("#000000");
  //   const [frame.frameStyle, setFrame.frameStyle] = useState("bottom");
  //   const [frame.textColor, setFrame.textColor] = useState("#ffffff");
  const handleImageChange = (event) => {
    setStyle({ ...style, image: URL.createObjectURL(event.target.files[0]) });
  };

  const handleFileName = (event) => {
    setFileName(event.target.value);
  };

  const checkData = {
    dots: false,
    color: false,
    backgroundColor: false,
    cornerSquare: false,
    cornerDots: false,
    logo: false,
    frame: false,
    file: false,
  };
  const [checkbox, setCheckbox] = useState({
    dots: false,
    color: false,
    backgroundColor: false,
    cornerSquare: false,
    cornerDots: false,
    logo: false,
    frame: false,
    file: false,
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

  // ------------USE EFFECTS--------
  useEffect(() => {
    qrCode.append(ref.current);
  }, [qrCode, ref]);
  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [qrCode, url]);

  // --------------CSS---------------
  let buttonCSS = `w-28 h-9 text-sm rounded-full  ${
    generated ? `bg-accent` : `btn-disabled`
  } text-black  `;

  let radioButtonCSS = `  btn btn-sm rounded-full text-xs  hover:text-black hover:bg-white hover:drop-shadow-2xl hover:scale-110  `;
  return (
    <div className="w-full">
      <div className="  h-full  flex-1  flex-col  p-5 items-center rounded-3xl">
        <div
          style={{
            color: "black",
          }}
        >
          <div className="flex justify-center my-2 w-full">
            {generated ? (
              <div
                className={`
          
        ${border ? "border-[8px] rounded-xl border-black  " : ""}
          flex justify-center  rounded-2xl  relative --50 p-2 -pl-5  `}
                style={
                  frame.activate
                    ? { backgroundColor: `${frame.frameColor}` }
                    : { backgroundColor: `${style.backgroundColor}` }
                }
                id="demo-qr"
              >
                <div
                  className={`flex ${
                    frame.activate && frame.frameStyle === "bottom"
                      ? "flex-col"
                      : "flex-col-reverse"
                  } gap-2 items-center justify-end rounded-xl`}
                >
                  <div ref={ref}></div>
                  {frame.activate ? (
                    <>
                      <p
                        className="text-[20px] font-bold text-center   "
                        style={{ color: `${frame.textColor}` }}
                      >
                        SCAN ME
                      </p>
                    </>
                  ) : (
                    <></>
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
            <p className="text-base mt-4 text-white">Download as</p>
          </div>
          <div className="gap-3  mt-3 flex items-center justify-between">
            <button className={buttonCSS} onClick={() => handleDownload("png")}>
              PNG
            </button>
            <button className={buttonCSS} onClick={() => handleDownload("svg")}>
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
              <div className="collapse-title text-white border-t-2 border-gray-300 peer-checked:bg-secondary peer-checked:text-white">
                Style
              </div>
              <div className="flex flex-wrap items-center gap-2 collapse-content bg-secondary text-white-content peer-checked:bg-secondary peer-checked:text-white">
                <button
                  className={`${radioButtonCSS} ${
                    style.dots === "square"
                      ? "bg-secondary text-white"
                      : "bg-accent border-none text-black"
                  }`}
                  onClick={(e) => setStyle({ ...style, dots: "square" })}
                >
                  <p className=" pl-1">Squared</p>
                </button>
                <button
                  className={`${radioButtonCSS} ${
                    style.dots === "dots"
                      ? "bg-secondary text-white"
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
                      ? "bg-secondary text-white"
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
              <div className="collapse-title text-white border-t-2 border-gray-300 peer-checked:bg-secondary peer-checked:text-white">
                Color
              </div>
              <div className="flex flex-col items-start gap-4 collapse-content bg-secondary text-white-content peer-checked:bg-secondary peer-checked:text-white">
                <div className="flex items-center gap-4 justify-start">
                  <button
                    className="btn btn-xs btn-circle "
                    onClick={(e) =>
                      setStyle({
                        ...style,
                        color: "#000000",
                        cornerColor: "#000000",
                        cornerDotsColor: "#000000",
                      })
                    }
                  ></button>
                  <button
                    className="btn bg-[#f10909] border-none btn-xs btn-circle "
                    onClick={(e) =>
                      setStyle({
                        ...style,
                        color: "#f10909",
                        cornerColor: "#f10909#",
                        cornerDotsColor: "#f10909",
                      })
                    }
                  ></button>
                  <button
                    className="btn bg-[#1271de] border-none btn-xs btn-circle"
                    onClick={(e) =>
                      setStyle({
                        ...style,
                        color: "#f10909",
                        cornerColor: "#f10909",
                        cornerDotsColor: "#f10909",
                      })
                    }
                  ></button>
                  <button
                    className="btn bg-[#159d57] border-none btn-xs btn-circle"
                    onClick={(e) =>
                      setStyle({
                        ...style,
                        color: "#159d57",
                        cornerColor: "#159d57",
                        cornerDotsColor: "#159d57",
                      })
                    }
                  ></button>

                  {/* ---------PICKER---------------- */}
                  <div>
                    <input
                      type="text"
                      value={style.color}
                      maxLength={7}
                      className="input input-sm input-bordered w-6/12"
                      onChange={(e) => {
                        setStyle({
                          ...style,
                          color: e.target.value,
                          cornerColor: e.target.value,
                          cornerDotsColor: e.target.value,
                        });
                      }}
                    />
                  </div>
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
              <div className="collapse-title text-white border-t-2 border-gray-300 peer-checked:bg-secondary peer-checked:text-white">
                Background Color
              </div>
              <div className="flex flex-col items-start gap-4 collapse-content bg-secondary text-white-content peer-checked:bg-secondary peer-checked:text-white">
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
                <div className="flex -ml-2 items-center gap-2 bg-secondary text-white-content ">
                  <button
                    className={`${radioButtonCSS} ${
                      style.backgroundColor === "#ffffff"
                        ? "bg-secondary text-white"
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
                        ? "bg-secondary text-white"
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
                onChange={() => {
                  setCheckbox({
                    ...checkData,
                    frame: !checkbox.frame,
                  });
                }}
                id="dots"
                className="peer "
              />
              <div className="collapse-title text-white border-t-2 border-gray-300 peer-checked:bg-secondary peer-checked:text-white">
                Frames
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-4 collapse-content bg-secondary text-white-content peer-checked:bg-secondary peer-checked:text-white ">
                <button
                  className={`${radioButtonCSS} ${
                    frame.activate && frame.frameStyle === "bottom"
                      ? "bg-secondary text-white"
                      : "bg-accent border-none text-black"
                  }`}
                  onClick={(e) => {
                    setFrame({
                      ...frame,
                      activate: true,
                      frameStyle: "bottom",
                    });
                  }}
                >
                  <p className=" pl-1">Bottom Frame</p>
                </button>
                <button
                  className={`${radioButtonCSS} ${
                    frame.activate && frame.frameStyle === "top"
                      ? "bg-secondary text-white"
                      : "bg-accent border-none text-black"
                  }`}
                  onClick={(e) => {
                    setFrame({ ...frame, activate: true, frameStyle: "top" });
                  }}
                >
                  <p className=" pl-1">Top Frame</p>
                </button>
                <button
                  className={`${radioButtonCSS} ${
                    !frame.activate
                      ? "bg-secondary text-white"
                      : "bg-accent border-none text-black"
                  }`}
                  onClick={(e) => {
                    setFrame({ ...frame, activate: false, frameStyle: "none" });
                  }}
                >
                  <p className=" pl-1">No Frame</p>
                </button>

                <div className="flex items-center gap-2 ml-2">
                  <p>Frame Color :</p>
                  <input
                    type="text"
                    value={frame.frameColor}
                    id="color"
                    className="input input-sm input-bordered lg:w-24 "
                    onChange={(e) =>
                      setFrame({ ...frame, frameColor: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <p>Text Color :</p>
                  <input
                    type="text"
                    value={frame.textColor}
                    id="color"
                    className="input input-sm input-bordered lg:w-24 "
                    onChange={(e) =>
                      setFrame({ ...frame, textColor: e.target.value })
                    }
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
              <div className="collapse-title text-white border-t-2 border-gray-300 peer-checked:bg-secondary peer-checked:text-white">
                Corner Square
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-4 collapse-content bg-secondary text-white-content peer-checked:bg-secondary peer-checked:text-white ">
                <button
                  className={`${radioButtonCSS} ${
                    style.corner === "square"
                      ? "bg-secondary text-white"
                      : "bg-accent border-none text-black"
                  }`}
                  onClick={(e) => setStyle({ ...style, corner: "square" })}
                >
                  <p className=" pl-1">Squared</p>
                </button>
                <button
                  className={`${radioButtonCSS} ${
                    style.corner === "dots"
                      ? "bg-secondary text-white"
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
                      ? "bg-secondary text-white"
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
              <div className="collapse-title text-white border-t-2 border-gray-300 peer-checked:bg-secondary peer-checked:text-white">
                Corner Dots
              </div>
              <div className="flex  items-start gap-4 collapse-content bg-secondary text-white-content peer-checked:bg-secondary peer-checked:text-white">
                <div className="flex gap-2">
                  <button
                    className={`${radioButtonCSS} ${
                      style.cornerDots === "square"
                        ? "bg-secondary text-white"
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
                        ? "bg-secondary text-white"
                        : "bg-accent border-none text-black"
                    }`}
                    onClick={(e) => setStyle({ ...style, cornerDots: "dot" })}
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
              <div className="collapse-title text-white border-t-2 border-gray-300 peer-checked:bg-secondary peer-checked:text-white">
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
            <li
              className={`collapse  collapse-arrow ${
                generated ? ` ` : `collapse-close text-[#d2d2d5]`
              }`}
            >
              <input
                type="checkbox"
                checked={checkbox.file}
                onChange={() =>
                  setCheckbox({
                    ...checkData,
                    file: !checkbox.file,
                  })
                }
                id="file"
                className="peer "
              />
              <div className="collapse-title text-white border-t-2 border-gray-300 peer-checked:bg-secondary peer-checked:text-white">
                File Name{" "}
              </div>
              <div className="collapse-content flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={fileName}
                  id="clor"
                  className="input input-sm input-bordered lg:w-100 "
                  onChange={handleFileName}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      ;
    </div>
  );
};

export default Right;
