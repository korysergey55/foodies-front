import styled from "styled-components";
import { px, py, body1 } from "styles/atomic";
import theme from "styles/theme";

export const StyledButton = styled("button")`
  width: 343px;
  height: 48px;

  ${py("14")};
  ${px("113")};
  border-radius: 30px;
  border: none;
  background-color: #050505d9;
  color: ${theme.colors.light};
  ${body1()};
  font-weight: ${theme.fontWeights.bold};
  text-transform: uppercase;
  cursor: pointer;
  ${theme.mq.mobileOnly} {
    width: 100%;
    max-width: 343px;
  }

  ${theme.mq.tablet} {
    max-width: 394px;
    height: 56px;
    ${py(4)};
    ${px("120")};
  }

  ${theme.mq.desktop} {
  }
`;
