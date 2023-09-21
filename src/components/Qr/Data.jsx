import Right from "../Right/Right";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { MdPhoneInTalk } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { toJpeg, toPng, toSvg } from "html-to-image";
import Left from "../Left/Left";
import { useQRStore, useStyleStore } from "../../utils/Store/QRStore";
import axios from "axios";
const QRCodeStyling = require("qr-code-styling");

function extractUsername(url) {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  return lastPart;
}

const url = "https://tap-n.in/shivansh_soni";
const username = extractUsername(url);

const Data = () => {
  const {
    url,
    generated,
    domain,
    setGenerated,
    setUrl,
    activeButton,
    heading,
    setActiveButton,
    inputText,
    setInputText,
    setFileName,
    fileName,
  } = useQRStore();
  const { style, frame } = useStyleStore();
  const { border, frameColor, frameStyle, textColor, activate } = frame;
  const [security, setSecurity] = useState("WPA");
  const [password, setPassword] = useState("");

  // ------------QR OG-------
  const ref2 = useRef(null);
  const qrCode2 = new QRCodeStyling({
    data: url,
    width: 3000,
    height: 3000,
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
  useEffect(() => {
    qrCode2.append(ref2.current);
  }, [qrCode2, ref2]);
  useEffect(() => {
    qrCode2.update({
      data: url,
    });
  }, [qrCode2, url]);
  useEffect(() => {
    // Get the current URL
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");
    if (url) {
      setInputText(url);
      handleSubmit();
    }
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    if (activeButton !== 6 && activeButton !== 7 && activeButton !== 8) {
      if (inputText.includes(`${domain}`)) {
        setUrl(inputText);
      } else {
        setUrl(`${domain}${inputText}`);
      }
    } else if (activeButton === 6) {
      var text =
        "WIFI:S:" +
        inputText +
        ";T:" +
        security +
        ";P:" +
        password +
        ";H:" +
        "false" +
        ";;";
      setUrl(text);
    } else if (activeButton === 7) {
      var upi = `upi://pay1?pa=${inputText}&pn=${password}`;
      setUrl(upi);
    } else if (activeButton === 8) {
    }
  }, [inputText, domain, security]);

  // -----------EVENT HANDLERS-------
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    // setInputText("");
  };
  const handleDownload = async (type) => {
    // qrCode2.getRawData("jpeg").then((blob) => saveAs(blob, "hello world.jpeg"));

    const element = document.getElementById("main-qr");
    const title = heading.split(" ")[0];
    switch (type) {
      case "jpeg": {
        toJpeg(element).then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          if (fileName !== "") {
            link.download = `${fileName}-QRCODE.jpeg`;
          } else {
            link.download = `${fileName}-QRCODE.jpeg`;
          }
          link.click();
        });
        break;
      }
      case "png": {
        toPng(element).then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          if (fileName !== "") {
            link.download = `${fileName}-QRCODE.png`;
          } else {
            link.download = `${title}-QRCODE.png`;
          }
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
            if (fileName !== "") {
              link.download = `${fileName}-QRCODE.svg`;
            } else {
              link.download = `${title}-QRCODE.svg`;
            }
            link.click();
          });
        }
        break;
      }
      default: {
        toPng(element).then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${title}-QRCODE.png`;
          link.click();
        });
      }
    }
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (url.includes(" ")) {
      toast.warning("spacing not allowed");
      setGenerated(false);
    } else {
      const name = extractUsername(inputText);
      setFileName(name);
      if (activeButton !== 1 && activeButton !== 5) {
      } else if (activeButton === 1) {
        setUrl(inputText);
      } else if (activeButton === 5) {
        setUrl(`tel:${inputText}`);
      }

      setGenerated(true);
    }
  };

  return (
    <div className="h-full  ">
      <div className="w-full h-screen  lg:px-5  rounded-2xl">
        <div className="w-full mt-20  h-[950px] relative z-50  bg-secondary border rounded-3xl   flex md:flex-row flex-col drop-shadow-2xl">
          <Left />
          {/* ----------------------------------------CENTER OF PAGE---------------------------------------- */}
          <div className=" h-full w-[2500px]  border-x border-gray-300 px-10 pt-10 text-black ">
            <h1 className="text-lg text-white">{heading}</h1>
            {heading !== "file-upload" && (
              <input
                value={inputText}
                placeholder={`Enter your ${heading}`}
                onChange={handleInputChange}
                type="text"
                className="mt-5 bg-white outline-none input input-bordered border-gray-500 w-full"
              />
            )}
            {(activeButton === 6 || activeButton === 7) && (
              <div className="flex items-center">
                {activeButton === 6 ? (
                  <div className="flex items-center w-full gap-2">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      placeholder="Enter Password"
                      className="mt-5 bg-white outline-none input input-bordered border-gray-500 w-full"
                    />
                    <select
                      className="select select-bordered w-full max-w-xs mt-5"
                      onChange={(e) => setSecurity(e.target.value)}
                      defaultValue="WPA"
                    >
                      <option selected disabled>
                        Encryption
                      </option>
                      <option value="WPA">WPA</option>
                      <option value="WEP">WEP</option>
                    </select>
                  </div>
                ) : activeButton === 7 ? (
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    placeholder="Enter Name"
                    className="mt-5 bg-white outline-none input input-bordered border-gray-500 w-full"
                  />
                ) : null}
              </div>
            )}
            {heading === "file-upload" && (
              <>
                <input
                  type="file"
                  onChange={async (e) => {
                    const formData1 = new FormData();
                    formData1.append("file", e.target.files[0]);
                    formData1.append("upload_preset", "plkye1q5");
                    formData1.append("folder", "ekko QR GENERATOR");
                    const x = await axios.post(
                      "https://api.cloudinary.com/v1_1/dxinrlkqm/auto/upload",
                      formData1
                    );
                    const res = await x.data.url;
                    setUrl(res);
                  }}
                  className=" file-input w-full file-input-primary "
                />
              </>
            )}

            <div className="flex pt-5 justify-end  ">
              <button
                className={`btn normal-case w-4/12 mr-4  text-sm  rounded-full  ${
                  generated
                    ? `bg-accent text-black  border-solid border-black hover:bg-white btn-disabled`
                    : `bg-accent text-black hover:bg-accent hover:scale-110  border-none`
                } `}
                onClick={handleSubmit}
              >
                {`${generated ? `Generated` : `Generate`}`}
              </button>
            </div>
          </div>
          {/* ----------------------------------------CENTER SIDE ENDED----------------------------------------- */}
          <Right
            handleDownload={handleDownload}
            setFileName={setFileName}
            fileName={fileName}
          />
        </div>
      </div>

      {/* ----------Preview-------- */}
      <div
        className={`
          
        ${border ? "border-[8px] rounded-xl border-black  " : ""}
         w-[3000px] flex justify-center  rounded-2xl relative -z-50 p-5 -pl-5  `}
        id="main-qr"
        style={
          activate
            ? { backgroundColor: `${frameColor}` }
            : { backgroundColor: `${style.backgroundColor}` }
        }
      >
        <div
          className={`flex ${
            frame.activate && frameStyle === "bottom"
              ? " flex-col"
              : " flex-col-reverse"
          } gap-2 items-center justify-end `}
        >
          <div ref={ref2} className={`rounded-xl `}></div>
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
    </div>
  );
};
export default Data;
