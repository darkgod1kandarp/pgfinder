// import React, { useEffect } from "react";
// import { Back, gsap } from "gsap";
// import styled from "styled-components";
// import $ from "jquery";
// import { useMediaQuery } from "react-responsive";

// const ParentDiv = styled.div`
//   width: ${(props) => props.bolterWidth}px;
//   height: ${(props) => props.bolterHeight}px;
//   position: relative;
//   padding: 20px;
//   background: ${(props) => props.background};
// `;  

// const StyledSVG = styled.svg`
//   position: absolute;
//   display: block;
//   stroke-width: 4;
//   fill: none;
//   stroke-linecap: round;
//   stroke: ${(props) => props.boltColor};
// `;

// const StyledSVGCircle = styled(StyledSVG)`
//   left: 7px;
//   top: 100%;
//   width: 112px;
//   height: 44px;
//   stroke-dashoffset: 179px;
//   stroke-dasharray: 0px 178px;
// `;

// const StyledSVGLine = styled(StyledSVG)`
//   --r: 0deg;
//   top: 95%;
//   width: 70px;
//   height: 3px;
//   stroke-dashoffset: 71px;
//   stroke-dasharray: 0px 70px;
//   transform: rotate(var(--r));
// `;

// const StyledSVGWhite = styled(StyledSVG)`
//   --r: 0deg;
//   --s: 1;
//   top: 30%;
//   z-index: 1;
//   stroke: #fff;
//   stroke-dashoffset: 241px;
//   stroke-dasharray: 0px 240px;
//   transform: rotate(var(--r)) scaleX(var(--s));
// `;

// const StyledSVGLineLeft = styled(StyledSVGLine)`
//   --r: 130deg;
//   left: -24px;
// `;

// const StyledSVGLineRight = styled(StyledSVGLine)`
//   --r: 40deg;
//   right: -24px;
// `;

// const StyledSVGWhiteLeft = styled(StyledSVGWhite)`
//   --r: -20deg;
//   left: 0;
// `;

// const StyledSVGWhiteRight = styled(StyledSVGWhite)`
//   --r: 20deg;
//   --s: -1;
//   right: 0;
// `;

// const StyledDiv = styled.div`
//   display: block;
//   position: relative;
//   :before {
//     content: "";
//     position: absolute;
//     left: 50%;
//     top: 44%;
//     width: 112px;
//     height: 112px;
//     margin: -56px 0 0 -56px;
//     background: #cdd9ed;
//     filter: blur(124px);
//   }
//   :after {
//     content: "";
//     position: absolute;
//     left: 50%;
//     top: 44%;
//     width: 64px;
//     height: 64px;
//     margin: -32px 0 0 -32px;
//     background: ${(props) => props.backgroundBlurColor};
//     z-index: 1;
//     filter: blur(60px);
//   }
// `;

// const StyledSpan = styled.span`
//   display: block;
//   width: ${(props) => props.bolterWidth}px;
//   height: ${(props) => props.bolterHeight}px;
//   background: ${(props) => props.boltColor};
//   clip-path: polygon(40% 0%, 100% 0, 65% 40%, 88% 40%, 8% 100%, 36% 50%, 0 50%);
// `;

// const BoltLoader = ({
//   className = `boltloader`,
//   background = `transparent`,
//   boltColor = `#f2de10`,
//   backgroundBlurColor = `#fff9bc`,
//   size = `64px`,
//   desktopSize = ``,
//   mobileSize = ``,
// }) => {
//   const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
//   const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

//   let sizeFound = 0.0;
//   if (isDesktopOrLaptop) {
//     if (desktopSize !== "") sizeFound = parseFloat(desktopSize);
//     else sizeFound = parseFloat(size) * 2;
//   }
//   if (isTabletOrMobile) {
//     if (mobileSize !== "") sizeFound = parseFloat(mobileSize);
//     else sizeFound = parseFloat(size);
//   }

//   let sizePassed = parseFloat(sizeFound);
//   let bolterWidth = (sizePassed * 63) / 64;
//   let bolterHeight = (sizePassed * 93) / 64;

//   useEffect(() => {
//     $("." + className).each(function (e) {
//       var bolt = $(this),
//         div = $(this).children(".boltloadersparkdiv");

//       bolt.addClass("boltloaderanimatedelement");

//       var tween = gsap
//         .timeline({
//           onComplete() {
//             bolt.removeClass("boltloaderanimatedelement");
//             repeat();
//           },
//         })
//         .set(div, {
//           rotation: 360,
//         })
//         .to(div, 0.7, {
//           y: 80,
//           rotation: 370,
//         })
//         .to(div, 0.6, {
//           y: -140,
//           rotation: 20,
//         })
//         .to(div, 0.1, {
//           rotation: -24,
//           y: 80,
//         })
//         .to(div, 0.8, {
//           ease: Back.easeOut.config(1.6),
//           rotation: 0,
//           y: 0,
//         });

