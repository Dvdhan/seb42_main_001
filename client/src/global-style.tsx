import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

/* 그밖의 글로벌 스타일 작성하기 */

:root {
    /* color */
    --color-main: #473F3F;
    --color-sub-dark-gray: #8F8F8F;
    --color-sub-gray: #DODODO;
    --color-sub-light-gray: #E4E4E4;
    --color-white: #FFFFFF;

    /* font */
    --text-x-small: 11px;
    --text-small: 14px;
    --text-medium: 18px;
    --text-large: 22px;
    --text-x-large: 26px;

    /* radius */
    --radius-size: 10px;
}

* {
    font-family: ‘SUIT Variable’, sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

a {
    text-decoration: none;
}

div, button {
    letter-spacing: 0.4px;
}

`;
