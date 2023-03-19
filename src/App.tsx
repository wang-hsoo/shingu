import React,{ useEffect } from "react";
import AppRouter from "./AppRouter";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { getBoad } from "./service/BoardService";
import { connect } from "react-redux";
import { setPost } from "./store/store";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dark, isTheme, light } from "./store/atom";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
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
  font: 15px/1.5 'Noto Sans KR', 'Nanum Gothic', '맑은고딕','Malgun Gothic','나눔고딕','nanumgothic',굴림,Gulim,돋움,Dotum, Sans-serif;
  vertical-align: baseline;
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
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.2;
  overflow-x:hidden;
  background-color:  ${(props) => props.theme.bgColor};
}
a {
  text-decoration:none;
  color:inherit;
}
button{
  border: 0;
  outline: 0;
  cursor: pointer;
  background-color: transparent;
}
`;


function App() {
  const isTh = useRecoilValue(isTheme);
  const setTheme = useSetRecoilState(isTheme);


  useEffect(()=>{ 
    const user = sessionStorage.getItem("user");
    
    if(user){
      const getUser = JSON.parse(user);
      setTheme(getUser.darkmode);
    }
    
  },[])
  

  return (
    <>
      
        <ThemeProvider theme={ isTh ? dark : light }>
          <ReactNotification />
          <GlobalStyle />
          <AppRouter />
        </ThemeProvider>
    
    </>
  );
}


export default App;
