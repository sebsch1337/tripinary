import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --text-primary: #121212;
        --background-primary: #fafbff;
        --drop-shadow: #8e94a3;
        --gradient-primary: linear-gradient(135deg, rgba(49, 107, 255, 1) 0%, rgba(255, 255, 255, 1) 200%);
        --gradient-secondary: linear-gradient(135deg, rgba(255, 49, 49, 1) 0%, rgba(255, 255, 255, 1) 200%);
        --gradient-horizontal: linear-gradient(90deg, rgba(49, 107, 255, 1) 0%, rgba(255, 255, 255, 1) 200%);
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
        margin: 0;
        padding: 0;
        font-family: 'Rubik';
    }

    body {
        background-color: var(--background-primary);
        color: var(--text-primary);
    }
  `;

export default GlobalStyle;
