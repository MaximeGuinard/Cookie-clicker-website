function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const MESSAGE = [
{
  text: "Pour commencer, cliquez sur la planète ! 🌍",
  pass_criteria: state => {return state.score > 0;} },

{
  text: "Continuez à cliquer et achetez votre première atout ! 🆙",
  pass_criteria: state => {return Object.values(state.upgrades).find(val => val.level);} },

{
  text: "Obtenez votre super planète ! 🍪",
  pass_criteria: state => false }];



const CONSTANTS = {
  CURRENCY: "Énergie",
  IMG_URL: {
    COOKIE:
    "https://raw.githubusercontent.com/JdyL/img-host/eb12be794f4871f010a76e82211fbdff4c8dea00/svg/space-clicker/cookie.svg",
    CURRENCY_ICON:
    "https://raw.githubusercontent.com/JdyL/img-host/028dac1b83c494af61ce617b44afe70d000f25ff/svg/space-clicker/energy.svg",
    STARS:
    "https://raw.githubusercontent.com/JdyL/img-host/25e95e7b28baed293f29217d803ed09b90fc96c1/svg/space-clicker/stars.svg" },

  COST_INCREMENTAL: 1.1 };


const DEFAULT_UPGRADES = {
  CLICK_MULTIPLIER: {
    displayName: "Clique",
    description: "Multiplier par clic",
    baseMultiplier: 1,
    level: 0,
    requiredUpgrades: false,
    cost: 10,
    hasInterval: false,
    costIncrement: CONSTANTS.COST_INCREMENTAL * 1.3 },

  AUTOCLICK: {
    displayName: "Auto-Click",
    description: "Clics automatiquement",
    baseMultiplier: 0,
    level: 0,
    requiredUpgrades: false,
    cost: 50,
    hasInterval: true,
    costIncrement: CONSTANTS.COST_INCREMENTAL },

  VOYAGER: {
    displayName: "Voyager",
    description: "Clique automatiquement plus",
    baseMultiplier: 0,
    level: 0,
    requiredUpgrades: false,
    cost: 250,
    hasInterval: true,
    costIncrement: CONSTANTS.COST_INCREMENTAL * 1.1 },

  ROVER: {
    displayName: "Vagabond",
    description: "Multipliez toutes les ressources",
    baseMultiplier: 0,
    level: 0,
    requiredUpgrades: false,
    cost: 1000,
    hasInterval: true,
    costIncrement: CONSTANTS.COST_INCREMENTAL * 1.1,
    isResourceMultiplier: true },

  DELIVERY: {
    displayName: "Livraison",
    description: "Multipliez toutes les ressources",
    baseMultiplier: 0,
    level: 0,
    requiredUpgrades: false,
    cost: 5000,
    hasInterval: true,
    costIncrement: CONSTANTS.COST_INCREMENTAL * 1.1,
    isResourceMultiplier: true },

  NEW_PLANET: {
    displayName: "Nouvelle Planète",
    description: "Double toutes les ressources à collecter",
    baseMultiplier: 0,
    level: 0,
    requiredUpgrades: false,
    cost: 1000000,
    hasInterval: true,
    costIncrement: CONSTANTS.COST_INCREMENTAL,
    unavailable: true,
    isResourceMultiplier: true } };



