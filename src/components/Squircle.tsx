import React from "react";
import "./Squircle.scss";

const Squircle = (props: any) => {
  return (
    <svg className='squircle-svg' viewBox='0 0 200 200'>
      <defs>
        <pattern id='squircle' patternUnits='userSpaceOnUse' width='200' height='200'>
          <image
            xlinkHref={props.imgUrl || "https://picsum.photos/256/"}
            x='0'
            y='0'
            width='200'
            height='200'
          />
        </pattern>
      </defs>

      <path
        d='M100,200c43.8,0,68.2,0,84.1-15.9C200,168.2,200,143.8,200,100s0-68.2-15.9-84.1C168.2,0,143.8,0,100,0S31.8,0,15.9,15.9C0,31.8,0,56.2,0,100s0,68.2,15.9,84.1C31.8,200,56.2,200,100,200z'
        fill='url(#squircle)'
      />
    </svg>
  );
};

export default Squircle;