//       function repeat() {
//         setTimeout(() => {
//           bolt.addClass("boltloaderanimatedelement");
//           tween.restart();
//         }, 400);
//       }
//     });
//   });

//   return (
//     <div>
//       <style>
//         {`
//           .${className}.boltloaderanimatedelement div:before, .${className}.boltloaderanimatedelement div:after {
//                 animation: shine 2s ease; 
//             } 
//             .${className}.boltloaderanimatedelement div span {
//                 animation: morph 2s ease;
//             }
//             .${className}.boltloaderanimatedelement svg.circle {
//                 animation: circle 0.45s cubic-bezier(0.77, 0, 0.175, 1) forwards 1.3s;
//             }
//             .${className}.boltloaderanimatedelement svg.line {
//                 animation: line 0.45s cubic-bezier(0.77, 0, 0.175, 1) forwards 1.3s;
//             }
//             .${className}.boltloaderanimatedelement svg.white {
//                 animation: white 0.45s cubic-bezier(0.77, 0, 0.175, 1) forwards 1.45s;
//             }
//             .${className}.boltloaderanimatedelement svg.white.right {
//                 animation-delay: 1.6s;
//             }
//             @keyframes circle {
//                 100% {
//                     stroke-dasharray: 178px 178px;
//             }
//             }
//             @keyframes white {
//                 100% {
//                     stroke-dasharray: 240px 240px;
//             }
//             }
//             @keyframes line {
//                 100% {
//                     stroke-dasharray: 70px 70px;
//             }
//             }
//             @keyframes shine {
//                 30%, 70% {
//                     opacity: 0;
//             }
//             }
//             @keyframes morph {
//                 12% {
//                     clip-path: polygon(40% 5%, 100% 0, 65% 40%, 65% 40%, 8% 100%, 24% 50%, 24% 50%);
//             }
//                 24%, 72% {
//                     clip-path: polygon(36% 40%, 82% 40%, 82% 40%, 82% 40%, 36% 71%, 36% 40%, 36% 40%);
//             }
//                 84% {
//                     clip-path: polygon(40% 5%, 100% 0, 65% 40%, 65% 40%, 8% 100%, 24% 50%, 24% 50%);
//             }
//             } 
//     `}
//       </style>
//       <ParentDiv
//         className={className}
//         background={background}
//         bolterWidth={bolterWidth}
//         bolterHeight={bolterHeight}
//       >
//         <StyledSVGWhiteLeft
//           boltColor={boltColor}
//           viewBox="0 0 170 57"
//           className="white left"
//         >
//           <path d="M36.2701759,17.9733192 C-0.981139498,45.4810755 -7.86361824,57.6618438 15.6227397,54.5156241 C50.8522766,49.7962945 201.109341,31.1461782 161.361488,2"></path>
//         </StyledSVGWhiteLeft>
//         <StyledSVGWhiteRight
//           boltColor={boltColor}
//           viewBox="0 0 170 57"
//           className="white right"
//         >
//           <path d="M36.2701759,17.9733192 C-0.981139498,45.4810755 -7.86361824,57.6618438 15.6227397,54.5156241 C50.8522766,49.7962945 201.109341,31.1461782 161.361488,2"></path>
//         </StyledSVGWhiteRight>
//         <StyledDiv
//           className="boltloadersparkdiv"
//           backgroundBlurColor={backgroundBlurColor}
//         >
//           <StyledSpan
//             boltColor={boltColor}
//             bolterWidth={bolterWidth}
//             bolterHeight={bolterHeight}
//             className="boltloadersparkdivspan"
//           ></StyledSpan>
//         </StyledDiv>
//         <StyledSVGCircle
//           boltColor={boltColor}
//           viewBox="0 0 112 44"
//           className="circle"
//         >
//           <path d="M96.9355003,2 C109.46067,13.4022454 131.614152,42 56.9906735,42 C-17.6328048,42 1.51790702,13.5493875 13.0513641,2"></path>
//         </StyledSVGCircle>
//         <StyledSVGLineLeft
//           boltColor={boltColor}
//           viewBox="0 0 70 3"
//           className="line left"
//         >
//           <path
//             transform="translate(-2.000000, 0.000000)"
//             d="M2,1.5 L70,1.5"
//           ></path>
//         </StyledSVGLineLeft>
//         <StyledSVGLineRight
//           boltColor={boltColor}
//           viewBox="0 0 70 3"
//           className="line right"
//         >
//           <path
//             transform="translate(-2.000000, 0.000000)"
//             d="M2,1.5 L70,1.5"
//           ></path>
//         </StyledSVGLineRight>
//       </ParentDiv>
//     </div>
//   );
// };