class Card extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "onUpdate",
















    () => {var _prevState$clickEffec;
      const { time } = this.state;
      const prevState = { ...this.state };

      const newState = { score: prevState.score + this.getRate(), time: prevState.time + 1 };
      // clear the dom components of click effects
      if (time % 10 === 0 && (_prevState$clickEffec = prevState.clickEffects) !== null && _prevState$clickEffec !== void 0 && _prevState$clickEffec.length) {
        newState.clickEffects = [];
      }
      this.setState(prevState => newState);
    });_defineProperty(this, "clickEffect",

    (value = 1) => {
      const milliseconds = Date.now();
      return /*#__PURE__*/(
        React.createElement("div", { key: milliseconds, className: "click-effect" }, "+",
        value, " ", CONSTANTS.CURRENCY));


    });_defineProperty(this, "incrementScore",

    (val = 1) =>
    this.setState(prevState => ({ score: prevState.score + val })));_defineProperty(this, "onCookieClick",

    () => {
      const { baseMultiplier } = this.state.upgrades.CLICK_MULTIPLIER;
      const newClickEffects = [this.clickEffect(baseMultiplier), ...this.state.clickEffects];
      this.setState(prevState => ({
        clickEffects: newClickEffects,
        score: prevState.score + baseMultiplier,
        clickCounter: prevState.clickCounter + 1 }));

    });_defineProperty(this, "cookie",

    () => {
      return /*#__PURE__*/(
        React.createElement("div", { className: "cookie", onClick: this.onCookieClick }, /*#__PURE__*/
        React.createElement("img", { src: CONSTANTS.IMG_URL.COOKIE })));


    });_defineProperty(this, "onUpgradeClick",

    type => {
      return this.setState(prevState => {
        const { baseMultiplier, level, cost, costIncrement, unavailable } = prevState.upgrades[type] || {};
        if (prevState.score < cost || unavailable) return false;
        return {
          score: prevState.score - cost,
          upgrades: {
            ...prevState.upgrades,
            [type]: {
              ...prevState.upgrades[type],
              baseMultiplier: baseMultiplier + 1,
              level: level + 1,
              cost: Math.floor(cost * costIncrement) } } };



      });
    });_defineProperty(this, "getRate",

    () => {
      let multiplier = 1;
      const base = Object.values(this.state.upgrades).reduce((acc, value) => {
        if (value.hasInterval && !value.isResourceMultiplier) {
          acc += value.baseMultiplier;
        }
        if (value.isResourceMultiplier) multiplier += value.baseMultiplier;
        return acc;
      }, 0);
      return base * multiplier;
    });_defineProperty(this, "cantAfford",

    cost => {
      return this.state.score < cost;
    });this.state = { score: 0, upgrades: { ...DEFAULT_UPGRADES }, time: 0, clickEffects: [], clickCounter: 0 };this.onCookieClick = this.onCookieClick.bind(this);}componentDidMount() {setInterval(this.onUpdate, 1000);}

  render() {var _MESSAGE$find;
    return /*#__PURE__*/(
      React.createElement("div", { className: "game-window" }, /*#__PURE__*/
      React.createElement("div", { className: "top-bar" }, /*#__PURE__*/
      React.createElement("span", null, CONSTANTS.CURRENCY, ": ", this.state.score, " "), /*#__PURE__*/
      React.createElement("span", { className: "game-message" }, ((_MESSAGE$find = MESSAGE.find(val => !val.pass_criteria(this.state))) === null || _MESSAGE$find === void 0 ? void 0 : _MESSAGE$find.text) || '')), /*#__PURE__*/

      React.createElement("div", { className: "game-screen" }, /*#__PURE__*/
      React.createElement("div", { className: "cookie-container" },
      this.cookie(), /*#__PURE__*/
      React.createElement("div", { className: "click-effect-container" },
      this.state.clickEffects.map(val => val))), /*#__PURE__*/


      React.createElement("div", { className: "upgrades" }, /*#__PURE__*/
      React.createElement("div", { className: "info" }, "Auto-rate: ",
      this.getRate(), " ", CONSTANTS.CURRENCY, "/sec"), /*#__PURE__*/


      React.createElement("div", { className: "upgrade-list " },
      Object.entries(this.state.upgrades).map(([key, value]) => {
        return /*#__PURE__*/(
          React.createElement("div", { className: `upgrade ${this.state.score < value.cost ? "-disabled" : ''}`, onClick: () => this.onUpgradeClick(key) }, /*#__PURE__*/
          React.createElement("div", { className: "upgrade-img" }), /*#__PURE__*/
          React.createElement("div", { className: "upgrade-info" }, /*#__PURE__*/
          React.createElement("h2", null, value.displayName), /*#__PURE__*/
          React.createElement("ul", null, /*#__PURE__*/
          React.createElement("li", null, "Lv. ",
          value.level), /*#__PURE__*/

          React.createElement("li", { className: `cost ${this.cantAfford(value.cost) ? '-disabled' : ''}` }, value.cost)))));



      }))), /*#__PURE__*/


      React.createElement("div", { className: "stars" }, /*#__PURE__*/
      React.createElement("img", { src: CONSTANTS.IMG_URL.STARS })))));




  }}


const el = document.querySelector("#root");
ReactDOM.render( /*#__PURE__*/React.createElement(Card, { title: "Cookie Clicker" }), el);