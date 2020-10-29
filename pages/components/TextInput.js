import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: 1px solid black;
  padding: 8px;
  border-radius: 6px;
  height: 100%;
`;

const Error = styled.div`
  color: red;
  font-size: 10px;
  position: absolute;
  bottom: -4px;
  left: 4px;
  width: 0;
  height: 0;
  min-height: 0;
  width: 100%;
`;

const TextWrapper = styled.div`
  position: relative;
`;

const TextInput = (props) => {
  const { error, ...other } = props;
  return (
    <TextWrapper>
      <StyledInput {...other} />
      <Error>{error}</Error>
    </TextWrapper>
  );
};

export default TextInput;
