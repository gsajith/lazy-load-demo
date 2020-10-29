import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  font-size: ${(props) => (props.size ? props.size : 'inherit')};
  width: 1em;
  height: 1em;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 0.8em;
    height: 0.8em;
    margin: 0.1em;
    border: 0.1em solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const LoadingSpinner = ({ size, style }) => {
  return (
    <Spinner size={size} style={style}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Spinner>
  );
};

export default LoadingSpinner;