// export default BoltLoader;


// import React from "react";
// import styled, { keyframes } from "styled-components";
// import { useMediaQuery } from "react-responsive";
// import { darken } from "polished";

// const AnimBox = (animParams) => keyframes`
// 0%{
//     transform: translate(${animParams.start[0]}%, ${animParams.end[0]}%);
// }
// 50% {
//     transform: translate(${animParams.start[1]}%, ${animParams.end[1]}%);
// }
// 100% {
//     transform: translate(${animParams.start[2]}%, ${animParams.end[2]}%);
// }
// `;

// const Container = styled.div`
//   --size: ${(props) => props.sizeBoxes}px;
//   --duration: 800ms;
//   height: calc(var(--size) * 2);
//   width: calc(var(--size) * 3);
//   position: relative;
//   transform-style: preserve-3d;
//   transform-origin: 50% 50%;
//   margin-bottom: ${(props) => props.sizeMarginBottom}px;
//   // margin-top: calc(var(--size) * 1.5 * -1);
//   padding: 70px;
//   transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
// `;

// const StyledBox = styled.div`
//   --size: ${(props) => props.sizeBoxes}px;
//   --duration: 800ms;
//   width: var(--size);
//   height: var(--size);
//   top: 0;
//   left: 0;
//   position: absolute;
//   transform-style: preserve-3d;
//   transform: translate(
//     ${(props) => props.boxTransforms[0]}%,
//     ${(props) => props.boxTransforms[1]}%
//   );
//   animation: ${(props) => AnimBox(props.animParams)} var(--duration) linear
//     infinite;
//   & > div {
//     --background: ${(props) => props.colors.main};
//     --top: auto;
//     --right: auto;
//     --bottom: auto;
//     --left: auto;
//     --translateZ: calc(var(--size) / 2);
//     --rotateY: 0deg;
//     --rotateX: 0deg;
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     background: var(--background);
//     top: var(--top);
//     right: var(--right);
//     bottom: var(--bottom);
//     left: var(--left);
//     transform: rotateY(var(--rotateY)) rotateX(var(--rotateX))
//       translateZ(var(--translateZ));
//   }
//   & > div:nth-child(1) {
//     --top: 0;
//     --left: 0;
//   }
//   & > div:nth-child(2) {
//     --background: ${(props) => props.colors.right};
//     --right: 0;
//     --rotateY: 90deg;
//   }
//   & > div:nth-child(3) {
//     --background: ${(props) => props.colors.left};
//     --rotateX: -90deg;
//   }
//   & > div:nth-child(4) {
//     --background: ${(props) => props.colors.shadow};
//     --top: 0;
//     --left: 0;
//     --translateZ: calc(var(--size) * 3 * -1);
//   }
// `;

// const StyledBoxDiv = styled.div`
//   --background: ${(props) => props.boxDivParams.background};
//   --top: ${(props) => props.boxDivParams.top};
//   --right: ${(props) => props.boxDivParams.right};
//   --bottom: ${(props) => props.boxDivParams.bottom};
//   --left: ${(props) => props.boxDivParams.left};
//   --translateZ: ${(props) => props.boxDivParams.translateZ};
//   --rotateY: ${(props) => props.boxDivParams.rotateX};
//   --rotateX: ${(props) => props.boxDivParams.rotateY};
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background: var(--background);
//   top: var(--top);
//   right: var(--right);
//   bottom: var(--bottom);
//   left: var(--left);
//   transform: rotateY(var(--rotateY)) rotateX(var(--rotateX))
//     translateZ(var(--translateZ));
// `;

// const BoxesLoader = ({
//   className = `boxesloader`,
//   boxColor = `#5C8DF6`,
//   shadowColor = `#dbe3f4`,
//   duration = 800,
//   size = `64px`,
//   desktopSize = ``,
//   mobileSize = ``,
// }) => {
//   const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
//   const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

//   let sizeFound = 0.0;
//   if (isDesktopOrLaptop) {
//     if (desktopSize !== "") sizeFound = parseFloat(desktopSize);
//     else sizeFound = parseFloat(size) * 2;
//   }
//   if (isTabletOrMobile) {
//     if (mobileSize !== "") sizeFound = parseFloat(mobileSize);
//     else sizeFound = parseFloat(size);
//   }

//   let sizePassed = parseFloat(sizeFound);
//   let sizeBoxes = (sizePassed * 32) / 64;
//   let sizeMarginBottom = (sizePassed * 50) / 64;

//   const boxRightColor = darken(0.15, boxColor);
//   const boxLeftColor = darken(0.05, boxColor);

