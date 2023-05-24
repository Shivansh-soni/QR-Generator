import React, { useState, useEffect, useRef } from "react";
import { FaCompass, FaFacebook, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsQrCode, BsThreeDotsVertical } from "react-icons/bs";
import { MdPhoneInTalk } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import {
  renderToFile,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import HeadingComponent from "../Heading/HeadingComponent";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const QRCodeStyling = require("qr-code-styling");
const QRgenerator = () => {
  const [urls, setUrls] = useState("your Website URL");
  const [inputText, setInputText] = useState("https://ekko.network");
  const ref = useRef(null);
  const [activeButton, setActiveButton] = useState(1);
  const [domain, setDomain] = useState("");
  const [url, setUrl] = useState("");
  const [qrColor, setqrColor] = useState("#000000");
  const [generated, setGenerated] = useState(false);
  const [style, setStyle] = useState({
    color: "",
    dots: "",
    corner: "",
    backgroundColor: "",
  });

  // ------------QR CODE----------
  const qrCode = new QRCodeStyling({
    width: 150,
    height: 150,
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
  // ---------------useEffect--------------------------------
  useEffect(() => {
    qrCode.append(ref.current);
  }, [qrCode, ref]);
  useEffect(() => {
    qrCode.update({
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

  // ------------Event HAndlees-------
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    setInputText("");
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
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

  // ------------CSS------------
  let buttonCSS = `w-28 h-9 text-sm rounded-full ${
    generated ? `bg-black` : `btn-disabled`
  } text-white  `;
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* <Text></Text> */}
          <div ref={ref} />
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="h-full">
      <Navbar />
      <div className="flex justify-center lg:justify-start">
        <HeadingComponent heading="QRcode Generator" />
      </div>
      <div className="w-full lg:h-screen py-10 lg:px-10  rounded-2xl">
        <div className="w-full h-full  bg-white border rounded-3xl border-gray-300  flex md:flex-row flex-col shadow-xl">
          {/* ----------------------------------------Left side of page---------------------------------------- */}
          <div className=" h-full flex-[0.6] flex flex-col justify-between p-10  text-gray-400">
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
          <div className=" flex-[1.2] h-full lg:w-4/12 flex-col  p-5 items-center rounded-3xl">
            <div
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              <div className="flex justify-center my-2 ">
                {generated ? (
                  <>
                    <div ref={ref} id="QRID" />
                  </>
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
                  onClick={() => handleDownload("jpg")}
                >
                  JPG
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
                {/* //*-------------COLOR------------- */}
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
                      onChange={(e) =>
                        setStyle({ ...style, color: e.target.value })
                      }
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
                {/* //*---------------------Corner Square-------------------- */}
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
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};
export default QRgenerator;
