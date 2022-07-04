function createCss(c) {

    let css = `
    :root {
        --bodyBg:  ${c.bodyBg};
        --bodyBg2:  ${c.bodyBg2};
        --bodyBg3: ${c.bodyBg3};  
        --bodyBgHover:  ${c.bodyBgHover};
        --bodyBg2Hover:  ${c.bodyBg2Hover};
        --bodyBg3Hover: ${c.bodyBg3Hover};
        --bodyRGBA:  ${c.bodyRGBA};
        --bodyRGBA2:  ${c.bodyRGBA2};
        --bodyRGBA3:  ${c.bodyRGBA3};
        --bodyTxt: ${c.bodyTxt};
        --bodyTxt2: ${c.bodyTxt2};
        --bodyTxt3: ${c.bodyTxt3};
        --bodyAccent: ${c.bodyAccent};
        --bodyAccentTxt: ${c.bodyAccentTxt};
        --bodyBorder:  ${c.bodyBorder};
        --bodyRadius:  ${c.bodyRadius}px;

        --dominantG: ${c.dominantG};
        --dominantRGBA: ${c.dominantRGBA};
        --dominantRGBA2: ${c.dominantRGBA2};
        --dominantRGBA3: ${c.dominantRGBA3};
        --dominantBg: ${c.dominantBg};
        --dominantBg2: ${c.dominantBg2};
        --dominantBg3: ${c.dominantBg3};
        --dominantBgHover: ${c.dominantBgHover};
        --dominantBg2Hover: ${c.dominantBg2Hover};
        --dominantBg3Hover: ${c.dominantBg3Hover};
        --dominantTxt: ${c.dominantTxt};
        --dominantTxt2: ${c.dominantTxt2};
        --dominantTxt3: ${c.dominantTxt3};
        --dominantTxtInverse: ${c.dominantTxtInverse}; 
        --dominantRadius: ${c.dominantRadius}px;
    
        --accentBg: ${c.accentBg};
        --accentBg2:  ${c.accentBg2};
        --accentBg3: ${c.accentBg3};
        --accentBgHover:  ${c.accentBgHover};
        --accentBg2Hover:  ${c.accentBg2Hover};
        --accentBg3Hover:  ${c.accentBg3Hover};
        --accentG: ${c.accentG};
        --accentTxt: ${c.accentTxt};
        --accentTxt2: ${c.accentTxt2};
        --accentTxt3: ${c.accentTxt3};        
      
        --buttonG: ${c.buttonG};
        --buttonBg:  ${c.buttonBg};
        --buttonBg2:  ${c.buttonBg2};
        --buttonBg3:  ${c.buttonBg3};
        --buttonBgHover:  ${c.buttonBgHover};
        --buttonBg2Hover:  ${c.buttonBg2Hover};
        --buttonBg3Hover:  ${c.buttonBg3Hover};
        --buttonTxt: ${c.buttonTxt};
        --buttonTxt2: ${c.buttonTxt2};
        --buttonTxt3: ${c.buttonTxt3};
        --buttonAccent: ${c.buttonAccent};
        --buttonAccentTxt: ${c.buttonAccentTxt};
        --buttonBorder: ${c.buttonBorder};
        --buttonRadius: ${c.buttonRadius}px;

        --inputG: ${c.inputG};
        --inputBg: ${c.inputBg};
        --inputBg2: ${c.inputBg2};
        --inputBg3: ${c.inputBg3}; 
        --inputBgHover: ${c.inputBgHover};
        --inputBg2Hover: ${c.inputBg2Hover};
        --inputBg3Hover: ${c.inputBg3Hover};
        --inputTxt:  ${c.inputTxt};
        --inputTxt2: ${c.inputTxt2};
        --inputTxt3: ${c.inputTxt3};
        --inputAccent: ${c.inputAccent};
        --inputAccentTxt: ${c.inputAccentTxt};
        --inputRadius: ${c.inputRadius}px;        
        --inputBorder: ${c.inputBorder};  

        --headerG: ${c.headerG};
        --headerBg: ${c.headerBg};
        --headerBg2: ${c.headerBg2};
        --headerBg3: ${c.headerBg3};
        --headerBgHover: ${c.headerBgHover};
        --headerBg2Hover: ${c.headerBg2Hover};
        --headerBg3Hover: ${c.headerBg3Hover};
        --headerTxt: ${c.headerTxt};
        --headerTxt2: ${c.headerTxt2};
        --headerTxt3: ${c.headerTxt3};
        --headerAccent: ${c.headerAccent};
        --headerAccentTxt: ${c.headerAccentTxt};
        --headerBorder: ${c.headerBorder};
        --headerRadius: ${c.headerRadius}px;

        --subHeaderG: ${c.subHeaderG};
        --subHeaderBg: ${c.subHeaderBg};
        --subHeaderBg2: ${c.subHeaderBg2};
        --subHeaderBg3: ${c.subHeaderBg3};
        --subHeaderBgHover: ${c.subHeaderBgHover};
        --subHeaderBg2Hover: ${c.subHeaderBg2Hover};
        --subHeaderBg3Hover: ${c.subHeaderBg3Hover};
        --subHeaderTxt: ${c.subHeaderTxt};
        --subHeaderTxt2: ${c.subHeaderTxt2};
        --subHeaderTxt3: ${c.subHeaderTxt3};
        --subHeaderAccent: ${c.subHeaderAccent};
        --subHeaderAccentTxt: ${c.subHeaderAccentTxt};
        --subHeaderBorder: ${c.subHeaderBorder};
        --subHeaderRadius: ${c.subHeaderRadius}px;

        --eventG: ${c.eventG};
        --eventBg: ${c.eventBg};
        --eventBg2: ${c.eventBg2};
        --eventBg3: ${c.eventBg3};  
        --eventBgHover: ${c.eventBgHover};
        --eventBg2Hover: ${c.eventBg2Hover};
        --eventBg3Hover: ${c.eventBg3Hover};
        --eventTxt: ${c.eventTxt};
        --eventTxt2: ${c.eventTxt2};
        --eventTxt3: ${c.eventTxt3};
        --eventAccent: ${c.eventAccent};
        --eventAccentTxt: ${c.eventAccentTxt};
        --eventBorder: ${c.eventBorder};
        --eventRadius:  ${c.eventRadius}px;

        --modalG: ${c.modalG};
        --modalBg: ${c.modalBg};
        --modalBg2: ${c.modalBg2};
        --modalBg3: ${c.modalBg3};
        --modalBgHover: ${c.modalBgHover};
        --modalBg2Hover: ${c.modalBg2Hover};
        --modalBg3Hover: ${c.modalBg3Hover};
        --modalTxt: ${c.modalTxt};
        --modalTxt2: ${c.modalTxt2};
        --modalTxt3: ${c.modalTxt3};
        --modalAccent: ${c.modalAccent};
        --modalAccentTxt: ${c.modalAccentTxt};
        --modalRadius: ${c.modalRadius}px;
        --modalBorder: ${c.modalBorder};
 
        --oddG: ${c.oddG};
        --oddBg: ${c.oddBg};
        --oddBg2: ${c.oddBg2};
        --oddBg3: ${c.oddBg3}; 
        --oddBgHover: ${c.oddBgHover};
        --oddBg2Hover: ${c.oddBg2Hover};
        --oddBg3Hover: ${c.oddBg3Hover};
        --oddTxt: ${c.oddTxt};
        --oddTxt2: ${c.oddTxt2};
        --oddTxt3: ${c.oddTxt3};
        --oddAccent: ${c.oddAccent};
        --oddAccentTxt: ${c.oddAccentTxt};
        --oddRadius: ${c.oddRadius}px;
        --oddBorder: ${c.oddBorder};

        --oddActiveG: ${c.oddActiveG};
        --oddActiveBg: ${c.oddActiveBg};
        --oddActiveBg2: ${c.oddActiveBg2};
        --oddActiveBg3: ${c.oddActiveBg3};  
        --oddActiveBgHover: ${c.oddActiveBgHover};
        --oddActiveBg2Hover: ${c.oddActiveBg2Hover};
        --oddActiveBg3Hover: ${c.oddActiveBg3Hover};
        --oddActiveTxt: ${c.oddActiveTxt};
        --oddActiveTxt2: ${c.oddActiveTxt2};
        --oddActiveTxt3: ${c.oddActiveTxt3};
        --oddActiveAccent: ${c.oddActiveAccent};
        --oddActiveAccentTxt: ${c.oddActiveAccentTxt};
        --oddActiveRadius: ${c.oddActiveRadius}px;
        --oddActiveBorder: ${c.oddActiveBorder};
 
        --tabG: ${c.tabG};
        --tabBg: ${c.tabBg};
        --tabBg2: ${c.tabBg2};
        --tabBg3: ${c.tabBg3};
        --tabBgHover: ${c.tabBgHover};
        --tabBg2Hover: ${c.tabBg2Hover};
        --tabBg3Hover: ${c.tabBg3Hover};
        --tabTxt: ${c.tabTxt};
        --tabTxt2: ${c.tabTxt2};
        --tabTxt3: ${c.tabTxt3};
        --tabAccent: ${c.tabAccent};
        --tabAccentTxt: ${c.tabAccentTxt};
        --tabRadius: ${c.tabRadius}px;
        --tabBorder: ${c.tabBorder};

        --tabActiveG: ${c.tabActiveG};
        --tabActiveBg: ${c.tabActiveBg};
        --tabActiveBg2: ${c.tabActiveBg2};
        --tabActiveBg3: ${c.tabActiveBg3};
        --tabActiveBgHover: ${c.tabActiveBgHover};
        --tabActiveBg2Hover: ${c.tabActiveBg2Hover};
        --tabActiveBg3Hover: ${c.tabActiveBg3Hover};
        --tabActiveTxt: ${c.tabActiveTxt};
        --tabActiveTxt2: ${c.tabActiveTxt2};
        --tabActiveTxt3: ${c.tabActiveTxt3};
        --tabActiveAccent: ${c.tabActiveAccent};
        --tabActiveAccentTxt: ${c.tabActiveAccentTxt};
        --tabActiveRadius: ${c.tabActiveRadius}px;
        --tabActiveBorder: ${c.tabActiveBorder}; 

        
    }

`;


    let results = {
        css: css,
        name: "skin",
    };

    var style = document.getElementById("demo_css");
    if (style) {
        style.innerHTML = css;
    }

    return results;
}


export default createCss