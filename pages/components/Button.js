import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../styled-components/LoadingSpinner';

const StyledButton = styled.button`
  background: ${(props) =>
    props.disabled ? '#ccc' : props.outlined ? 'transparent' : 'black'};
  color: ${(props) => (props.outlined ? 'black' : 'white')};
  border: 2px solid black;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};
  transition: 200ms ease all;
  &:hover,
  &:focus {
    background: ${(props) =>
      props.disabled ? '#ccc' : props.outlined ? '#aaa' : '#555'};
  }
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const ChildrenWrapper = styled.div`
  opacity: ${(props) => (props.loading ? 0 : 1)};
`;

const ParentWrapper = styled.div`
  position: relative;
`;

const Button = (props) => {
  const { children, loading, outlined, ...other } = props;
  const buttonRef = useRef(null);
  useEffect(() => {
    if (!loading) {
      buttonRef.current.blur();
    }
  }, [loading]);
  return (
    <StyledButton ref={buttonRef} {...other} outlined={outlined}>
      <ParentWrapper>
        {loading && (
          <LoadingSpinner
            size="24px"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
        <ChildrenWrapper loading={loading ? 1 : 0}>{children}</ChildrenWrapper>
      </ParentWrapper>
    </StyledButton>
  );
};

export default Button;
