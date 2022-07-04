import tinycolor from "tinycolor2";
import {guessVisibleColor} from './Neuron'
import Pickr from '@simonwep/pickr'

class Skinner {
    constructor(cssCb, starterConfig) {
        this.skinnerContainer = this.createControlsWrapper();
        this.configOrder = [{
            name: 'body',
            inherits: null
        },
        {
            name: 'accent',
            inherits: null
        },
        {
            name: 'dominant',
            inherits: ['body']
        },
        {
            name: 'button',
            inherits: ['accent']
        },
        {
            name: 'navbar',
            inherits: ['dominant', 'body']
            },
        {
            name: 'header',
            inherits: ['dominant', 'body'],
            variation: 5
        },
        {
            name: 'subHeader',
            inherits: ['header', 'dominant', 'body']
        },
        {
            name: 'event',
            inherits: ['dominant', 'body'],
        },
        {
            name: 'odd',
            inherits: ['body']
        },
        {
            name: 'oddActive',
            inherits: ['accent']
        },
        {
            name: 'showMore',
            inherits: ['body']
        },
          {
            name: 'tab',
            inherits: ['dominant', 'body']
        },
        {
            name: 'tabActive',
            inherits: ['tab', 'dominant', 'body']
        },
        {
            name: 'input',
            inherits: ['dominant', 'body']
        },
        {
            name: 'modal',
            inherits: ['dominant', 'body']
        },

        ];

        this.cssCb = cssCb;
        this.skin = {};
        this.isUIVisible = true;
        this.version = '2.1.1';


        this._config = starterConfig || {};

        this.activeEssences = this.configOrder.filter(c => {
            return this._config[c.name];
        });

        this.localStorage = {};

        this.defaults = {
            dark: {
                bg2: 6,
                bg3: 12,
                bgHov: 3
            },
            light: {
                bg2: 10,
                bg3: 15,
                bgHov: 3
            },
            alpha: {
                bg: 0.7,
                bg2: 0.5,
                bg3: 0.3
            },
            txt: {
                txt: 0.9,
                txt2: 0.6,
                txt3: 0.4
            }
        };

        this.mergedConfig = this.mergeConfig(this._config);
        this.generateInitialSkin();

        this.modifyKey = this.modifyKey.bind(this);
        this.generateInitialSkin = this.generateInitialSkin.bind(this);
        this.showOverlay = this.showOverlay.bind(this);
        this.hideOverlay = this.hideOverlay.bind(this);
        this.toggleUi = this.toggleUi.bind(this);
        this.initBasedOnCustomConfig = this.initBasedOnCustomConfig.bind(this);
        this.mergeConfig = this.mergeConfig.bind(this);
        this.saveConfig = this.saveConfig.bind(this);
        this.getFallbackLvl = this.getFallbackLvl.bind(this);

        this.generateBackgrounds = this.generateBackgrounds.bind(this);
        this.generateGradientss = this.generateGradientss.bind(this);
        this.generateTextss = this.generateTextss.bind(this);
        this.generateAccentss = this.generateAccentss.bind(this);
        this.generateBorderss = this.generateBorderss.bind(this);

        this.labelsMap = {
            body: "Body",
            accent: "Accent",
            dominant: "Dominant",
            button: "Button",
            buttonSecondary: "Secondary Button",
            odd: "Odd",
            oddActive: "Active Odd",
            showMore: "Show More",
            header: "Header",
            subHeader: "Subheader",
            eventWrapper: "Event Wrapper",
            event: "Event",
            menu_1: "Menu Level 1",
            menu_2: "Menu Level 2",
            menu_3: "Menu Level 3",
            popup: "Popup",
            tab: "Tab",
            tabActive: "Active Tab",
            tabSecondaryActive: "Active Secondary Tab",
            input: "Input",
            inputSecondary: "Secondary Input",
            navbar: "Navbar",
            slider: "Slider",
            collapse: "Collapse",
            marketHeader: "Market Header",
            filter: "Filter",
            tooltip: "Tooltip",
            tmLogo: "Team logo",
            betSlip: "Betslip",
            betSlipStake: "Betslip Stake",
            betSlipTab: "Betslip Tab",
            betSlipTabActive: "Betslip Tab Active",
            betSlipInput: "Betslip Input",
            betSlipButton: "Betslip Button"
        };
    }

