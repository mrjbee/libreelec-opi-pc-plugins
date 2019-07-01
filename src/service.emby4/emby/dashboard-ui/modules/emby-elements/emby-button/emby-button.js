define(["browser","dom","layoutManager","shell","appRouter","apphost","css!./emby-button"],function(browser,dom,layoutManager,shell,appRouter,appHost){"use strict";function openPremiumInfo(){require(["registrationServices"],function(registrationServices){registrationServices.showPremiereInfo()})}function onAnchorClick(e){var href=this.getAttribute("href")||"";"#"!==href?this.getAttribute("target")?-1===href.indexOf("emby.media/premiere")||appHost.supports("externalpremium")?appHost.supports("targetblank")||(e.preventDefault(),shell.openUrl(href)):(e.preventDefault(),openPremiumInfo()):appRouter.handleAnchorClick(e):e.preventDefault()}function onInit(){var elem=this;elem.hasInit||(elem.hasInit=!0,this.classList.contains("emby-button")||(this.classList.add("emby-button"),layoutManager.tv&&("false"!==this.getAttribute("data-focusscale")&&this.classList.add("emby-button-focusscale"),this.classList.add("emby-button-tv"))))}function _connectedCallback(){"A"===this.tagName&&(dom.removeEventListener(this,"click",onAnchorClick,{}),dom.addEventListener(this,"click",onAnchorClick,{}),"true"===this.getAttribute("data-autohide")&&(appHost.supports("externallinks")?this.classList.remove("hide"):this.classList.add("hide")))}function _disconnectedCallback(){dom.removeEventListener(this,"click",onAnchorClick,{})}if(window.customElements){var EmbyButton=function(_HTMLButtonElement){function EmbyButton(){var _this;babelHelpers.classCallCheck(this,EmbyButton);var self=_this=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(EmbyButton).call(this));return onInit.call(self),babelHelpers.possibleConstructorReturn(_this,self)}return babelHelpers.inherits(EmbyButton,_HTMLButtonElement),babelHelpers.createClass(EmbyButton,[{key:"connectedCallback",value:function(){onInit.call(this),_connectedCallback.call(this)}},{key:"disconnectedCallback",value:function(){_disconnectedCallback.call(this)}}]),EmbyButton}(babelHelpers.wrapNativeSuper(HTMLButtonElement));customElements.define("emby-button",EmbyButton,{extends:"button"});var EmbyAnchor=function(_HTMLAnchorElement){function EmbyAnchor(){var _this2;babelHelpers.classCallCheck(this,EmbyAnchor);var self=_this2=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(EmbyAnchor).call(this));return onInit.call(self),babelHelpers.possibleConstructorReturn(_this2,self)}return babelHelpers.inherits(EmbyAnchor,_HTMLAnchorElement),babelHelpers.createClass(EmbyAnchor,[{key:"connectedCallback",value:function(){onInit.call(this),_connectedCallback.call(this)}},{key:"disconnectedCallback",value:function(){_disconnectedCallback.call(this)}}]),EmbyAnchor}(babelHelpers.wrapNativeSuper(HTMLAnchorElement));return customElements.define("emby-linkbutton",EmbyAnchor,{extends:"a"}),EmbyButton}if(document.registerElement){var EmbyButtonPrototype=Object.create(HTMLButtonElement.prototype);EmbyButtonPrototype.createdCallback=onInit,EmbyButtonPrototype.attachedCallback=_connectedCallback,EmbyButtonPrototype.detachedCallback=_disconnectedCallback,document.registerElement("emby-button",{prototype:EmbyButtonPrototype,extends:"button"});var EmbyLinkButtonPrototype=Object.create(HTMLAnchorElement.prototype);return EmbyLinkButtonPrototype.createdCallback=onInit,EmbyLinkButtonPrototype.attachedCallback=_connectedCallback,EmbyLinkButtonPrototype.detachedCallback=_disconnectedCallback,document.registerElement("emby-linkbutton",{prototype:EmbyLinkButtonPrototype,extends:"a"}),EmbyButtonPrototype}});