//   const colors = {
//     main: boxColor,
//     right: boxRightColor,
//     left: boxLeftColor,
//     shadow: shadowColor,
//   };

//   let animParams = [
//     {
//       start: [100, 100, 200],
//       end: [0, 0, 0],
//     },
//     {
//       start: [0, 0, 100],
//       end: [100, 0, 0],
//     },
//     {
//       start: [100, 100, 0],
//       end: [100, 100, 100],
//     },
//     {
//       start: [200, 200, 100],
//       end: [0, 100, 100],
//     },
//   ];
//   let boxTransforms = [
//     [100, 0],
//     [0, 100],
//     [100, 100],
//     [200, 0],
//   ];

//   let boxDivParams = [
//     {
//       top: "0",
//       right: "auto",
//       bottom: "auto",
//       left: "0",
//       background: boxColor,
//       rotateX: "0deg",
//       rotateY: "0deg",
//       translateZ: "calc(var(--size) / 2)",
//     },
//     {
//       top: "auto",
//       right: "0",
//       bottom: "auto",
//       left: "auto",
//       background: boxRightColor,
//       rotateX: "0deg",
//       rotateY: "90deg",
//       translateZ: "calc(var(--size) / 2)",
//     },
//     {
//       top: "auto",
//       right: "auto",
//       bottom: "auto",
//       left: "auto",
//       background: boxLeftColor,
//       rotateX: "-90deg",
//       rotateY: "0deg",
//       translateZ: "calc(var(--size) / 2)",
//     },
//     {
//       top: "0",
//       right: "auto",
//       bottom: "auto",
//       left: "0",
//       background: shadowColor,
//       rotateX: "0deg",
//       rotateY: "0deg",
//       translateZ: "calc(var(--size) * 3 * -1)",
//     },
//   ];

//   return (
//     <Container
//       sizeMarginBottom={sizeMarginBottom}
//       duration={duration}
//       sizeBoxes={sizeBoxes}
//       className={className}
//     >
//       <StyledBox
//         duration={duration}
//         colors={colors}
//         sizeBoxes={sizeBoxes}
//         animParams={animParams[0]}
//         boxTransforms={boxTransforms[0]}
//       >
//         <StyledBoxDiv boxDivParams={boxDivParams[0]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[1]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[2]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[3]}></StyledBoxDiv>
//       </StyledBox>
//       <StyledBox
//         duration={duration}
//         colors={colors}
//         sizeBoxes={sizeBoxes}
//         animParams={animParams[1]}
//         boxTransforms={boxTransforms[1]}
//       >
//         <StyledBoxDiv boxDivParams={boxDivParams[0]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[1]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[2]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[3]}></StyledBoxDiv>
//       </StyledBox>
//       <StyledBox
//         duration={duration}
//         colors={colors}
//         sizeBoxes={sizeBoxes}
//         animParams={animParams[2]}
//         boxTransforms={boxTransforms[2]}
//       >
//         <StyledBoxDiv boxDivParams={boxDivParams[0]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[1]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[2]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[3]}></StyledBoxDiv>
//       </StyledBox>
//       <StyledBox
//         duration={duration}
//         colors={colors}
//         sizeBoxes={sizeBoxes}
//         animParams={animParams[3]}
//         boxTransforms={boxTransforms[3]}
//       >
//         <StyledBoxDiv boxDivParams={boxDivParams[0]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[1]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[2]}></StyledBoxDiv>
//         <StyledBoxDiv boxDivParams={boxDivParams[3]}></StyledBoxDiv>
//       </StyledBox>
//     </Container>
//   );
// };

// export default BoxesLoader;



import React from "react";
import styled, { keyframes } from "styled-components";
import { darken, lighten } from "polished";

const AnimBoxMove = (boxMoveParams) => keyframes`
${boxMoveParams[0]}% {
    transform: translate(var(--x), var(--y));
}
${boxMoveParams[1]}%, 52% {
    transform: translate(0, 0);
}
80% {
    transform: translate(0, -32px);
}
90%, 100% {
    transform: translate(0, 188px);
}
`;
const AnimBoxScale = (boxScaleParams) => keyframes`
${boxScaleParams[0]}% {
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
}
${boxScaleParams[1]}%, 100% {
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
}
`;
const AnimGround = keyframes`
0%, 65% {
    transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
}
75%, 90% {
    transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1);
}
100% {
    transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
}
`;
const AnimGroundShine = keyframes`
0%, 70% {
    opacity: 0;
}
75%, 87% {
    opacity: 0.2;
}
100% {
    opacity: 0;
}
`;

const AnimMask = keyframes`
0%, 65% {
    opacity: 0;
}
66%, 100% {
    opacity: 1;
}
`;

