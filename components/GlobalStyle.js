import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --text-primary: #121212;
        --background-primary: #fafbff;
    }
  
    /* rubik-regular - latin */
    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        src: local(''),
            url('/fonts/rubik-v21-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/rubik-v21-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }

    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Rubik';
        background-color: var(--background-primary);
        color: var(--text-primary);
    }
  `;

export default GlobalStyle;
