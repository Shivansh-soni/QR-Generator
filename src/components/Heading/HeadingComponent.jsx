import React from "react";

const HeadingComponent = (props) => {
  return (
    <div className="md:ml-20 ">
      <h1 className="lg:text-6xl text-3xl font-bold text-secondary">
        {props.heading}
      </h1>
      <p className={`mt-2 ${props.theme ? "text-white" : "text-primary"}`}>
        {props.desc}
      </p>

      {/* <div className="absolute right-2">
        <Circle />
      </div> */}
    </div>
  );
};

export default HeadingComponent;
