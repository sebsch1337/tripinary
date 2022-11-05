import styled, { keyframes } from "styled-components";

const blurIn = keyframes`
0% {backdrop-filter: blur(0px);}
100% {backdrop-filter: blur(30px);}
`;

const rotateCircleForwards = keyframes`
0% { transform: rotate(0);}
100% { transform: rotate(360deg);}
`;

const rotateCircleBackwards = keyframes`
0% { transform: rotate(0);}
100% { transform: rotate(-360deg);}
`;

export default function Loader() {
  return (
    <BlurryBackground>
      <OuterCircle width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 35C3 43.4869 6.37142 51.6263 12.3726 57.6274C18.3737 63.6286 26.5131 67 35 67C43.4869 67 51.6263 63.6286 57.6274 57.6274C63.6286 51.6263 67 43.4869 67 35C67 26.5131 63.6286 18.3737 57.6274 12.3726C51.6263 6.37142 43.4869 3 35 3"
          stroke="#316BFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate attributeName="opacity" dur="0.2s" keyTimes="0;1" values="0;1" repeatCount="1" />
        </path>
      </OuterCircle>

      <InnerCircle width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M52.7778 35C52.7778 31.4839 51.7351 28.0468 49.7817 25.1232C47.8282 22.1997 45.0517 19.921 41.8033 18.5755C38.5548 17.2299 34.9803 16.8779 31.5317 17.5638C28.0832 18.2498 24.9155 19.943 22.4292 22.4292C19.9429 24.9155 18.2498 28.0832 17.5638 31.5317C16.8778 34.9803 17.2299 38.5548 18.5755 41.8033C19.921 45.0517 22.1996 47.8282 25.1232 49.7817C28.0467 51.7351 31.4839 52.7778 35 52.7778"
          stroke="#316BFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate attributeName="opacity" dur="0.2s" keyTimes="0;1" values="0;1" repeatCount="1" />
        </path>
      </InnerCircle>
    </BlurryBackground>
  );
}

const BlurryBackground = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  animation-name: ${blurIn};
  animation-duration: 0.2s;
  animation-iteration-count: initial;
`;

const InnerCircle = styled.svg`
  position: absolute;
  animation-name: ${rotateCircleForwards};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const OuterCircle = styled.svg`
  position: absolute;
  animation-name: ${rotateCircleBackwards};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;