    mergeConfig(config) {
        let _config = config;
        let _mergedConfig = {};
        let _missingConfig = {};
        for (let i = 0; i < this.configOrder.length; i++) {

            let _essence = this.configOrder[i].name;
            let _configBlueprint = {
                Background: {
                    isDark: false,
                    isActive: false,
                    color: "#19C950"
                },
                Gradient: {
                    isReversed: false,
                    isActive: false,
                    color: "#1703A2"
                },
                Text: {
                    isActive: false,
                    color: "#611BCD"
                },
                Accent: {
                    isActive: false,
                    color: "#F022FE"
                },
                Border: {
                    isActive: false,
                    color: "#AC23F7"
                },
                borderRadius: 0
            };
            _mergedConfig[_essence] = {};
            _mergedConfig[_essence].editable = Boolean(this.activeEssences.find(f => f.name === _essence));
            if (!_config[_essence]) {
                _missingConfig[_essence] = {};
            }
            for (const key in _configBlueprint) {
                _mergedConfig[_essence][key] = Object.assign(
                    _configBlueprint[key],
                    _config[_essence] ? _config[_essence][key] : {});
            }
            if (_essence === 'body' || _essence === 'accent') {
                _mergedConfig[_essence].Background.isActive = true;
            }
            _mergedConfig[_essence].fallback = this.configOrder[i].inherits;
            _mergedConfig[_essence].variation = this.configOrder[i].variation;
        }
        return _mergedConfig;
    }

    generateBackgrounds(essence) {
        let _essence = essence;
        let _vb = this.verbalData(_essence);
        let _isDark = this.skin[_vb.isDark];
        this.skin[_vb.nameBg2] = _isDark ?
            tinycolor(this.skin[_vb.nameBg]).darken(this.defaults.dark.bg2).toString() :
            tinycolor(this.skin[_vb.nameBg]).lighten(this.defaults.light.bg2).toString();

        this.skin[_vb.nameBg3] = _isDark ?
            tinycolor(this.skin[_vb.nameBg]).darken(this.defaults.dark.bg3).toString() :
            tinycolor(this.skin[_vb.nameBg]).lighten(this.defaults.light.bg3).toString();

        this.skin[_vb.nameBgHov] = _isDark ?
            tinycolor(this.skin[_vb.nameBg]).darken(this.defaults.dark.bgHov).toString() :
            tinycolor(this.skin[_vb.nameBg]).lighten(this.defaults.light.bgHov).toString();

        this.skin[_vb.nameBg2Hov] = _isDark ?
            tinycolor(this.skin[_vb.nameBg2]).darken(this.defaults.dark.bgHov).toString() :
            tinycolor(this.skin[_vb.nameBg2]).lighten(this.defaults.light.bgHov).toString();

        this.skin[_vb.nameBg3Hov] = _isDark ?
            tinycolor(this.skin[_vb.nameBg3]).darken(this.defaults.dark.bgHov).toString() :
            tinycolor(this.skin[_vb.nameBg3]).lighten(this.defaults.light.bgHov).toString();

        this.skin[_vb.nameRGBA] = tinycolor(this.skin[_vb.nameBg]).setAlpha(this.defaults.alpha.bg).toRgbString();
        this.skin[_vb.nameRGBA2] = tinycolor(this.skin[_vb.nameBg]).setAlpha(this.defaults.alpha.bg2).toRgbString();
        this.skin[_vb.nameRGBA3] = tinycolor(this.skin[_vb.nameBg]).setAlpha(this.defaults.alpha.bg3).toRgbString();

    }

    generateGradientss(essence) {
        let _essence = essence;
        let _vb = this.verbalData(_essence);
        let _isGradient = this.skin[_vb.isGradient];
        let _isGradientReversed = this.skin[_vb.isGradientReversed];

        if (_isGradient) {
            if (_isGradientReversed) {
                this.skin[_vb.nameG] = `linear-gradient(0deg, ${this.skin[_vb.nameBg_g]} 0%, ${this.skin[_vb.nameBg]} 100%)`;
            } else {
                this.skin[_vb.nameG] = `linear-gradient(180deg, ${this.skin[_vb.nameBg_g]} 0%, ${this.skin[_vb.nameBg]} 100%)`;
            }
        } else {
            this.skin[_vb.nameBg_g] = this.skin[_vb.nameBg2];
            this.skin[_vb.nameG] = this.skin[_vb.nameBg];
        }
    }

    generateTextss(essence) {
        let _essence = essence;
        let _vb = this.verbalData(_essence);
        let _isCustomTextActive = this.skin[_vb.isCustomTxt];
        let customTextColor = this.skin[_vb.nameTxt];

        if (_isCustomTextActive) {
            this.skin[_vb.nameTxt] = tinycolor(customTextColor).setAlpha(this.defaults.txt.txt).toRgbString();
        } else {
            this.skin[_vb.nameTxt] = tinycolor(guessVisibleColor(this.skin[_vb.nameBg])).setAlpha(this.defaults.txt.txt).toRgbString();
        }

        this.skin[_vb.nameTxt2] = tinycolor(this.skin[_vb.nameTxt]).setAlpha(this.defaults.txt.txt2).toRgbString();
        this.skin[_vb.nameTxt3] = tinycolor(this.skin[_vb.nameTxt]).setAlpha(this.defaults.txt.txt3).toRgbString();
    }

