import './styles/sport_demo.css'

import '@simonwep/pickr/dist/themes/classic.min.css'; 
import './styles/main.css'
import Skinner from './js/Skinner'
import createCss from './js/cssCallback'

document.addEventListener("DOMContentLoaded", function () {
    var head = document.getElementsByTagName("head")[0];
    window.style = document.createElement("style");
    style.id = 'demo_css'
    style.setAttribute("type", "text/css");
    head.appendChild(style);
});

const config = {
    body: {
        Background: {
          isDark: false,
          color: "#2b2b2b"
        },
    },
    accent: {
        Background: {
          color: "#ffb700"
        },
        hide: ['accent', 'border']
    },
    dominant: {
        Background: {
          color: "#353535"
        },
        fallback: "body",
        hide: ['gradient', 'accent']
    },
    button: {
        Background: {
          color: "#177B17"
        },
        fallback: "accent"
    },
    odd: {
        Background: {
          color: "#000"
        },
        fallback: "body",
        hide: ['accent']
    },
    oddActive: {
        Background: {
          color: "#ffb700"
        },
        fallback: "accent",
        hide: ['accent']
    },
    header: {
        Background: {
          color: "#333"
        },
        Gradient: {
          color: "#555"
        },
        Text: {
          color: "#ffb700"
        },
        fallback: "dominant",
        variation: "Bg3",
        hide: ['accent', 'border']
    },
    subHeader: {
        Background: {
          color: "#2b2b2b"
        },
        fallback: "header",
        hide: ['accent', 'border', 'radius']
    },
    event: {
        Background: {
          color: "#666"
        },
        fallback: "dominant",
        hide: ['radius']
    },
    modal: {
        Background: {
          color: "#333"
        },
        fallback: "dominant",
    },
    tab: {
        Background: {
          color: "#2b2b2b"
        },
        fallback: "dominant",
        hide: ['accent', 'border']
    },
    tabActive: {
        Background: {
          color: "#333"
        },
        fallback: "tab",
        hide: ['accent', 'border']
    },
    input: {
        Background: {
          color: "#333"
        },
        fallback: "dominant",
        hide: ['accent']
    },
};


const SkinnerInstance = new Skinner(createCss, config)
SkinnerInstance.init()