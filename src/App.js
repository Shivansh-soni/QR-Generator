import "./App.css";
import Footer from "./components/Footer/Footer";
import HeadingComponent from "./components/Heading/HeadingComponent";
import Navbar from "./components/Navbar/Navbar";
import Data from "./components/Qr/Data";

import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div className="bg-primary">
      <Navbar />
      <div className="flex justify-center mt-20 lg:justify-start ">
        <HeadingComponent heading="QRcode Generator" />
      </div>
      <div>
        <Data />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default App;
