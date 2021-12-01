import { css } from "styled-components/macro";

const breakpoints = {
  tablet: '1280px',
  mobile: '768px'
}

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: ${breakpoints.tablet}) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: ${breakpoints.mobile}) {
      ${props}
    }
  `;
};