import Router from "./Router";
import { styled, ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { FaMoon, FaSun } from "react-icons/fa"; 
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-weight: 550;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Source Sans 3", sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ToggleButton = styled.button`
    border: none;
    background-color: ${(props) => props.theme.toggleColor};
    padding: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.iconColor};
    border-radius: 15px;
    &:hover {
        cursor: pointer;
    }
    position: absolute;
    top: 37px;
    right: 38%;
    z-index: 1;
`;

function App() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const isDark = useRecoilValue(isDarkAtom);

  return  (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <ToggleButton onClick={toggleDarkAtom}>
          {isDark ? <FaSun /> : <FaMoon />}
        </ToggleButton>
        <Router />
        {/*<ReactQueryDevtools initialIsOpen={true} />*/}
      </ThemeProvider>
    </>
  );
}

export default App;
