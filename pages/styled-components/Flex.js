import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => {
    if (props.row) return 'row';
    return 'column';
  }};
  flex-align: ${(props) => (props.flexAlign ? props.flexAlign : 'center')};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'center'};
`;

export default Flex;