const Container = styled.div`
  --background: ${(props) => props.background}; //#121621;
  --duration: ${(props) => props.duration}s;
  --primary: ${(props) => props.primaryColor}; //rgba(39, 94, 254, 1);
  --primary-light: ${(props) => props.primary}; //#2f71ff;
  --primary-rgba: ${(props) => props.primaryRGBA}00; //rgba(39, 94, 254, 0);
  width: 200px;
  height: 320px;
  position: relative;
  transform-style: preserve-3d;
  @media (max-width: 480px) {
    zoom: 0.44;
  }
  :before,
  :after {
    --r: 20.5deg;
    content: "";
    width: 320px;
    height: 140px;
    position: absolute;
    right: 32%;
    bottom: -11px;
    background: var(--background);
    transform: translateZ(200px) rotate(var(--r));
    animation: ${AnimMask} var(--duration) linear forwards infinite;
  }
  :after {
    --r: -20.5deg;
    right: auto;
    left: 32%;
  }
`;

const GroundDiv = styled.div`
  transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px)
    translateZ(100px) scale(0);
  width: 200px;
  height: 200px;
  background: var(--primary);
  background: linear-gradient(
    45deg,
    var(--primary) 0%,
    var(--primary) 50%,
    var(--primary-light) 50%,
    var(--primary-light) 100%
  );
  transform-style: preserve-3d;
  animation: ${AnimGround} var(--duration) linear forwards infinite;
  :before,
  :after {
    --rx: 90deg;
    --ry: 0deg;
    --x: 44px;
    --y: 162px;
    --z: -50px;
    content: "";
    width: 156px;
    height: 300px;
    opacity: 0;
    background: linear-gradient(var(--primary), var(--primary-rgba));
    position: absolute;
    transform: rotateX(var(--rx)) rotateY(var(--ry))
      translate(var(--x), var(--y)) translateZ(var(--z));
    animation: ${AnimGroundShine} var(--duration) linear forwards infinite;
  }
  :after {
    --rx: 90deg;
    --ry: 90deg;
    --x: 0;
    --y: 177px;
    --z: 150px;
  }
`;

const Ground = styled.div`
  position: absolute;
  left: -50px;
  bottom: -120px;
  transform-style: preserve-3d;
  transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
`;

const Box = styled.div`
  --x: 0px;
  --y: 0px;
  position: absolute;
  animation: var(--duration) linear forwards infinite;
  transform: translate(var(--x), var(--y));
  & > div {
    background-color: var(--primary);
    width: 48px;
    height: 48px;
    position: relative;
    transform-style: preserve-3d;
    animation: var(--duration) ease forwards infinite;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
  }
  & > div:before,
  & > div:after {
    --rx: 90deg;
    --ry: 0deg;
    --z: 24px;
    --y: -24px;
    --x: 0;
    content: "";
    position: absolute;
    background-color: inherit;
    width: inherit;
    height: inherit;
    transform: rotateX(var(--rx)) rotateY(var(--ry))
      translate(var(--x), var(--y)) translateZ(var(--z));
    filter: brightness(var(--b, 1.2));
  }
  & > div:after {
    --rx: 0deg;
    --ry: 90deg;
    --x: 24px;
    --y: 0;
    --b: 1.4;
  }
`;

const Box0 = styled(Box)`
  --x: -220px;
  --y: -120px;
  left: 58px;
  top: 108px;
  animation-name: ${(props) => AnimBoxMove(props.boxMoveParams)};
  & > div {
    animation-name: ${(props) => AnimBoxScale(props.boxScaleParams)};
  }
`;
const Box1 = styled(Box)`
  --x: -260px;
  --y: 120px;
  left: 25px;
  top: 120px;
  animation-name: ${(props) => AnimBoxMove(props.boxMoveParams)};
  & > div {
    animation-name: ${(props) => AnimBoxScale(props.boxScaleParams)};
  }
`;
const Box2 = styled(Box)`
  --x: 120px;
  --y: -190px;
  left: 58px;
  top: 64px;
  animation-name: ${(props) => AnimBoxMove(props.boxMoveParams)};
  & > div {
    animation-name: ${(props) => AnimBoxScale(props.boxScaleParams)};
  }
`;
const Box3 = styled(Box)`
  --x: 280px;
  --y: -40px;
  left: 91px;
  top: 120px;
  animation-name: ${(props) => AnimBoxMove(props.boxMoveParams)};
  & > div {
    animation-name: ${(props) => AnimBoxScale(props.boxScaleParams)};
  }
`;
const Box4 = styled(Box)`
  --x: 60px;
  --y: 200px;
  left: 58px;
  top: 132px;
  animation-name: ${(props) => AnimBoxMove(props.boxMoveParams)};
  & > div {
    animation-name: ${(props) => AnimBoxScale(props.boxScaleParams)};
  }
`;
const Box5 = styled(Box)`
  --x: -220px;
  --y: -120px;
  left: 25px;
  top: 76px;
  animation-name: ${(props) => AnimBoxMove(props.boxMoveParams)};
  & > div {
    animation-name: ${(props) => AnimBoxScale(props.boxScaleParams)};
  }
`;
const Box6 = styled(Box)`
  --x: -260px;
  --y: 120px;
  left: 91px;
  top: 76px;
  animation-name: ${(props) => AnimBoxMove(props.boxMoveParams)};
  & > div {
    animation-name: ${(props) => AnimBoxScale(props.boxScaleParams)};
  }
`;
const Box7 = styled(Box)`
  --x: -240px;
  --y: 200px;
  left: 58px;
  top: 87px;
  animation-name: ${(props) => AnimBoxMove(props.boxMoveParams)};
  & > div {
    animation-name: ${(props) => AnimBoxScale(props.boxScaleParams)};
  }
`;

