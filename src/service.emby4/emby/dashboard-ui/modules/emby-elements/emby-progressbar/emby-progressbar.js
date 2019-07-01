define(["css!./emby-progressbar"],function(){"use strict";function onAutoTimeProgress(){var start=parseInt(this.getAttribute("data-starttime")),end=parseInt(this.getAttribute("data-endtime")),now=(new Date).getTime(),total=end-start,pct=(now-start)/total*100;pct=Math.min(100,pct),pct=Math.max(0,pct),this.querySelector(".itemProgressBarForeground").style.width=pct+"%"}function onInit(){var elem=this;elem.hasInit||(elem.hasInit=!0)}function _connectedCallback(){this.timeInterval&&clearInterval(this.timeInterval),"time"===this.getAttribute("data-automode")&&(this.timeInterval=setInterval(onAutoTimeProgress.bind(this),6e4))}function _disconnectedCallback(){this.timeInterval&&(clearInterval(this.timeInterval),this.timeInterval=null)}if(window.customElements){var EmbyProgressBar=function(_HTMLDivElement){function EmbyProgressBar(){var _this;babelHelpers.classCallCheck(this,EmbyProgressBar);var self=_this=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(EmbyProgressBar).call(this));return onInit.call(self),babelHelpers.possibleConstructorReturn(_this,self)}return babelHelpers.inherits(EmbyProgressBar,_HTMLDivElement),babelHelpers.createClass(EmbyProgressBar,[{key:"connectedCallback",value:function(){onInit.call(this),_connectedCallback.call(this)}},{key:"disconnectedCallback",value:function(){_disconnectedCallback.call(this)}}]),EmbyProgressBar}(babelHelpers.wrapNativeSuper(HTMLDivElement));customElements.define("emby-progressbar",EmbyProgressBar,{extends:"div"})}else if(document.registerElement){var ProgressBarPrototype=Object.create(HTMLDivElement.prototype);ProgressBarPrototype.createdCallback=onInit,ProgressBarPrototype.attachedCallback=_connectedCallback,ProgressBarPrototype.detachedCallback=_disconnectedCallback,document.registerElement("emby-progressbar",{prototype:ProgressBarPrototype,extends:"div"})}});