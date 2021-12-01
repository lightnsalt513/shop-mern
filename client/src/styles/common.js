import styled, { css } from "styled-components/macro";

// common buttons
const btnStyle = css`
  padding: 10px;
  background-color: transparent;
  font-size: ${(props) => props.fontSize ? props.fontSize : '20px'};
  text-transform: uppercase;
  cursor: pointer;
  box-sizing: border-box;
  
  &:disabled {
    cursor: default;
  }
`;

export const CommonBtnColored = styled.button`
  ${btnStyle}
  background-color: ${(props) => props.bgcolor ? props.bgcolor : 'teal'};
  border: none;
  color: ${(props) => props.color ? props.color : 'white'};
  
  &:disabled {
    background: gray;
  }
`;

export const CommonBtnOutlined = styled.button`
  ${btnStyle}
  border-color: ${(props) => props.bdcolor && props.bdcolor};

  &:disabled {
    border-color: gray;
    color: gray;
  }
`;