const ScatterBoxLoader = ({
  className = `scatterboxloader`,
  background = `#FFFFFF`,
  primaryColor = `#2f71ff`,
  duration = 5,
  size = `64px`,
  desktopSize = ``,
  mobileSize = ``,
}) => {
  let primary = darken(0.15, primaryColor);
  let primaryRGBA = lighten(0.15, primaryColor);

  let boxMoveParams = [
    [12, 25],
    [16, 29],
    [20, 33],
    [24, 37],
    [28, 41],
    [32, 45],
    [36, 49],
    [40, 53],
  ];
  let boxScaleParams = [
    [6, 14],
    [10, 18],
    [14, 22],
    [18, 26],
    [22, 30],
    [26, 34],
    [30, 38],
    [34, 42],
  ];

  return (
    <Container
      duration={duration}
      background={background}
      primary={primary}
      primaryColor={primaryColor}
      primaryRGBA={primaryRGBA}
      className={className}
    >
      <Box0 boxMoveParams={boxMoveParams[0]} boxScaleParams={boxScaleParams[0]}>
        <div></div>
      </Box0>
      <Box1 boxMoveParams={boxMoveParams[1]} boxScaleParams={boxScaleParams[1]}>
        <div></div>
      </Box1>
      <Box2 boxMoveParams={boxMoveParams[2]} boxScaleParams={boxScaleParams[2]}>
        <div></div>
      </Box2>
      <Box3 boxMoveParams={boxMoveParams[3]} boxScaleParams={boxScaleParams[3]}>
        <div></div>
      </Box3>
      <Box4 boxMoveParams={boxMoveParams[4]} boxScaleParams={boxScaleParams[4]}>
        <div></div>
      </Box4>
      <Box5 boxMoveParams={boxMoveParams[5]} boxScaleParams={boxScaleParams[5]}>
        <div></div>
      </Box5>
      <Box6 boxMoveParams={boxMoveParams[6]} boxScaleParams={boxScaleParams[6]}>
        <div></div>
      </Box6>
      <Box7 boxMoveParams={boxMoveParams[0]} boxScaleParams={boxScaleParams[0]}>
        <div></div>
      </Box7>
      <Ground>
        <GroundDiv></GroundDiv>
      </Ground>
    </Container>
  );
};

export default ScatterBoxLoader;



// import React, { useEffect } from "react";
// import styled from "styled-components";
// import { gsap } from "gsap";
// import { Anchor, Cylinder } from "zdog";
// import { useMediaQuery } from "react-responsive";

// const StyledDiv = styled.div`
//   width: ${(props) => props.sizeDiv}px;
//   heigt: ${(props) => props.sizeDiv}px;
// `;

// function radiansToDegrees(_val) {
//   return _val * (Math.PI / 180);
// }

// function blendEases(startEase, endEase, blender) {
//   var parse = function (ease) {
//       return typeof ease === "function" ? ease : gsap.parseEase("power4.inOut");
//     },
//     s = gsap.parseEase(startEase),
//     e = gsap.parseEase(endEase),
//     blender = parse(blender);
//   return function (v) {
//     var b = blender(v);
//     return s(v) * (1 - b) + e(v) * b;
//   };
// }

// const SquircleLoader = ({
//   className = `squircleloader`,
//   color = `#EF4444`,
//   backfaceColor = `#4F46E5`,
//   alternateColor = `#10B981`,
//   size = `64px`,
//   desktopSize = ``,
//   mobileSize = ``,
// }) => {
//   const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
//   const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

