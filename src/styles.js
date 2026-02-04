import { createGlobalStyle } from "styled-components";

import abcdiatypeLight from "./assets/fonts/ABCDiatype-Light-Trial.woff";
import abcdiatypeHeavy from "./assets/fonts/ABCDiatype-Heavy-Trial.woff";
import abcdiatypeUltra from "./assets/fonts/ABCDiatype-Ultra-Trial.woff";

const GlobalStyle = createGlobalStyle`
  :root {
    --color-forest: #154C2C;
    --color-mint: #66D575;
    --color-brick: #AE340F;
    --color-sky: #B1EDFF;
    --color-lime: #E7F5A6;
  }

  @font-face {
    font-family: 'ABCDiatype';
    src: url(${abcdiatypeLight}) format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'ABCDiatype';
    src: url(${abcdiatypeHeavy}) format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'ABCDiatype';
    src: url(${abcdiatypeUltra}) format('woff');
    font-weight: 800;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    overflow-x: clip;
    font-family: 'ABCDiatype', system-ui, -apple-system, sans-serif;
  }

  body {
    font-family: 'ABCDiatype', system-ui, -apple-system, sans-serif;
    font-weight: 300;
  }

  p {
    font-family: 'ABCDiatype', system-ui, -apple-system, sans-serif;
    font-size: clamp(2rem, 1.5vw, 5rem);
    font-weight: 300;
    line-height: 1.3;
    color: #1a1a1a;
    margin: 0 0 1.25em 0;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

export default GlobalStyle;
