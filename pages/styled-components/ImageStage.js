import styled from 'styled-components';

const StyledImageStage = styled.div`
  max-width: calc(100vw - 30px);
  max-height: calc(100vw - 30px);
  background: #eee;
  padding: 24px;
  border: 4px dashed #ccc;
  border-radius: 32px;
  margin: 15px;
  width: 500px;
  height: 500px;
  position: relative;
  display: block;
`;

const ImageStage = (props) => {
  return <StyledImageStage>{props.children}</StyledImageStage>;
};
export default ImageStage;
