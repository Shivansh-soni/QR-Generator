import React, { useEffect } from "react";
import { FaCompass, FaFacebook, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineCloudUpload, AiOutlineWifi } from "react-icons/ai";
import { BsQrCode } from "react-icons/bs";
import { SiPaytm } from "react-icons/si";
import { MdPhoneInTalk } from "react-icons/md";
import { useQRStore } from "../../utils/Store/QRStore";
const Left = () => {
  const {
    url,
    domain,
    activeButton,
    setDomain,
    setUrlText,
    setActiveButton,
    setGenerated,
    setInputText,
  } = useQRStore();

  useEffect(() => {
    if (activeButton !== 1) {
      setInputText("");
    } else {
      setInputText("https://tap-n.in/");
    }
  }, [activeButton]);
  return (
    <div className="w-10/12">
      <div className=" h-full mt-5  flex flex-col justify-between p-10  text-gray-400">
        <ul className="flex flex-col  gap-10 text-accent">
          <li
            className={`
                   flex items-center gap-2 hover:cursor-pointer
                   ${
                     activeButton === 1
                       ? `border-l-4 p-2 border-accent text-accent `
                       : `text-gray-400`
                   }
                 `}
            onClick={() => {
              setActiveButton(1);
              setUrlText("Website URL");
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
                     ? `border-l-4 p-2 border-accent text-accent `
                     : `text-gray-400`
                 }
               `}
            onClick={() => {
              setActiveButton(2);
              setUrlText("Facebook username/link");
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
                     ? `border-l-4 p-2 border-accent text-accent `
                     : `text-gray-400`
                 }
               `}
            onClick={() => {
              setActiveButton(3);
              setUrlText("Instagram Username");
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
                     ? `border-l-4 p-2 border-accent text-accent `
                     : `text-gray-400`
                 }
               `}
            onClick={() => {
              setActiveButton(4);
              setUrlText("YouTube link");
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
                     ? `border-l-4 p-2 border-accent text-accent `
                     : `text-gray-400`
                 }
               `}
            onClick={() => {
              setActiveButton(5);
              setUrlText("Phone Number");
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
                     ? `border-l-4 p-2 border-accent text-accent `
                     : `text-gray-400`
                 }
               `}
            onClick={() => {
              setActiveButton(6);
              setUrlText("Wifi Details");
              setGenerated(false);
            }}
            disabled={activeButton === 6}
          >
            <AiOutlineWifi />
            Wifi Network
          </li>
          <li
            className={`
                 flex items-center gap-2 hover:cursor-pointer
                 ${
                   activeButton === 7
                     ? `border-l-4 p-2 border-accent text-accent `
                     : `text-gray-400`
                 }
               `}
            onClick={() => {
              setActiveButton(7);
              setUrlText("UPI ID");
              setGenerated(false);
            }}
            disabled={activeButton === 7}
          >
            <SiPaytm />
            Upi ID
          </li>
          <li
            className={`
                 flex items-center gap-2 hover:cursor-pointer
                 ${
                   activeButton === 8
                     ? `border-l-4 p-2 border-accent text-accent `
                     : `text-gray-400`
                 }
               `}
            onClick={() => {
              setActiveButton(8);
              setUrlText("file-upload");
              setGenerated(false);
            }}
            disabled={activeButton === 8}
          >
            <AiOutlineCloudUpload />
            File Upload
          </li>
          <li
            className={`
                 flex items-center gap-2 hover:cursor-pointer
                 ${
                   activeButton === 9
                     ? `border-l-4 p-2 border-accent text-accent `
                     : `text-gray-400`
                 }
               `}
            onClick={() => {
              setActiveButton(9);
              setUrlText("Search Term");
              setDomain("www.google.com/search?q=");
              setGenerated(false);
            }}
            disabled={activeButton === 9}
          >
            <BiSearchAlt2></BiSearchAlt2>
            Google Search
          </li>
        </ul>
        {/* <div className="w-full rounded-2xl flex flex-col border border-gray-300 p-5 gap-3 items-center">
               <p className="text-xs text-center">
                 Unlimited QR Codes, analytics, and more with Popl Pro
               </p>
               <button className="bg-accent rounded-full text-accent py-3 text-sm w-32">
                 Subscribe to Pro
               </button>
             </div> */}
      </div>
    </div>
  );
};

export default Left;