    generateAccentss(essence) {
        let _essence = essence;
        let _vb = this.verbalData(_essence);
        let _isCustomAccentActive = this.skin[_vb.isCustomAccent];
        let _customAccentColor = this.skin[_vb.nameAccent];
        if (_isCustomAccentActive) {
            this.skin[_vb.nameAccent] = _customAccentColor;
        } else {
            this.skin[_vb.nameAccent] = this.skin.accentBg || this.mergedConfig.accent.Background.color;
        }
        this.skin[_vb.nameAccentTxt] = tinycolor(guessVisibleColor(this.skin[_vb.nameAccent])).setAlpha(this.defaults.txt.txt).toRgbString();
    }

    generateBorderss(essence) {
        let _essence = essence;
        let _vb = this.verbalData(_essence);
        let _isCustomBorderActive = this.skin[_vb.isCustomBorder];
        let _customBorderColor = this.skin[_vb.nameBorder];
        if (_isCustomBorderActive) {
            this.skin[_vb.nameBorder] = _customBorderColor;
        } else {
            this.skin[_vb.nameBorder] = this.skin.bodyBg;
        }
    }

    generateInitialSkin() {
        let _config = this.mergedConfig;
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            let _vd = this.verbalData(_essence);

            if (_essence === 'body' || _essence === 'accent') {
                this.skin[_vd.isName] = true;
            } else {
                this.skin[_vd.isName] = _config[_essence].Background.isActive;
            }

            let isActive = this.skin[_vd.isName];

            if (isActive) {
                this.skin[_vd.nameBg] = _config[_essence].Background.color;
                this.skin[_vd.isDark] = _config[_essence].Background.isDark;
                this.generateBackgrounds(_essence);

                this.skin[_vd.isGradient] = _config[_essence].Gradient.isActive;
                this.skin[_vd.nameBg_g] = _config[_essence].Gradient.color;
                this.skin[_vd.isGradientReversed] = _config[_essence].Gradient.isReversed;
                this.generateGradientss(_essence);

                this.skin[_vd.isCustomTxt] = _config[_essence].Text.isActive;
                this.skin[_vd.nameTxt] = _config[_essence].Text.color;
                this.generateTextss(_essence);

                this.skin[_vd.isCustomAccent] = _config[_essence].Accent.isActive;
                this.skin[_vd.nameAccent] = _config[_essence].Accent.color;
                this.generateAccentss(_essence);

                this.skin[_vd.isCustomBorder] = _config[_essence].Border.isActive;
                this.skin[_vd.nameBorder] = _config[_essence].Border.color;
                this.generateBorderss(_essence);

                this.skin[_vd.nameRadius] = _config[_essence].borderRadius;
                this.skin[_vd.nameTxtInverse] = tinycolor(this.skin[_vd.nameTxt]).isLight() ? '#262626' : '#fff';
            }
            else {
                let _fbEssence = _config[_essence].fallback.find(f => {
                    return _config[f].editable && _config[f]['Background'].isActive;
                });
                let _vdf = this.verbalData(_fbEssence);
                let fbLength = _config[_essence].fallback.length;
                let variation = this.mergedConfig[_essence].variation;
                this.skin[_vd.nameBg] = this.getFallbackLvl(_fbEssence, variation, fbLength);
                this.generateBackgrounds(_essence);

                this.skin[_vd.isGradient] = this.skin[_vdf.isGradient];
                this.skin[_vd.nameBg_g] = this.skin[_vdf.nameBg_g];
                this.skin[_vd.isGradientReversed] = this.skin[_vdf.isGradientReversed];

                this.generateGradientss(_essence);

                this.skin[_vd.isCustomTxt] = this.skin[_vdf.isCustomTxt];
                this.skin[_vd.nameTxt] = this.skin[_vdf.nameTxt];
                this.generateTextss(_essence);

                this.skin[_vd.isCustomAccent] = this.skin[_vdf.isCustomAccent];
                this.skin[_vd.nameAccent] = this.skin[_vdf.nameAccent];
                this.generateAccentss(_essence);

                this.skin[_vd.isCustomBorder] = this.skin[_vdf.isCustomBorder];
                this.skin[_vd.nameBorder] = this.skin[_vdf.nameBorder];
                this.generateBorderss(_essence);

                this.skin[_vd.nameRadius] = this.skin[_vdf.nameRadius];
                this.skin[_vd.nameTxtInverse] = tinycolor(this.skin[_vd.nameTxt]).isLight() ? '#262626' : '#fff';

            }
            
        }

    }

    getFallbackLvl(essence, variation, lvl) {
        let _essence = essence;

        let _variation = variation;
        let _lvl = lvl;
        let _vb = this.verbalData(_essence);
        let _variationsArr = ["Bg", "BgHover", "Bg2", "Bg2Hover", "Bg3", "Bg3Hover"];
        let _bg = _variation ? this.skin[_vb.name + _variationsArr[_variation]] : this.skin[_vb.name + _variationsArr[_lvl]];

        return _bg;
    }


    initBasedOnCustomConfig(config) {
        let _config = config;
        this.mergedConfig = this.mergeConfig(_config);
        this.generateInitialSkin();
        this.generateTheme();
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            if (!this.mergedConfig[_essence].editable) {
                continue;
            }
            this.updateControlFor(_essence);
            let verbalData = this.verbalData(_essence);
            this[verbalData.nameBg].picker.setColor(this.skin[verbalData.nameBg], false);
            this[verbalData.nameBg].picker2.setColor(this.skin[verbalData.nameBg_g], false);
            this[verbalData.nameBg].picker3.setColor(this.skin[verbalData.nameTxt], false);
            this[verbalData.nameBg].borderPckr.setColor(this.skin[verbalData.nameBorder], false);
            this[verbalData.nameBg].customAccentPckr.setColor(this.skin[verbalData.nameAccent], false);
        }
        this.cssCb(this.skin);
    }

    init() {
        this.createHTML();
        // this.addVersioning();
        this.generateTheme();
        this.updateAllControls();
        this.createDownloadButton();
        this.createCloseButton();
        this.cssCb(this.skin);
    }

    addVersioning() {
        let vDiv = document.createElement('Div');
        vDiv.className = 'nik_skinner_versioning';
        vDiv.innerText = 'V ' + this.version;
    }

    prerogative(name) {
        return (name === "body" || name === "accent") ? true : false;
    }

    modifyKey(key, value) {
        this.skin[key] = value;
        this.generateTheme();
        this.updateAllControls();
        this.cssCb(this.skin);
    }

    verbalData(name) {
        let data = {};
        data.name = name;
        data.nameBg = data.name + "Bg";
        data.nameBg_g = data.nameBg + "_g";
        data.nameG = data.name + "G";
        data.nameRGBA = data.name + "RGBA";
        data.nameRGBA2 = data.name + "RGBA2";
        data.nameRGBA3 = data.name + "RGBA3";
        data.nameG2 = data.nameG + "2";
        data.nameBgHov = data.nameBg + "Hover";
        data.nameBg2 = data.nameBg + "2";
        data.nameBg2Hov = data.nameBg2 + "Hover";
        data.nameBg3 = data.nameBg + "3";
        data.nameBg3Hov = data.nameBg3 + "Hover";
        data.upperCaseName = data.name[0].toUpperCase() + data.name.substring(1);
        data.isName = "is" + data.upperCaseName + "Bg";
        data.isGradient = "is" + data.upperCaseName + "Gradient";
        data.isGradientReversed = data.isGradient + "Reversed";
        data.isDark = "is" + data.upperCaseName + "BgDark";

        data.nameTxt = data.name + "Txt";
        data.nameTxt2 = data.nameTxt + "2";
        data.nameTxt3 = data.nameTxt + "3";
        data.nameTxtInverse = data.nameTxt + "Inverse";

        data.isCustomTxt = "isCustom" + data.upperCaseName + "Txt";

        data.nameBorder = data.name + "Border";
        data.isCustomBorder = "isCustom" + data.upperCaseName + "Border";

        data.nameAccent = data.name + "Accent";
        data.isCustomAccent = "isCustom" + data.upperCaseName + "Accent";
        data.nameAccentTxt = data.name + "AccentTxt";

        data.nameRadius = data.name + "Radius";

        return data;
    }

    generateTheme() {
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            this.generateColorLogick(_essence);
        }
    }

    generateColorLogick(essence) {
        let _config = this.mergedConfig;
        let _essence = essence;
        let _vd = this.verbalData(_essence);

        if (_essence === 'body' || _essence === 'accent') {
            this.skin[_vd.isName] = true;
        } 

        let isActive = this.skin[_vd.isName];

        if (isActive) {
            this.generateBackgrounds(_essence);
            this.generateGradientss(_essence);
            this.generateTextss(_essence);
            this.generateAccentss(_essence);
            this.generateBorderss(_essence);

            this.skin[_vd.nameTxtInverse] = tinycolor(this.skin[_vd.nameTxt]).isLight() ? '#262626' : '#fff';
        }
        else {
            let _fbEssence = _config[_essence].fallback.find(f => {
                let vd = this.verbalData(f);
                return _config[f].editable && this.skin[vd.isName];
            });
            let fbLength = _config[_essence].fallback.length;
            let _vdf = this.verbalData(_fbEssence);
            let variation = _config[_essence].variation;
            this.skin[_vd.nameBg] = this.getFallbackLvl(_fbEssence, variation, fbLength);
            this.generateBackgrounds(_essence);

            this.skin[_vd.isDark] = this.skin[_vdf.isDark];

            this.skin[_vd.isGradient] = this.skin[_vdf.isGradient];
            this.skin[_vd.nameBg_g] = this.skin[_vdf.nameBg_g];
            this.skin[_vd.isGradientReversed] = this.skin[_vdf.isGradientReversed];

            this.generateGradientss(_essence);

            this.skin[_vd.isCustomTxt] = this.skin[_vdf.isCustomTxt];
            this.skin[_vd.nameTxt] = this.skin[_vdf.nameTxt];
            this.generateTextss(_essence);

            this.skin[_vd.isCustomAccent] = this.skin[_vdf.isCustomAccent];
            this.skin[_vd.nameAccent] = this.skin[_vdf.nameAccent];
            this.generateAccentss(_essence);

            this.skin[_vd.isCustomBorder] = this.skin[_vdf.isCustomBorder];
            this.skin[_vd.nameBorder] = this.skin[_vdf.nameBorder];
            this.generateBorderss(_essence);

            this.skin[_vd.nameRadius] = this.skin[_vdf.nameRadius];
            this.skin[_vd.nameTxtInverse] = tinycolor(this.skin[_vd.nameTxt]).isLight() ? '#262626' : '#fff';

        }

    }


    createFallbackArray(essence) {
        let _essence = essence;
        let fbArr = [];
        let fb = _essence.fallback;

        while (fb) {
            fbArr.push(fb);
            fb = this.mergedConfig[fb].fallback;
        }

        return fbArr;
    }

    saveConfig() {
        let config = {};
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            let verbalData = this.verbalData(_essence);
            config[verbalData.name] = {};
            config[verbalData.name].Background = {
                isActive: this.skin[verbalData.isName],
                color: this.skin[verbalData.nameBg],
                isDark: this.skin[verbalData.isDark]
            };
            if (this.skin[verbalData.isGradient]) {
                config[verbalData.name].Gradient = {
                    isActive: this.skin[verbalData.isName],
                    color: this.skin[verbalData.nameBg_g],
                    isReversed: this.skin[verbalData.isGradientReversed]
                };
            }
            if (this.skin[verbalData.isCustomTxt]) {
                config[verbalData.name].Text = {
                    isActive: this.skin[verbalData.isCustomTxt],
                    color: this.skin[verbalData.nameTxt]
                };
            }
            if (this.skin[verbalData.isCustomAccent]) {
                config[verbalData.name].Accent = {
                    isActive: this.skin[verbalData.isCustomAccent],
                    color: this.skin[verbalData.nameAccent]
                };
            }
            if (this.skin[verbalData.isCustomBorder]) {
                config[verbalData.name].Border = {
                    isActive: this.skin[verbalData.isCustomBorder],
                    color: this.skin[verbalData.nameBorder]
                };
            }
            if (this.skin[verbalData.nameRadius]) {
                config[verbalData.name].borderRadius = this.skin[verbalData.nameRadius];
            }
        }
        console.log(config);

        return config;
    }

    updateControlFor(name) {
        let c = this.verbalData(name);
        this.skin[c.isName] ? this[c.nameBg].picker.enable() : this[c.nameBg].picker.disable();
        this.skin[c.isGradient] ? this[c.nameBg].picker2.enable() : this[c.nameBg].picker2.disable();
        this.skin[c.isCustomTxt] ? this[c.nameBg].picker3.enable() : this[c.nameBg].picker3.disable();
        this.skin[c.isCustomBorder] ? this[c.nameBg].borderPckr.enable() : this[c.nameBg].borderPckr.disable();
        this.skin[c.isCustomAccent] ? this[c.nameBg].customAccentPckr.enable() : this[c.nameBg].customAccentPckr.disable();

        this[c.nameBg].radiusInput.disabled = !this.skin[c.isName];

        this[c.nameBg].checkBox2.disabled = !this.skin[c.isName];
        this[c.nameBg].checkBox3.disabled = !this.skin[c.isName];
        this[c.nameBg].borderChb.disabled = !this.skin[c.isName];
        this[c.nameBg].customAccentChb.disabled = !this.skin[c.isName];
        this[c.nameBg].checkBoxIsDark.disabled = !this.skin[c.isName];
        this[c.nameBg].checkBoxRevertGradient.disabled = !this.skin[c.isGradient];

        this[c.nameBg].checkBox.checked = this.skin[c.isName];
        this[c.nameBg].checkBox2.checked = this.skin[c.isGradient];
        this[c.nameBg].checkBoxIsDark.checked = this.skin[c.isDark];
        this[c.nameBg].checkBox3.checked = this.skin[c.isCustomTxt];
        this[c.nameBg].customAccentChb.checked = this.skin[c.isCustomAccent];
        this[c.nameBg].borderChb.checked = this.skin[c.isCustomBorder];


        if (name === "body") {
            this[c.nameBg].checkBox.checked = true;
            this[c.nameBg].checkBox.disabled = true;
        }
        if (name === "accent") {
            this[c.nameBg].checkBox.checked = true;
            this[c.nameBg].checkBox.disabled = true;
        }

        this[c.nameBg].picker.applyColor(false);
        this[c.nameBg].picker2.applyColor(false);
        this[c.nameBg].picker3.applyColor(false);
        this[c.nameBg].borderPckr.applyColor(false);
        this[c.nameBg].customAccentPckr.applyColor(false);

        this[c.nameBg].radiusInput.value = this.skin[c.nameRadius];

        this[c.nameBg].radiusAmount.innerText = this[c.nameBg].radiusInput.value;

    }

    updateAllControls() {
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            if (!this.mergedConfig[_essence].editable) {
                continue;
            }
            this.updateControlFor(_essence);
        }
    }

    createHTML() {
        let _config = this.mergedConfig;
        for (let i = 0; i < this.configOrder.length; i++) {
            let _essence = this.configOrder[i].name;
            if (!_config[_essence].editable) continue;
            let _vd = this.verbalData(_essence);
            let _hiddenControlsArray = _config[_essence].hide;

            this[_vd.nameBg] = this.createControl(
                _essence,
                this.skinnerContainer,
                (e) => {
                    this.modifyKey(_vd.isName, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.isGradient, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.isGradientReversed, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.nameBg, e.toHEXA().toString());
                },
                (e) => {
                    this.modifyKey(_vd.nameBg_g, e.toHEXA().toString());
                },
                (e) => {
                    this.modifyKey(_vd.isDark, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.isCustomTxt, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.nameTxt, e.toHEXA().toString());
                },
                (e) => {
                    this.modifyKey(_vd.isCustomAccent, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.nameAccent, e.toHEXA().toString());
                },
                (e) => {
                    this.modifyKey(_vd.isCustomBorder, e.target.checked);
                },
                (e) => {
                    this.modifyKey(_vd.nameBorder, e.toHEXA().toString());
                },
                (e) => {
                    this.modifyKey(_vd.nameRadius, e.target.value);
                },
                _hiddenControlsArray
            );

        }

    }

    toggleUi() {
        document.body.classList.toggle("nik_hide_ui");
    }

    createControlsWrapper() {
        const skinnerUITogglerWrapper = document.createElement("div");
        skinnerUITogglerWrapper.className = "skinner_ui_toggler_wrapper";
        const skinnerUITogglerLabel = document.createElement("label");
        skinnerUITogglerLabel.id = "skinner_ui_toggler";
        const skinnerUITogglerImitator = document.createElement("i");
        this.skinnerUIToggler = document.createElement("input");
        this.skinnerUIToggler.type = "checkbox";
        this.skinnerUIToggler.id = "skinner_ui_toggler";

        skinnerUITogglerWrapper.appendChild(skinnerUITogglerLabel);
        skinnerUITogglerLabel.appendChild(this.skinnerUIToggler);

        skinnerUITogglerLabel.appendChild(skinnerUITogglerImitator);
        document.body.appendChild(skinnerUITogglerWrapper);

        this.skinnerUIToggler.addEventListener("change", this.toggleUi);
        this.overlay = document.createElement("div");
        this.overlay.id = "skinner_overlay";
        document.body.appendChild(this.overlay);
        let toolbox = document.createElement("div");
        toolbox.className = "skinner_toolbox";
        let toolboxWrapper = document.createElement("div");
        toolboxWrapper.className = "skinner_toolbox_wrapper";
        let main = document.createElement("div");
        main.className = "nik_skinner_control_wrapper nik_skinner_scrollbar";
        let header = document.createElement("div");
        header.className = "nik_skinner_header_controls";
        toolbox.appendChild(toolboxWrapper);
        toolboxWrapper.appendChild(header);

        let tableHeaders = ["Name", "Background", "Gradient", "Text", "Accent", "Border", "Radius"];

        tableHeaders.forEach((h, index) => {
            let heading = document.createElement("div");
            let className;
            switch (h) {
                case "name":
                    className = "nik_skinner_header_control nik_skinner_header_control-name";
                    break;
                case "Background":
                case "Gradient":
                    className = "nik_skinner_header_control nik_skinner_header_control-big";
                    break;
                case "Text":
                case "Accent":
                case "Border":
                    className = "nik_skinner_header_control nik_skinner_header_control-small";
                    break;
                case "Radius":
                    className = "nik_skinner_header_control nik_skinner_header_control-radius";
                    break;
                default:
                    className = "nik_skinner_header_control";
            }
            heading.className = className;
            heading.innerText = h;
            header.appendChild(heading);
        });

        toolboxWrapper.appendChild(main);
        document.body.appendChild(toolbox);
        return main;
    }

    createBtn(name, number) {
        let downloadBtn = document.createElement("button");
        downloadBtn.innerText = 'download ' + name;
        downloadBtn.className = "nik_skinner_download_button";

        downloadBtn.addEventListener("click", () => {
            this.makeDownloadRequest(name, number);
        });
        return downloadBtn;
    }

    createDownloadButton() {
        this.btnWrapper = document.createElement("div");
        this.btnWrapper.className = "nik_skinner_download_button_wrapper";
        this.skinnerContainer.appendChild(this.btnWrapper);

        let config = this.cssCb(this.skin);
        let name = config.name;
        let name2 = config.name2;

        this.btnWrapper.appendChild(this.createBtn(name));
        if (name2) {
            this.btnWrapper.appendChild(this.createBtn(name2, 2));
        }
        let saveConfigBtn = document.createElement("button");
        saveConfigBtn.innerText = 'save config';
        saveConfigBtn.className = "nik_skinner_download_button nik_skinner_save_button";

        saveConfigBtn.addEventListener("click", () => {
            this.saveConfig();
        });

        this.btnWrapper.appendChild(saveConfigBtn);

    }

    async makeDownloadRequest(name, number) {
        let css;
        if (number) {
            css = this.cssCb(this.skin)['css' + number];
        } else {
            css = this.cssCb(this.skin).css;
        }

        var element = document.createElement('a');
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var fileNameSuffix = hours + "-" + minutes;
        element.setAttribute('href', 'data:text/css;charset=utf-8,' + encodeURIComponent(css));
        element.setAttribute('download', name + "_" + fileNameSuffix + '.css');
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    createCloseButton() {
        this.toolBox = document.querySelector(".skinner_toolbox");
        this.closeBtn = document.createElement("button");
        this.closeBtn.innerHTML = '<i class="nik-ico-arrow">▼</i>';
        this.closeBtn.setAttribute("class", "color_controls_toggle tg-ico-arrow");
        this.closeBtn.addEventListener("click", () => {
            if (this.toolBox.classList.contains("skinner_toolbox-hidden")) {
                this.toolBox.classList.remove("skinner_toolbox-hidden");
            } else {
                this.toolBox.classList.add("skinner_toolbox-hidden");
            }
        });
        this.toolBox.appendChild(this.closeBtn);
    }

    showOverlay() {
        const overlay = this.overlay;
        overlay.style.display = "block";
    }

    hideOverlay() {
        const overlay = this.overlay;
        overlay.style.display = "none";
    }

    createControl(
        label,
        parent,
        checkboxCallback,
        gradientCallback,
        gradientReverseCallback,
        pickerCallback,
        picker2Callback,
        isDarkCallback,
        isCustomTxtCb,
        customTxtCb,
        isCustomAccentCb,
        customAccentCb,
        isCustomBorderCb,
        customBorderCb,
        customRadiusCb,
        hideConfigArray
    ) {
        let t = this;
        let verbalData = this.verbalData(label);

        let _label = document.createElement("label");
        _label.className = "nik_skinner_control_group_label";
        let _sp = document.createElement("span");
        _sp.innerText = this.labelsMap[label] ? this.labelsMap[label] : label;
        _label.appendChild(_sp);

        let pickerMainColor = this.skin[label + "Bg"];
        let pickerGradientColor = this.skin[label + "Bg_g"];
        let pickerTextColor = this.skin[label + "Txt"];
        let pickerBorderColor = this.skin[verbalData.nameBorder];
        let pickerCustomAccentColor = this.skin[verbalData.nameAccent] ? this.skin[verbalData.nameAccent] : this.skin.accentBg;

        let wrapper = document.createElement("div");
        wrapper.className = "nik_skinner_control_group";

        wrapper.appendChild(_label);

        //main color

        let isEnabledControl, isEnabledChb, isEnabledPckrDiv, isEnabledPckr; {
            isEnabledPckrDiv = this.createDiv("nik_skinner_control_group_picker");
            isEnabledControl = this.createDiv("nik_skinner_checkbox_wrapper");
            let chb = this.createCheckBox(label);
            isEnabledChb = chb.checkbox;
            isEnabledChb.addEventListener("change", function (e) {
                checkboxCallback(e);
                t.modifyKey(verbalData.nameBg, t[verbalData.nameBg].picker._color.toHEXA().toString());
            });
            wrapper.appendChild(isEnabledControl);
            isEnabledControl.appendChild(chb.label);
            isEnabledControl.appendChild(isEnabledPckrDiv);
            isEnabledPckr = this.createPicker(isEnabledPckrDiv, pickerMainColor, pickerCallback);
        }

        let isDarkChb; {
            let chb = this.createCheckBox(label + "dark", true);
            isDarkChb = chb.checkbox;
            isDarkChb.addEventListener("change", isDarkCallback);
            isEnabledControl.appendChild(chb.label);
        }

        //gradient

        let isGradientEnabledControl, isGradientEnabledChb, isGradientEnabledPckrDiv, isGradientEnabledPckr; {
            isGradientEnabledPckrDiv = this.createDiv("nik_skinner_control_group_picker");
            isGradientEnabledControl = this.createDiv("nik_skinner_checkbox_wrapper");
            let chb = this.createCheckBox(label + "_g");
            isGradientEnabledChb = chb.checkbox;
            isGradientEnabledChb.addEventListener("change", gradientCallback);
            wrapper.appendChild(isGradientEnabledControl);
            isGradientEnabledControl.appendChild(chb.label);
            isGradientEnabledControl.appendChild(isGradientEnabledPckrDiv);
            isGradientEnabledPckr = this.createPicker(isGradientEnabledPckrDiv, pickerGradientColor, picker2Callback);
        }

        let isGradientReversedChb; {
            let chb = this.createCheckBox(label + "_invert", true);
            isGradientReversedChb = chb.checkbox;
            isGradientReversedChb.addEventListener("change", gradientReverseCallback);
            isGradientEnabledControl.appendChild(chb.label);
        }

        //custom text

        let isCustomTextControl, isCustomTextChb, isCustomTextPckrDiv, isCustomTextPckr; {
            isCustomTextPckrDiv = this.createDiv("nik_skinner_control_group_picker");
            isCustomTextControl = this.createDiv("nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small");
            let chb = this.createCheckBox(label + "_text");
            isCustomTextChb = chb.checkbox;
            isCustomTextChb.addEventListener("change", isCustomTxtCb);
            wrapper.appendChild(isCustomTextControl);
            isCustomTextControl.appendChild(chb.label);
            isCustomTextControl.appendChild(isCustomTextPckrDiv);
            isCustomTextPckr = this.createPicker(isCustomTextPckrDiv, pickerTextColor, customTxtCb);
        }

        parent.appendChild(wrapper);

        //custom accent

        let customAccentControl, customAccentChb, customAccentPckrDiv, customAccentPckr;
        if (isCustomAccentCb && customAccentCb) {
            customAccentPckrDiv = this.createDiv("nik_skinner_control_group_picker");
            customAccentControl = this.createDiv("nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small");
            let chb = this.createCheckBox(label + "_custom_accent");
            customAccentChb = chb.checkbox;
            customAccentChb.addEventListener("change", isCustomAccentCb);
            wrapper.appendChild(customAccentControl);
            customAccentControl.appendChild(chb.label);
            customAccentControl.appendChild(customAccentPckrDiv);
            customAccentPckr = this.createPicker(customAccentPckrDiv, pickerCustomAccentColor, customAccentCb);
        }

        //custom border

        let borderControl, borderChb, borderPckrDiv, borderPckr;
        if (isCustomBorderCb && customBorderCb) {
            borderPckrDiv = this.createDiv("nik_skinner_control_group_picker");
            borderControl = this.createDiv("nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-small");
            let chb = this.createCheckBox(label + "_border");
            borderChb = chb.checkbox;
            borderChb.addEventListener("change", isCustomBorderCb);
            wrapper.appendChild(borderControl);
            borderControl.appendChild(chb.label);
            borderControl.appendChild(borderPckrDiv);
            borderPckr = this.createPicker(borderPckrDiv, pickerBorderColor, customBorderCb);
        }

        //custom roundness

        let radiusControl, radiusInput, radiusAmount;
        if (customRadiusCb) {
            radiusControl = this.createDiv("nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-range");
            radiusInput = document.createElement("input");
            radiusInput.type = "range";
            radiusInput.min = 0;
            radiusInput.max = 100;
            radiusAmount = this.createDiv("nik_skinner_radius_amount");
            radiusInput.addEventListener("change", function (e) {
                customRadiusCb(e);
            });
            wrapper.appendChild(radiusControl);
            radiusControl.appendChild(radiusInput);
            radiusControl.appendChild(radiusAmount);
        }

        let _hideConfigArray = hideConfigArray || [];

        const configMap = {
            background: isEnabledControl,
            gradient: isGradientEnabledControl,
            text: isCustomTextControl,
            accent: customAccentControl,
            border: borderControl,
            radius: radiusControl
        };

        _hideConfigArray.forEach(config => {
            const el = configMap[config];
            if (!el) return console.warn(config + ' not found in map');
            el.classList.add('nik-hidden');
        });

        return {
            picker: isEnabledPckr,
            picker2: isGradientEnabledPckr,
            checkBox: isEnabledChb,
            checkBox2: isGradientEnabledChb,
            checkBoxRevertGradient: isGradientReversedChb,
            checkBoxIsDark: isDarkChb,
            checkBox3: isCustomTextChb,
            picker3: isCustomTextPckr,
            customAccentChb: customAccentChb,
            customAccentPckr: customAccentPckr,
            borderChb: borderChb,
            borderPckr: borderPckr,
            radiusInput: radiusInput,
            radiusAmount: radiusAmount
        };
    }

    createDiv(className) {
        let div = document.createElement("div");
        div.className = className;

        return div;
    }

    createCheckBox(id, type) {
        let _id = id;
        let _type = type || false;

        let label, icon, checkbox;
        label = document.createElement("label");
        label.className = "skinner_custom_chb_label ";
        label.htmlFor = _id;
        icon = document.createElement("i");
        icon.className = "skinner_custom_chb " + (_type ? "skinner_custom_chb-right" : "");
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = _id;

        label.appendChild(checkbox);
        label.appendChild(icon);

        return {
            label: label,
            checkbox: checkbox
        };
    }

    createPicker(el, defaultColor, callback) {
        let picker = Pickr.create({
            el: el,
            theme: "classic",
            comparison: false,
            default: defaultColor,
            components: {
                preview: false,
                hue: true,
                interaction: {
                    input: true,
                    save: false
                }
            }
        });

        picker.on("change", (color) => {
            callback(color);
        });
        picker.on("show", this.showOverlay);
        picker.on("hide", this.hideOverlay);

        return picker;
    }
}


export default Skinner