//   let sizeFound = 0.0;
//   if (isDesktopOrLaptop) {
//     if (desktopSize !== "") sizeFound = parseFloat(desktopSize);
//     else sizeFound = parseFloat(size) * 2;
//   }
//   if (isTabletOrMobile) {
//     if (mobileSize !== "") sizeFound = parseFloat(mobileSize);
//     else sizeFound = parseFloat(size);
//   }

//   let sizePassed = parseFloat(sizeFound);
//   let sizeDiv = (sizePassed * 200) / 64;

//   useEffect(() => {
//     let line1 = "expo.in",
//       line2 = "circ",
//       ease = blendEases(line1, line2);

//     let rotateEase = ease; //blendEases('circ.in','expo')
//     let colorCount = 0;
//     let svg = document.querySelector(".zdog-svg-squircle-loader");

//     let scene = new Anchor({
//       translate: { x: 400, y: 300 },
//       scale: 2,
//     });

//     let cylinder = new Cylinder({
//       addTo: scene,
//       diameter: 200,
//       length: 200,
//       stroke: false,
//       color: color, //"#058ED9",
//       backface: backfaceColor, //"#4059AD",
//     });

//     function animate() {
//       scene.updateGraph();
//       render();
//     }

//     function render() {
//       //empty( svg );
//       scene.renderGraphSvg(svg);
//     }

//     function empty(element) {
//       while (element.firstChild) {
//         element.removeChild(element.firstChild);
//       }
//     }
//     function changeColor() {
//       gsap.to(cylinder, {
//         color:
//           cylinder.color === color
//             ? backfaceColor
//             : cylinder.color === backfaceColor
//             ? alternateColor
//             : color,
//       });
//       //colorCount++;
//     }

//     var tl = gsap.timeline({ repeat: -1, onUpdate: animate });
//     tl.to(
//       cylinder.rotate,
//       {
//         //duration: 1,
//         y: `+=${radiansToDegrees(90)}`,
//         ease: ease,
//       },
//       "+=0.5"
//     )

//       .to(
//         cylinder.rotate,
//         {
//           //duration: 1,
//           y: `+=${radiansToDegrees(90)}`,
//           ease: ease,
//         },
//         "+=0.5"
//       )
//       .call(changeColor);

//     console.log(cylinder);
//   });
//   return (  
//     <StyledDiv className={className} sizeDiv={sizeDiv}>
//       <svg className="zdog-svg-squircle-loader" viewBox="0 0 800 600"></svg>
//     </StyledDiv>
//   );
// };

// export default SquircleLoader;



// import React from "react";
// import styled, { keyframes } from "styled-components";
// import { useMediaQuery } from "react-responsive";
// // import "./xlviroundedloader.css";

// const Anim = (animParams) => keyframes`
// 0% {
//     width: ${animParams.w[0]}px;
//     height: ${animParams.h[0]}px;
//     margin-top: ${animParams.mt[0]}px;
//     margin-left: ${animParams.ml[0]}px;
// }
// 12.5% {
//     width: ${animParams.w[1]}px;
//     height: ${animParams.h[1]}px;
//     margin-top: ${animParams.mt[1]}px;
//     margin-left: ${animParams.ml[1]}px;
// }
// 25% {
//     width: ${animParams.w[2]}px;
//     height: ${animParams.h[2]}px;
//     margin-top: ${animParams.mt[2]}px;
//     margin-left: ${animParams.ml[2]}px;
// }
// 37.5% {
//     width: ${animParams.w[3]}px;
//     height: ${animParams.h[3]}px;
//     margin-top: ${animParams.mt[3]}px;
//     margin-left: ${animParams.ml[3]}px;
// }
// 50% {
//     width: ${animParams.w[4]}px;
//     height: ${animParams.h[4]}px;
//     margin-top: ${animParams.mt[4]}px;
//     margin-left: ${animParams.ml[4]}px;
// }
// 62.5% {
//     width: ${animParams.w[5]}px;
//     height: ${animParams.h[5]}px;
//     margin-top: ${animParams.mt[5]}px;
//     margin-left: ${animParams.ml[5]}px;
// }
// 75% {
//     width: ${animParams.w[6]}px;
//     height: ${animParams.h[6]}px;
//     margin-top: ${animParams.mt[6]}px;
//     margin-left: ${animParams.ml[6]}px;
// }
// 87.5% {
//     width: ${animParams.w[7]}px;
//     height: ${animParams.h[7]}px;
//     margin-top: ${animParams.mt[7]}px;
//     margin-left: ${animParams.ml[7]}px;
// }
// 100% {
//     width: ${animParams.w[8]}px;
//     height: ${animParams.h[8]}px;
//     margin-top: ${animParams.mt[8]}px;
//     margin-left: ${animParams.ml[8]}px;
// }
// `;

