import React, { useState, useEffect, useRef, useCallback } from "react";
import { BsQrCode } from "react-icons/bs";

import { saveAs } from "file-saver";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useQRStore, useStyleStore } from "../../utils/Store/QRStore";
const QRCodeStyling = require("qr-code-styling");

function Frames(props) {
  return (
    <li
      className={`collapse collapse-arrow ${
        props.generated ? `text-white ` : `collapse-close text-[#d2d2d5]`
      }`}
    >
      <input
        type="checkbox"
        checked={props.checkbox.frame}
        onChange={() => {
          props.setCheckbox({
            ...props.checkData,
            frame: !props.checkbox.frame,
          });
        }}
        id="dots"
        className="peer "
      />
      <div className="collapse-title text-black-content border-t-2 border-gray-300  peer-checked:text-black-content">
        Frames
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-4 collapse-content  text-black-content peer-checked:text-black-content ">
        <button
          className={`${props.radioButtonCSS} ${
            props.frame.activate && props.frame.frameStyle === "bottom"
              ? "bg-white text-black"
              : "bg-accent border-none text-black"
          }`}
          onClick={(e) => {
            props.setFrame({
              ...props.frame,
              activate: true,
              frameStyle: "bottom",
            });
          }}
        >
          <p className=" pl-1">Bottom Frame</p>
        </button>
        <button
          className={`${props.radioButtonCSS} ${
            props.frame.activate && props.frame.frameStyle === "top"
              ? "bg-white text-black"
              : "bg-accent border-none text-black"
          }`}
          onClick={(e) => {
            props.setFrame({
              ...props.frame,
              activate: true,
              frameStyle: "top",
            });
          }}
        >
          <p className=" pl-1">Top Frame</p>
        </button>
        <button
          className={`${props.radioButtonCSS} ${
            !props.frame.activate
              ? "bg-white text-black"
              : "bg-accent border-none text-black"
          }`}
          onClick={(e) => {
            props.setFrame({
              ...props.frame,
              activate: false,
              frameStyle: "none",
            });
          }}
        >
          <p className=" pl-1">No Frame</p>
        </button>

        <div className="flex items-center gap-2 ml-2">
          <p>Frame Color :</p>
          <input
            type="text"
            value={props.frame.frameColor}
            id="color"
            className="input input-sm input-bordered lg:w-24 "
            onChange={(e) =>
              props.setFrame({ ...props.frame, frameColor: e.target.value })
            }
          />
        </div>
        <div className="flex items-center gap-2 ml-2">
          <p>Text Color :</p>
          <input
            type="text"
            value={props.frame.textColor}
            id="color"
            className="input input-sm input-bordered lg:w-24 "
            onChange={(e) =>
              props.setFrame({ ...props.frame, textColor: e.target.value })
            }
          />
        </div>
      </div>
    </li>
  );
}

function QRColor(props) {
  return (
    <li
      className={`collapse  collapse-arrow ${
        props.generated ? `text-white ` : `collapse-close text-[#d2d2d5]`
      }`}
    >
      <input
        type="checkbox"
        checked={props.checkbox.color}
        onChange={() =>
          props.setCheckbox({
            ...props.checkData,
            color: !props.checkbox.color,
          })
        }
        id="color"
        className="peer"
      />
      <div className="collapse-title text-black-content border-t-2 border-gray-300  peer-checked:text-black-content">
        Color
      </div>
      <div className="flex flex-col items-start gap-4 collapse-content   text-black-content peer-checked:  peer-checked:text-black-content">
        <div className="flex items-center gap-4 justify-start">
          <button
            className="btn btn-xs btn-circle "
            onClick={(e) =>
              props.setStyle({
                ...props.style,
                color: "#000000",
                cornerColor: "#000000",
                cornerDotsColor: "#000000",
              })
            }
          ></button>
          <button
            className="btn bg-[#f10909] border-none btn-xs btn-circle "
            onClick={(e) =>
              props.setStyle({
                ...props.style,
                color: "#f10909",
                cornerColor: "#f10909",
                cornerDotsColor: "#f10909",
              })
            }
          ></button>
          <button
            className="btn bg-[#1271de] border-none btn-xs btn-circle"
            onClick={(e) =>
              props.setStyle({
                ...props.style,
                color: "#1271de",
                cornerColor: "#1271de",
                cornerDotsColor: "#1271de",
              })
            }
          ></button>
          <button
            className="btn bg-[#159d57] border-none btn-xs btn-circle"
            onClick={(e) =>
              props.setStyle({
                ...props.style,
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
              value={props.style.color}
              id="Color"
              maxLength={7}
              className="input input-sm input-bordered w-28"
              onChange={(e) => {
                props.setStyle({
                  ...props.style,
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
  );
}

function BgColor(props) {
  return (
    <li
      className={`collapse  collapse-arrow ${
        props.generated ? ` text-white` : `collapse-close text-[#d2d2d5]`
      }`}
    >
      <input
        type="checkbox"
        checked={props.checkbox.backgroundColor}
        onChange={() =>
          props.setCheckbox({
            ...props.checkData,
            backgroundColor: !props.checkbox.backgroundColor,
          })
        }
        id="color"
        className="peer"
      />
      <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:  peer-checked:text-black-content">
        Background Color
      </div>
      <div className="flex flex-col items-start gap-4 collapse-content   text-black-content peer-checked:  peer-checked:text-black-content">
        <div className="flex items-center gap-4 justify-start">
          <button
            className="btn btn-xs btn-circle "
            onClick={(e) =>
              props.setStyle({ ...props.style, backgroundColor: "#000000" })
            }
          ></button>
          <button
            className="btn bg-[#f10909] border-none btn-xs btn-circle "
            onClick={(e) =>
              props.setStyle({ ...props.style, backgroundColor: "#f10909" })
            }
          ></button>
          <button
            className="btn bg-[#1271de] border-none btn-xs btn-circle"
            onClick={(e) =>
              props.setStyle({ ...props.style, backgroundColor: "#1271de" })
            }
          ></button>
          <button
            className="btn bg-[#159d57] border-none btn-xs btn-circle"
            onClick={(e) =>
              props.setStyle({ ...props.style, backgroundColor: "#159d57" })
            }
          ></button>

          <input
            type="text"
            value={props.style.backgroundColor}
            id="color"
            className="input input-sm input-bordered lg:w-24 "
            onChange={(e) =>
              props.setStyle({
                ...props.style,
                backgroundColor: e.target.value,
              })
            }
          />
        </div>
        <div className="flex -ml-2 items-center gap-2   text-black-content ">
          <button
            className={`${props.radioButtonCSS} ${
              props.style.backgroundColor === "#ffffff"
                ? "bg-white text-black"
                : "bg-accent border-none text-black"
            }`}
            onClick={(e) => {
              props.setStyle({ ...props.style, backgroundColor: "#ffffff" });
            }}
          >
            <p className=" pl-1">White</p>
          </button>
          <button
            className={`${props.radioButtonCSS} ${
              props.style.backgroundColor === "transparent"
                ? "bg-white text-black"
                : "bg-accent border-none text-black"
            }`}
            onClick={(e) => {
              props.setStyle({
                ...props.style,
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
  );
}

function CornerSquare(props) {
  return (
    <li
      className={`collapse  collapse-arrow ${
        props.generated ? ` text-white` : `collapse-close text-[#d2d2d5]`
      }`}
    >
      <input
        type="checkbox"
        checked={props.checkbox.cornerSquare}
        onChange={() =>
          props.setCheckbox({
            ...props.checkData,
            cornerSquare: !props.checkbox.cornerSquare,
          })
        }
        id="corner"
        className="peer"
      />
      <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:  peer-checked:text-black-content">
        Corner Square
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-4 collapse-content   text-black-content peer-checked:  peer-checked:text-black-content ">
        <button
          className={`${props.radioButtonCSS} ${
            props.style.corner === "square"
              ? "bg-white text-black"
              : "bg-accent border-none text-black"
          }`}
          onClick={(e) => props.setStyle({ ...props.style, corner: "square" })}
        >
          <p className=" pl-1">Squared</p>
        </button>
        <button
          className={`${props.radioButtonCSS} ${
            props.style.corner === "dots"
              ? "bg-white text-black"
              : "bg-accent border-none text-black"
          }`}
          onClick={(e) => props.setStyle({ ...props.style, corner: "dots" })}
        >
          {" "}
          <p className=" pl-1">Dotted</p>
        </button>
        <button
          className={`${props.radioButtonCSS} ${
            props.style.corner === "extra-rounded"
              ? "bg-white text-black"
              : "bg-accent border-none text-black"
          }`}
          onClick={(e) =>
            props.setStyle({ ...props.style, corner: "extra-rounded" })
          }
        >
          {" "}
          <p className=" pl-1">Extra Rounded</p>
        </button>
        <div className="flex items-center gap-2 ml-2">
          <p>Color :</p>
          <input
            type="text"
            value={props.style.cornerColor}
            id="color"
            className="input input-sm input-bordered lg:w-24 "
            onChange={(e) =>
              props.setStyle({ ...props.style, cornerColor: e.target.value })
            }
          />
        </div>
      </div>
    </li>
  );
}

function CornerDots(props) {
  return (
    <li
      className={`collapse collapse-arrow ${
        props.generated ? `text-white ` : `collapse-close text-[#d2d2d5]`
      }`}
    >
      <input
        type="checkbox"
        checked={props.checkbox.cornerDots}
        onChange={() =>
          props.setCheckbox({
            ...props.checkData,
            cornerDots: !props.checkbox.cornerDots,
          })
        }
        id="cornerDots"
        className="peer "
      />
      <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:  peer-checked:text-black-content">
        Corner Dots
      </div>
      <div className="flex  items-start gap-4 collapse-content   text-black-content peer-checked:  peer-checked:text-black-content">
        <div className="flex gap-2">
          <button
            className={`${props.radioButtonCSS} ${
              props.style.cornerDots === "square"
                ? "bg-white text-black"
                : "bg-accent border-none text-black"
            }`}
            onClick={(e) =>
              props.setStyle({ ...props.style, cornerDots: "square" })
            }
          >
            <p className=" pl-1">Squared</p>
          </button>
          <button
            className={`${props.radioButtonCSS} ${
              props.style.cornerDots === "dot"
                ? "bg-white text-black"
                : "bg-accent border-none text-black"
            }`}
            onClick={(e) =>
              props.setStyle({ ...props.style, cornerDots: "dot" })
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
            value={props.style.cornerDotsColor}
            id="color"
            className="input input-sm input-bordered lg:w-24 "
            onChange={(e) =>
              props.setStyle({
                ...props.style,
                cornerDotsColor: e.target.value,
              })
            }
          />
        </div>
      </div>
    </li>
  );
}

function Logo(props) {
  return (
    <li
      className={`collapse  collapse-arrow ${
        props.generated ? ` text-white` : `collapse-close text-[#d2d2d5]`
      }`}
    >
      <input
        type="checkbox"
        checked={props.checkbox.logo}
        onChange={() =>
          props.setCheckbox({ ...props.checkData, logo: !props.checkbox.logo })
        }
        id="logo"
        className="peer"
      />
      <div className="collapse-title text-black-content border-t-2 border-gray-300 peer-checked:  peer-checked:text-black-content">
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
            value={props.style.backgroundDots}
            onClick={() => {
              props.setStyle({
                ...props.style,
                backgroundDots: !props.style.backgroundDots,
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
          onChange={props.handleImageChange}
        />
      </div>
    </li>
  );
}

function QRStyle(props) {
  return (
    <li
      className={`collapse collapse-arrow ${
        props.generated ? `text-white ` : `collapse-close text-[#d2d2d5]`
      }`}
    >
      <input
        type="checkbox"
        checked={props.checkbox.dots}
        onChange={() =>
          props.setCheckbox({ ...props.checkData, dots: !props.checkbox.dots })
        }
        id="dots"
        className="peer "
      />
      <div className="collapse-title text-black-content border-t-2 border-gray-300  peer-checked:text-black-content">
        Style
      </div>
      <div className="flex flex-wrap items-center gap-2 collapse-content   text-black-content peer-checked:  peer-checked:text-black-content">
        <button
          className={`${props.radioButtonCSS} ${
            props.style.dots === "square"
              ? "bg-white text-black"
              : "bg-accent border-none text-black"
          }`}
          onClick={(e) => props.setStyle({ ...props.style, dots: "square" })}
        >
          <p className=" pl-1">Squared</p>
        </button>
        <button
          className={`${props.radioButtonCSS} ${
            props.style.dots === "dots"
              ? "bg-white text-black"
              : "bg-accent border-none text-black"
          }`}
          onClick={(e) => props.setStyle({ ...props.style, dots: "dots" })}
        >
          {" "}
          <p className=" pl-1">Dotted</p>
        </button>
        <button
          className={`${props.radioButtonCSS} ${
            props.style.dots === "classy"
              ? "bg-white text-black"
              : "bg-accent border-none text-black"
          }`}
          onClick={(e) => props.setStyle({ ...props.style, dots: "classy" })}
        >
          {" "}
          <p className=" pl-1">classy</p>
        </button>
        <div class="ml-10 mt-2">
          <input
            class="relative float-left -ml-[1.5rem]  mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            checked={props.border}
            onClick={() => {
              props.setBorder(!props.border);
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
  );
}

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

  let radioButtonCSS = `  btn btn-sm rounded-full text-xs  hover:text-black hover:  hover:drop-shadow-2xl hover:scale-110  `;
  return (
    <div className="w-full">
      <div
        className="  h-full  flex-1  flex-col  p-5 items-center rounded-3xl"
        style={{ color: "white" }}
      >
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
          <div className="mt-3 text-white">
            <p className="text-base mt-4">Download as</p>
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
            <QRStyle
              generated={generated}
              style={style}
              setStyle={setStyle}
              border={border}
              setBorder={setBorder}
              checkData={checkData}
              checkbox={checkbox}
              setCheckbox={setCheckbox}
              radioButtonCSS={radioButtonCSS}
            ></QRStyle>
            {/* -----------------------COLOR------------------------- */}
            <QRColor
              generated={generated}
              style={style}
              setStyle={setStyle}
              checkData={checkData}
              checkbox={checkbox}
              setCheckbox={setCheckbox}
            ></QRColor>
            {/* -----------------------BACKGROUND COLOR------------------------- */}
            <BgColor
              generated={generated}
              style={style}
              setStyle={setStyle}
              checkData={checkData}
              checkbox={checkbox}
              setCheckbox={setCheckbox}
              radioButtonCSS={radioButtonCSS}
            ></BgColor>
            {/* -----------------------FRAMES--------------------- */}
            <Frames
              generated={generated}
              frame={frame}
              setFrame={setFrame}
              checkData={checkData}
              checkbox={checkbox}
              setCheckbox={setCheckbox}
              radioButtonCSS={radioButtonCSS}
            ></Frames>
            {/* -----------------------CORNER SQUARE----------------- */}
            <CornerSquare
              generated={generated}
              style={style}
              setStyle={setStyle}
              checkData={checkData}
              checkbox={checkbox}
              setCheckbox={setCheckbox}
              radioButtonCSS={radioButtonCSS}
            ></CornerSquare>

            {/* -----------------------CORNER DOTS------------------- */}
            <CornerDots
              generated={generated}
              style={style}
              setStyle={setStyle}
              checkData={checkData}
              checkbox={checkbox}
              setCheckbox={setCheckbox}
              radioButtonCSS={radioButtonCSS}
            ></CornerDots>
            {/* -------------------------LOGO------------------------ */}
            <Logo
              generated={generated}
              style={style}
              setStyle={setStyle}
              handleImageChange={handleImageChange}
              checkData={checkData}
              checkbox={checkbox}
              setCheckbox={setCheckbox}
            ></Logo>
          </ul>
        </div>
      </div>
      ;
    </div>
  );
};

export default Right;
