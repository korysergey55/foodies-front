import styled from "styled-components";
import { px, py, body1 } from "styles/atomic";
import theme from "styles/theme";

export const StyledButton = styled("button")`
  width: 343px;
  height: 48px;

  ${py(3.5)};
  ${px(35.25)};
  border-radius: 30px;
  border: none;
  background-color: #050505d9;
  color: #ffffff;
  ${body1()};
  font-weight: 700;
  text-transform: uppercase;
  ${theme.mq.mobileOnly} {
  }

  ${theme.mq.tablet} {
    width: 394px;
    height: 56px;
    ${py(4)};
    ${px(40.5)};
  }

  ${theme.mq.desktop} {
  }
`;
