import React, { useState, useEffect } from "react";

const Digit = (props) => {
  const config = {
    fillColor: props.fillColor || "#00cc00",
    strokeColor: props.strokeColor || "#333333",

    drawInactive: props.drawInactive === false ? false : true,
    inactiveColor: props.inactiveColor || "#222222",

    width: props.width || "50",
    height: props.height || "50",
    animate: props.animate,
    animationTimeout: 20
  };

  // start with a 8 (all segments used), so that we first display
  // all segments, then just the ones we needed, as if the
  // digit has "booted".
  const initialDigit = config.animate ? "8" : props.value;
  const [digit, setDigit] = useState(initialDigit);

  // polygon paths for the seven segments
  const segments = [
    "  0,20   10, 10  20, 20  20, 80  10, 90   0, 80 ",
    " 80,20   90, 10 100, 20 100, 80  90, 90  80, 80 ",
    "  0,100  10, 90  20,100  20,160  10,170   0,160 ",
    " 80,100  90, 90 100,100 100,160  90,170  80,160 ",

    " 10, 10  20,  0  80,  0  90, 10  80, 20  20, 20 ",
    " 10, 90  20, 80  80, 80  90, 90  80,100  20,100 ",
    " 10,170  20,160  80,160  90,170  80,180  20,180 "
  ];

  // which segments are used in each of the numbers
  const segmentMap = {
    "0": [0, 1, 2, 3, 4, 6],
    "1": [1, 3],
    "2": [1, 2, 4, 5, 6],
    "3": [1, 3, 4, 5, 6],
    "4": [0, 1, 3, 5],
    "5": [0, 3, 4, 5, 6],
    "6": [0, 2, 3, 4, 5, 6],
    "7": [1, 3, 4],
    "8": [0, 1, 2, 3, 4, 5, 6],
    "9": [0, 1, 3, 4, 5, 6],
    "-": [5],
    default: []
  };

  useEffect(() => {
    if (config.animate) {
      var secondAnimation = null;
      let firstAnimation = setTimeout(() => {
        setDigit("8");
        secondAnimation = setTimeout(() => {
          setDigit(props.value);
        }, config.animationTimeout);
      }, config.animationTimeout);

      return () => {
        clearTimeout(firstAnimation);
        clearTimeout(secondAnimation);
        setDigit(props.value);
      };
    } else {
      setDigit(props.value);
    }
  }, [props.value, config.animationTimeout, config.animate]);

  return (
    <svg
      width={config.width}
      height={config.height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 180"
    >
      <style type="text/css">
        {`
          polygon.active {
            stroke: ${config.strokeColor};
            fill:   ${config.fillColor};
          }

          polygon.inactive {
            fill: ${config.inactiveColor};
          }
        `}
      </style>

      {
        // draw the inactive segments first
        segments.map((seg, i) => (
          <polygon className="inactive" points={seg} key={1000 + i} />
        ))
      }

      {segmentMap[digit]
        ? // if the shape of the digit is known, draw the segments
          // from the segment map
          segmentMap[digit]
            .map((s) => segments[s])
            .map((seg, i) => (
              <polygon className="active" points={seg} key={i} />
            ))
        : //otherwise, don't draw any active segments
          null}
    </svg>
  );
};

export default Digit;