// const StyledContainer = styled.div`
//   background: ${(props) => props.background};
//   width: ${(props) => props.sizeContainer}px;
//   height: ${(props) => props.sizeContainer}px;
//   padding: 20px;
// `;

// const StyledBox = styled.div`
//   box-sizing: border-box;
//   position: absolute;
//   display: block;
//   border-radius: ${(props) => props.sizeBorderRadius}px;
//   border: ${(props) => props.sizeBorderThickness}px solid
//     ${(props) => props.borderColor};
//   width: ${(props) => props.boxParams.w}px;
//   height: ${(props) => props.boxParams.h}px;
//   margin-top: ${(props) => props.boxParams.mt}px;
//   margin-left: ${(props) => props.boxParams.ml}px;
//   animation: ${(props) => Anim(props.animParams)} 3s 0s forwards
//     cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
// `;

// const XlviLoader = ({
//   className = `xlviloader`,
//   backgound = `transparent`,
//   boxColors = [`#333`],
//   size = `64px`,
//   desktopSize = ``,
//   mobileSize = ``,
// }) => {
//   let colorsToFill = [];
//   if (boxColors.constructor === String) {
//     if (boxColors === ``) {
//       boxColors = "#333";
//     }
//     colorsToFill.push(boxColors);
//   }
//   if (boxColors.constructor === Array) {
//     let asize = boxColors.length;
//     if (asize === 0) {
//       boxColors.push("#333");
//       asize = boxColors.length;
//     }
//     for (let i = 0; i < 3; i += 1) {
//       if (i < asize) colorsToFill.push(boxColors[i]);
//       else colorsToFill.push(boxColors[asize - 1]);
//     }
//   }

//   const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
//   const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

//   var sizeFound = 0.0;
//   if (isDesktopOrLaptop) {
//     if (desktopSize !== "") sizeFound = parseFloat(desktopSize);
//     else sizeFound = parseFloat(size) * 2;
//   }

//   if (isTabletOrMobile) {
//     if (mobileSize !== "") sizeFound = parseFloat(mobileSize);
//     else sizeFound = parseFloat(size);
//   }

//   let sizePassed = parseFloat(sizeFound);
//   let sizeContainer = (sizePassed * 112) / 64;
//   let sizeBorderRadius = (sizePassed * 24) / 64;
//   let sizeBorderThickness = (sizePassed * 16) / 64;

//   let box1Params = {
//     w: (sizePassed * 112) / 64,
//     h: (sizePassed * 48) / 64,
//     mt: (sizePassed * 64) / 64,
//     ml: 0,
//   };

//   let box2Params = {
//     w: (sizePassed * 48) / 64,
//     h: (sizePassed * 48) / 64,
//     mt: 0,
//     ml: 0,
//   };

//   let box3Params = {
//     w: (sizePassed * 48) / 64,
//     h: (sizePassed * 48) / 64,
//     mt: 0,
//     ml: (sizePassed * 64) / 64,
//   };

//   let anim1Params = {
//     w: [
//       (sizePassed * 112) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//     ],
//     h: [
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 112) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//     ],
//     mt: [
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       0,
//       0,
//       0,
//     ],
//     ml: [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   };

//   let anim2Params = {
//     w: [
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 112) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//     ],
//     h: [
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//     ],
//     mt: [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     ml: [
//       0,
//       0,
//       0,
//       0,
//       0,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//     ],
//   };

//   let anim3Params = {
//     w: [
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 112) / 64,
//     ],
//     h: [
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 112) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//       (sizePassed * 48) / 64,
//     ],
//     mt: [
//       0,
//       0,
//       0,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//     ],
//     ml: [
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       (sizePassed * 64) / 64,
//       0,
//     ],
//   };

//   return (
//     <StyledContainer
//       sizeContainer={sizeContainer}
//       background={backgound}
//       className={className}
//     >
//       <StyledBox
//         boxParams={box1Params}
//         sizeBorderRadius={sizeBorderRadius}
//         sizeBorderThickness={sizeBorderThickness}
//         borderColor={colorsToFill[0]}
//         animParams={anim1Params}
//         className="box1"
//       ></StyledBox>
//       <StyledBox
//         boxParams={box2Params}
//         sizeBorderRadius={sizeBorderRadius}
//         sizeBorderThickness={sizeBorderThickness}
//         borderColor={colorsToFill[1]}
//         animParams={anim2Params}
//         className="box2"
//       ></StyledBox>
//       <StyledBox
//         boxParams={box3Params}
//         sizeBorderRadius={sizeBorderRadius}
//         sizeBorderThickness={sizeBorderThickness}
//         borderColor={colorsToFill[2]}
//         animParams={anim3Params}
//         className="box3"
//       ></StyledBox>
//     </StyledContainer>
//   );
// };

// export default XlviLoader;