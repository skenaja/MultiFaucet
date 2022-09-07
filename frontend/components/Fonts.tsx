import React from "react";
import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: Whyte Regular;
      font-weight: normal;
      font-style: normal;
      src: url("./fonts/ABCWhyte-Regular.woff2") format("woff2");
    }
    
    @font-face {
      font-family: Whyte Book;
      font-weight: normal;
      font-style: book;
      src: url("./fonts/ABCWhyte-Book.woff2") format("woff2");
    }
    
    @font-face {
      font-family: Whyte Inktrap Medium;
      font-weight: 300;
      font-style: medium;
      src: url("./fonts/ABCWhyteInktrap-Medium.woff2") format("woff2");
    }
    
    @font-face {
      font-family: Ortica Light;
      font-weight: 300;
      font-style: light;
      src: url("./fonts/Ortica-Light.woff2") format("woff2");
    }
      `}
  />
);

export default Fonts;
