import React from 'react';
import Flex from '../styled-components/Flex';
import Button from './Button';

const ButtonGroup = ({ options, selected, setSelected }) => {
  return (
    <Flex row style={{ marginTop: 16 }}>
      {options &&
        options.map((option, index) => {
          let style = {};
          if (index === 0 && options.length > 1) {
            style.borderRadius = '8px 0px 0px 8px';
          } else if (index === options.length - 1 && options.length > 1) {
            style.borderRadius = '0px 8px 8px 0px';
          } else if (options.length > 1) {
            style.borderRadius = 0;
          }

          return (
            <Button
              outlined={option !== selected}
              style={style}
              onClick={() => setSelected(option)}
            >
              {option}
            </Button>
          );
        })}
    </Flex>
  );
};

export default ButtonGroup;
