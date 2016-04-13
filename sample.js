/* global define */

/* ================================================
 * Make use of Bootstrap's modal more monkey-friendly.
 *
 * For Bootstrap 3.
 *
 * javanoob@hotmail.com
 *
 * https://github.com/nakupanda/bootstrap3-dialog
 *
 * Licensed under The MIT License.
 * ================================================ */
!function(t,e){"use strict";if("undefined"!=typeof module&&module.exports){var n="undefined"!=typeof process,o=n&&"electron"in process.versions;o?t.BootstrapDialog=e(t.jQuery):module.exports=e(require("jquery"),require("bootstrap"))}else"function"==typeof define&&define.amd?define("bootstrap-dialog",["jquery","bootstrap"],function(t){return e(t)}):t.BootstrapDialog=e(t.jQuery)}(this,function(t){"use strict";var e=t.fn.modal.Constructor,n=function(t,n){e.call(this,t,n)};n.getModalVersion=function(){var e=null;return e="undefined"==typeof t.fn.modal.Constructor.VERSION?"v3.1":/3\.2\.\d+/.test(t.fn.modal.Constructor.VERSION)?"v3.2":/3\.3\.[1,2]/.test(t.fn.modal.Constructor.VERSION)?"v3.3":"v3.3.4"},n.ORIGINAL_BODY_PADDING=parseInt(t("body").css("padding-right")||0,10),n.METHODS_TO_OVERRIDE={},n.METHODS_TO_OVERRIDE["v3.1"]={},n.METHODS_TO_OVERRIDE["v3.2"]={hide:function(e){if(e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()){this.isShown=!1;var n=this.getGlobalOpenedDialogs();0===n.length&&this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()}}},n.METHODS_TO_OVERRIDE["v3.3"]={setScrollbar:function(){var t=n.ORIGINAL_BODY_PADDING;this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},resetScrollbar:function(){var t=this.getGlobalOpenedDialogs();0===t.length&&this.$body.css("padding-right",n.ORIGINAL_BODY_PADDING)},hideModal:function(){this.$element.hide(),this.backdrop(t.proxy(function(){var t=this.getGlobalOpenedDialogs();0===t.length&&this.$body.removeClass("modal-open"),this.resetAdjustments(),this.resetScrollbar(),this.$element.trigger("hidden.bs.modal")},this))}},n.METHODS_TO_OVERRIDE["v3.3.4"]=t.extend({},n.METHODS_TO_OVERRIDE["v3.3"]),n.prototype={constructor:n,getGlobalOpenedDialogs:function(){var e=[];return t.each(o.dialogs,function(t,n){n.isRealized()&&n.isOpened()&&e.push(n)}),e}},n.prototype=t.extend(n.prototype,e.prototype,n.METHODS_TO_OVERRIDE[n.getModalVersion()]);var o=function(e){this.defaultOptions=t.extend(!0,{id:o.newGuid(),buttons:[],data:{},onshow:null,onshown:null,onhide:null,onhidden:null},o.defaultOptions),this.indexedButtons={},this.registeredButtonHotkeys={},this.draggableData={isMouseDown:!1,mouseOffset:{}},this.realized=!1,this.opened=!1,this.initOptions(e),this.holdThisInstance()};return o.BootstrapDialogModal=n,o.NAMESPACE="bootstrap-dialog",o.TYPE_DEFAULT="type-default",o.TYPE_INFO="type-info",o.TYPE_PRIMARY="type-primary",o.TYPE_SUCCESS="type-success",o.TYPE_WARNING="type-warning",o.TYPE_DANGER="type-danger",o.DEFAULT_TEXTS={},o.DEFAULT_TEXTS[o.TYPE_DEFAULT]="Information",o.DEFAULT_TEXTS[o.TYPE_INFO]="Information",o.DEFAULT_TEXTS[o.TYPE_PRIMARY]="Information",o.DEFAULT_TEXTS[o.TYPE_SUCCESS]="Success",o.DEFAULT_TEXTS[o.TYPE_WARNING]="Warning",o.DEFAULT_TEXTS[o.TYPE_DANGER]="Danger",o.DEFAULT_TEXTS.OK="OK",o.DEFAULT_TEXTS.CANCEL="Cancel",o.DEFAULT_TEXTS.CONFIRM="Confirmation",o.SIZE_NORMAL="size-normal",o.SIZE_SMALL="size-small",o.SIZE_WIDE="size-wide",o.SIZE_LARGE="size-large",o.BUTTON_SIZES={},o.BUTTON_SIZES[o.SIZE_NORMAL]="",o.BUTTON_SIZES[o.SIZE_SMALL]="",o.BUTTON_SIZES[o.SIZE_WIDE]="",o.BUTTON_SIZES[o.SIZE_LARGE]="btn-lg",o.ICON_SPINNER="glyphicon glyphicon-asterisk",o.defaultOptions={type:o.TYPE_PRIMARY,size:o.SIZE_NORMAL,cssClass:"",title:null,message:null,nl2br:!0,closable:!0,closeByBackdrop:!0,closeByKeyboard:!0,closeIcon:"&#215;",spinicon:o.ICON_SPINNER,autodestroy:!0,draggable:!1,animate:!0,description:"",tabindex:-1},o.configDefaultOptions=function(e){o.defaultOptions=t.extend(!0,o.defaultOptions,e)},o.dialogs={},o.openAll=function(){t.each(o.dialogs,function(t,e){e.open()})},o.closeAll=function(){t.each(o.dialogs,function(t,e){e.close()})},o.getDialog=function(t){var e=null;return"undefined"!=typeof o.dialogs[t]&&(e=o.dialogs[t]),e},o.setDialog=function(t){return o.dialogs[t.getId()]=t,t},o.addDialog=function(t){return o.setDialog(t)},o.moveFocus=function(){var e=null;t.each(o.dialogs,function(t,n){n.isRealized()&&n.isOpened()&&(e=n)}),null!==e&&e.getModal().focus()},o.METHODS_TO_OVERRIDE={},o.METHODS_TO_OVERRIDE["v3.1"]={handleModalBackdropEvent:function(){return this.getModal().on("click",{dialog:this},function(t){t.target===this&&t.data.dialog.isClosable()&&t.data.dialog.canCloseByBackdrop()&&t.data.dialog.close()}),this},updateZIndex:function(){if(this.isOpened()){var e=1040,n=1050,i=0;t.each(o.dialogs,function(t,e){e.isRealized()&&e.isOpened()&&i++});var s=this.getModal(),a=s.data("bs.modal").$backdrop;s.css("z-index",n+20*(i-1)),a.css("z-index",e+20*(i-1))}return this},open:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("show"),this.updateZIndex(),this}},o.METHODS_TO_OVERRIDE["v3.2"]={handleModalBackdropEvent:o.METHODS_TO_OVERRIDE["v3.1"].handleModalBackdropEvent,updateZIndex:o.METHODS_TO_OVERRIDE["v3.1"].updateZIndex,open:o.METHODS_TO_OVERRIDE["v3.1"].open},o.METHODS_TO_OVERRIDE["v3.3"]={},o.METHODS_TO_OVERRIDE["v3.3.4"]=t.extend({},o.METHODS_TO_OVERRIDE["v3.1"]),o.prototype={constructor:o,initOptions:function(e){return this.options=t.extend(!0,this.defaultOptions,e),this},holdThisInstance:function(){return o.addDialog(this),this},initModalStuff:function(){return this.setModal(this.createModal()).setModalDialog(this.createModalDialog()).setModalContent(this.createModalContent()).setModalHeader(this.createModalHeader()).setModalBody(this.createModalBody()).setModalFooter(this.createModalFooter()),this.getModal().append(this.getModalDialog()),this.getModalDialog().append(this.getModalContent()),this.getModalContent().append(this.getModalHeader()).append(this.getModalBody()).append(this.getModalFooter()),this},createModal:function(){var e=t('<div class="modal" role="dialog" aria-hidden="true"></div>');return e.prop("id",this.getId()),e.attr("aria-labelledby",this.getId()+"_title"),e},getModal:function(){return this.$modal},setModal:function(t){return this.$modal=t,this},createModalDialog:function(){return t('<div class="modal-dialog"></div>')},getModalDialog:function(){return this.$modalDialog},setModalDialog:function(t){return this.$modalDialog=t,this},createModalContent:function(){return t('<div class="modal-content"></div>')},getModalContent:function(){return this.$modalContent},setModalContent:function(t){return this.$modalContent=t,this},createModalHeader:function(){return t('<div class="modal-header"></div>')},getModalHeader:function(){return this.$modalHeader},setModalHeader:function(t){return this.$modalHeader=t,this},createModalBody:function(){return t('<div class="modal-body"></div>')},getModalBody:function(){return this.$modalBody},setModalBody:function(t){return this.$modalBody=t,this},createModalFooter:function(){return t('<div class="modal-footer"></div>')},getModalFooter:function(){return this.$modalFooter},setModalFooter:function(t){return this.$modalFooter=t,this},createDynamicContent:function(t){var e=null;return e="function"==typeof t?t.call(t,this):t,"string"==typeof e&&(e=this.formatStringContent(e)),e},formatStringContent:function(t){return this.options.nl2br?t.replace(/\r\n/g,"<br />").replace(/[\r\n]/g,"<br />"):t},setData:function(t,e){return this.options.data[t]=e,this},getData:function(t){return this.options.data[t]},setId:function(t){return this.options.id=t,this},getId:function(){return this.options.id},getType:function(){return this.options.type},setType:function(t){return this.options.type=t,this.updateType(),this},updateType:function(){if(this.isRealized()){var t=[o.TYPE_DEFAULT,o.TYPE_INFO,o.TYPE_PRIMARY,o.TYPE_SUCCESS,o.TYPE_WARNING,o.TYPE_DANGER];this.getModal().removeClass(t.join(" ")).addClass(this.getType())}return this},getSize:function(){return this.options.size},setSize:function(t){return this.options.size=t,this.updateSize(),this},updateSize:function(){if(this.isRealized()){var e=this;this.getModal().removeClass(o.SIZE_NORMAL).removeClass(o.SIZE_SMALL).removeClass(o.SIZE_WIDE).removeClass(o.SIZE_LARGE),this.getModal().addClass(this.getSize()),this.getModalDialog().removeClass("modal-sm"),this.getSize()===o.SIZE_SMALL&&this.getModalDialog().addClass("modal-sm"),this.getModalDialog().removeClass("modal-lg"),this.getSize()===o.SIZE_WIDE&&this.getModalDialog().addClass("modal-lg"),t.each(this.options.buttons,function(n,o){var i=e.getButton(o.id),s=["btn-lg","btn-sm","btn-xs"],a=!1;if("string"==typeof o.cssClass){var d=o.cssClass.split(" ");t.each(d,function(e,n){-1!==t.inArray(n,s)&&(a=!0)})}a||(i.removeClass(s.join(" ")),i.addClass(e.getButtonSize()))})}return this},getCssClass:function(){return this.options.cssClass},setCssClass:function(t){return this.options.cssClass=t,this},getTitle:function(){return this.options.title},setTitle:function(t){return this.options.title=t,this.updateTitle(),this},updateTitle:function(){if(this.isRealized()){var t=null!==this.getTitle()?this.createDynamicContent(this.getTitle()):this.getDefaultText();this.getModalHeader().find("."+this.getNamespace("title")).html("").append(t).prop("id",this.getId()+"_title")}return this},getMessage:function(){return this.options.message},setMessage:function(t){return this.options.message=t,this.updateMessage(),this},updateMessage:function(){if(this.isRealized()){var t=this.createDynamicContent(this.getMessage());this.getModalBody().find("."+this.getNamespace("message")).html("").append(t)}return this},isClosable:function(){return this.options.closable},setClosable:function(t){return this.options.closable=t,this.updateClosable(),this},setCloseByBackdrop:function(t){return this.options.closeByBackdrop=t,this},canCloseByBackdrop:function(){return this.options.closeByBackdrop},setCloseByKeyboard:function(t){return this.options.closeByKeyboard=t,this},canCloseByKeyboard:function(){return this.options.closeByKeyboard},isAnimate:function(){return this.options.animate},setAnimate:function(t){return this.options.animate=t,this},updateAnimate:function(){return this.isRealized()&&this.getModal().toggleClass("fade",this.isAnimate()),this},getSpinicon:function(){return this.options.spinicon},setSpinicon:function(t){return this.options.spinicon=t,this},addButton:function(t){return this.options.buttons.push(t),this},addButtons:function(e){var n=this;return t.each(e,function(t,e){n.addButton(e)}),this},getButtons:function(){return this.options.buttons},setButtons:function(t){return this.options.buttons=t,this.updateButtons(),this},getButton:function(t){return"undefined"!=typeof this.indexedButtons[t]?this.indexedButtons[t]:null},getButtonSize:function(){return"undefined"!=typeof o.BUTTON_SIZES[this.getSize()]?o.BUTTON_SIZES[this.getSize()]:""},updateButtons:function(){return this.isRealized()&&(0===this.getButtons().length?this.getModalFooter().hide():this.getModalFooter().show().find("."+this.getNamespace("footer")).html("").append(this.createFooterButtons())),this},isAutodestroy:function(){return this.options.autodestroy},setAutodestroy:function(t){this.options.autodestroy=t},getDescription:function(){return this.options.description},setDescription:function(t){return this.options.description=t,this},setTabindex:function(t){return this.options.tabindex=t,this},getTabindex:function(){return this.options.tabindex},updateTabindex:function(){return this.isRealized()&&this.getModal().attr("tabindex",this.getTabindex()),this},getDefaultText:function(){return o.DEFAULT_TEXTS[this.getType()]},getNamespace:function(t){return o.NAMESPACE+"-"+t},createHeaderContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("header")),e.append(this.createTitleContent()),e.prepend(this.createCloseButton()),e},createTitleContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("title")),e},createCloseButton:function(){var e=t("<div></div>");e.addClass(this.getNamespace("close-button"));var n=t('<button class="close"></button>');return n.append(this.options.closeIcon),e.append(n),e.on("click",{dialog:this},function(t){t.data.dialog.close()}),e},createBodyContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("body")),e.append(this.createMessageContent()),e},createMessageContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("message")),e},createFooterContent:function(){var e=t("<div></div>");return e.addClass(this.getNamespace("footer")),e},createFooterButtons:function(){var e=this,n=t("<div></div>");return n.addClass(this.getNamespace("footer-buttons")),this.indexedButtons={},t.each(this.options.buttons,function(t,i){i.id||(i.id=o.newGuid());var s=e.createButton(i);e.indexedButtons[i.id]=s,n.append(s)}),n},createButton:function(e){var n=t('<button class="btn"></button>');return n.prop("id",e.id),n.data("button",e),"undefined"!=typeof e.icon&&""!==t.trim(e.icon)&&n.append(this.createButtonIcon(e.icon)),"undefined"!=typeof e.label&&n.append(e.label),n.addClass("undefined"!=typeof e.cssClass&&""!==t.trim(e.cssClass)?e.cssClass:"btn-default"),"undefined"!=typeof e.hotkey&&(this.registeredButtonHotkeys[e.hotkey]=n),n.on("click",{dialog:this,$button:n,button:e},function(t){var e=t.data.dialog,n=t.data.$button,o=n.data("button");return o.autospin&&n.toggleSpin(!0),"function"==typeof o.action?o.action.call(n,e,t):void 0}),this.enhanceButton(n),"undefined"!=typeof e.enabled&&n.toggleEnable(e.enabled),n},enhanceButton:function(t){return t.dialog=this,t.toggleEnable=function(t){var e=this;return"undefined"!=typeof t?e.prop("disabled",!t).toggleClass("disabled",!t):e.prop("disabled",!e.prop("disabled")),e},t.enable=function(){var t=this;return t.toggleEnable(!0),t},t.disable=function(){var t=this;return t.toggleEnable(!1),t},t.toggleSpin=function(e){var n=this,o=n.dialog,i=n.find("."+o.getNamespace("button-icon"));return"undefined"==typeof e&&(e=!(t.find(".icon-spin").length>0)),e?(i.hide(),t.prepend(o.createButtonIcon(o.getSpinicon()).addClass("icon-spin"))):(i.show(),t.find(".icon-spin").remove()),n},t.spin=function(){var t=this;return t.toggleSpin(!0),t},t.stopSpin=function(){var t=this;return t.toggleSpin(!1),t},this},createButtonIcon:function(e){var n=t("<span></span>");return n.addClass(this.getNamespace("button-icon")).addClass(e),n},enableButtons:function(e){return t.each(this.indexedButtons,function(t,n){n.toggleEnable(e)}),this},updateClosable:function(){return this.isRealized()&&this.getModalHeader().find("."+this.getNamespace("close-button")).toggle(this.isClosable()),this},onShow:function(t){return this.options.onshow=t,this},onShown:function(t){return this.options.onshown=t,this},onHide:function(t){return this.options.onhide=t,this},onHidden:function(t){return this.options.onhidden=t,this},isRealized:function(){return this.realized},setRealized:function(t){return this.realized=t,this},isOpened:function(){return this.opened},setOpened:function(t){return this.opened=t,this},handleModalEvents:function(){return this.getModal().on("show.bs.modal",{dialog:this},function(t){var e=t.data.dialog;if(e.setOpened(!0),e.isModalEvent(t)&&"function"==typeof e.options.onshow){var n=e.options.onshow(e);return n===!1&&e.setOpened(!1),n}}),this.getModal().on("shown.bs.modal",{dialog:this},function(t){var e=t.data.dialog;e.isModalEvent(t)&&"function"==typeof e.options.onshown&&e.options.onshown(e)}),this.getModal().on("hide.bs.modal",{dialog:this},function(t){var e=t.data.dialog;if(e.setOpened(!1),e.isModalEvent(t)&&"function"==typeof e.options.onhide){var n=e.options.onhide(e);return n===!1&&e.setOpened(!0),n}}),this.getModal().on("hidden.bs.modal",{dialog:this},function(e){var n=e.data.dialog;n.isModalEvent(e)&&"function"==typeof n.options.onhidden&&n.options.onhidden(n),n.isAutodestroy()&&(n.setRealized(!1),delete o.dialogs[n.getId()],t(this).remove()),o.moveFocus()}),this.handleModalBackdropEvent(),this.getModal().on("keyup",{dialog:this},function(t){27===t.which&&t.data.dialog.isClosable()&&t.data.dialog.canCloseByKeyboard()&&t.data.dialog.close()}),this.getModal().on("keyup",{dialog:this},function(e){var n=e.data.dialog;if("undefined"!=typeof n.registeredButtonHotkeys[e.which]){var o=t(n.registeredButtonHotkeys[e.which]);!o.prop("disabled")&&o.focus().trigger("click")}}),this},handleModalBackdropEvent:function(){return this.getModal().on("click",{dialog:this},function(e){t(e.target).hasClass("modal-backdrop")&&e.data.dialog.isClosable()&&e.data.dialog.canCloseByBackdrop()&&e.data.dialog.close()}),this},isModalEvent:function(t){return"undefined"!=typeof t.namespace&&"bs.modal"===t.namespace},makeModalDraggable:function(){return this.options.draggable&&(this.getModalHeader().addClass(this.getNamespace("draggable")).on("mousedown",{dialog:this},function(t){var e=t.data.dialog;e.draggableData.isMouseDown=!0;var n=e.getModalDialog().offset();e.draggableData.mouseOffset={top:t.clientY-n.top,left:t.clientX-n.left}}),this.getModal().on("mouseup mouseleave",{dialog:this},function(t){t.data.dialog.draggableData.isMouseDown=!1}),t("body").on("mousemove",{dialog:this},function(t){var e=t.data.dialog;e.draggableData.isMouseDown&&e.getModalDialog().offset({top:t.clientY-e.draggableData.mouseOffset.top,left:t.clientX-e.draggableData.mouseOffset.left})})),this},realize:function(){return this.initModalStuff(),this.getModal().addClass(o.NAMESPACE).addClass(this.getCssClass()),this.updateSize(),this.getDescription()&&this.getModal().attr("aria-describedby",this.getDescription()),this.getModalFooter().append(this.createFooterContent()),this.getModalHeader().append(this.createHeaderContent()),this.getModalBody().append(this.createBodyContent()),this.getModal().data("bs.modal",new n(this.getModal(),{backdrop:"static",keyboard:!1,show:!1})),this.makeModalDraggable(),this.handleModalEvents(),this.setRealized(!0),this.updateButtons(),this.updateType(),this.updateTitle(),this.updateMessage(),this.updateClosable(),this.updateAnimate(),this.updateSize(),this.updateTabindex(),this},open:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("show"),this},close:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("hide"),this}},o.prototype=t.extend(o.prototype,o.METHODS_TO_OVERRIDE[n.getModalVersion()]),o.newGuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0,n="x"===t?e:3&e|8;return n.toString(16)})},o.show=function(t){return new o(t).open()},o.alert=function(){var e={},n={type:o.TYPE_PRIMARY,title:null,message:null,closable:!1,draggable:!1,buttonLabel:o.DEFAULT_TEXTS.OK,callback:null};e="object"==typeof arguments[0]&&arguments[0].constructor==={}.constructor?t.extend(!0,n,arguments[0]):t.extend(!0,n,{message:arguments[0],callback:"undefined"!=typeof arguments[1]?arguments[1]:null});var i=new o(e);return i.setData("callback",e.callback),i.addButton({label:e.buttonLabel,action:function(t){return"function"==typeof t.getData("callback")&&t.getData("callback").call(this,!0)===!1?!1:(t.setData("btnClicked",!0),t.close())}}),i.onHide("function"==typeof i.options.onhide?function(t){var e=!0;return!t.getData("btnClicked")&&t.isClosable()&&"function"==typeof t.getData("callback")&&(e=t.getData("callback")(!1)),e===!1?!1:e=this.onhide(t)}.bind({onhide:i.options.onhide}):function(t){var e=!0;return!t.getData("btnClicked")&&t.isClosable()&&"function"==typeof t.getData("callback")&&(e=t.getData("callback")(!1)),e}),i.open()},o.confirm=function(){var e={},n={type:o.TYPE_PRIMARY,title:null,message:null,closable:!1,draggable:!1,btnCancelLabel:o.DEFAULT_TEXTS.CANCEL,btnCancelClass:null,btnOKLabel:o.DEFAULT_TEXTS.OK,btnOKClass:null,callback:null};e="object"==typeof arguments[0]&&arguments[0].constructor==={}.constructor?t.extend(!0,n,arguments[0]):t.extend(!0,n,{message:arguments[0],callback:"undefined"!=typeof arguments[1]?arguments[1]:null}),null===e.btnOKClass&&(e.btnOKClass=["btn",e.type.split("-")[1]].join("-"));var i=new o(e);return i.setData("callback",e.callback),i.addButton({label:e.btnCancelLabel,cssClass:e.btnCancelClass,action:function(t){return"function"==typeof t.getData("callback")&&t.getData("callback").call(this,!1)===!1?!1:t.close()}}),i.addButton({label:e.btnOKLabel,cssClass:e.btnOKClass,action:function(t){return"function"==typeof t.getData("callback")&&t.getData("callback").call(this,!0)===!1?!1:t.close()}}),i.open()},o.warning=function(t,e){return new o({type:o.TYPE_WARNING,message:t}).open()},o.danger=function(t,e){return new o({type:o.TYPE_DANGER,message:t}).open()},o.success=function(t,e){return new o({type:o.TYPE_SUCCESS,message:t}).open()},o});

/*
Copyright (C) 2011 Patrick Gillespie, http://patorjk.com/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
	Extendible BBCode Parser v1.0.0
	By Patrick Gillespie (patorjk@gmail.com)
	Website: http://patorjk.com/

	This module allows you to parse BBCode and to extend to the mark-up language
	to add in your own tags.
*/



var XBBCODE = (function() {

	// -----------------------------------------------------------------------------
	// Set up private variables
	// -----------------------------------------------------------------------------

	var me = {},
		urlPattern = /^(?:https?|file|c):(?:\/{1,3}|\\{1})[-a-zA-Z0-9:;@#%&()~_?\+=\/\\\.]*$/,
		colorNamePattern = /^(?:aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/,
		colorCodePattern = /^#?[a-fA-F0-9]{6}$/,
		emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/,
		fontFacePattern = /^([a-z][a-z0-9_]+|"[a-z][a-z0-9_\s]+")$/i,
		tags,
		tagList,
		tagsNoParseList = [],
		bbRegExp,
		pbbRegExp,
		pbbRegExp2,
		openTags,
		closeTags;

	/* -----------------------------------------------------------------------------
	 * tags
	 * This object contains a list of tags that your code will be able to understand.
	 * Each tag object has the following properties:
	 *
	 *   openTag - A function that takes in the tag's parameters (if any) and its
	 *             contents, and returns what its HTML open tag should be.
	 *             Example: [color=red]test[/color] would take in "=red" as a
	 *             parameter input, and "test" as a content input.
	 *             It should be noted that any BBCode inside of "content" will have
	 *             been processed by the time it enter the openTag function.
	 *
	 *   closeTag - A function that takes in the tag's parameters (if any) and its
	 *              contents, and returns what its HTML close tag should be.
	 *
	 *   displayContent - Defaults to true. If false, the content for the tag will
	 *                    not be displayed. This is useful for tags like IMG where
	 *                    its contents are actually a parameter input.
	 *
	 *   restrictChildrenTo - A list of BBCode tags which are allowed to be nested
	 *                        within this BBCode tag. If this property is omitted,
	 *                        any BBCode tag may be nested within the tag.
	 *
	 *   restrictParentsTo - A list of BBCode tags which are allowed to be parents of
	 *                       this BBCode tag. If this property is omitted, any BBCode
	 *                       tag may be a parent of the tag.
	 *
	 *   noParse - true or false. If true, none of the content WITHIN this tag will be
	 *             parsed by the XBBCode parser.
	 *
	 *
	 *
	 * LIMITIONS on adding NEW TAGS:
	 *  - Tag names should be alphanumeric (including underscores) and all tags should have an opening tag
	 *    and a closing tag.
	 *    The [*] tag is an exception because it was already a standard
	 *    bbcode tag. Technecially tags don't *have* to be alphanumeric, but since
	 *    regular expressions are used to parse the text, if you use a non-alphanumeric
	 *    tag names, just make sure the tag name gets escaped properly (if needed).
	 * --------------------------------------------------------------------------- */

	tags = {
		"b": {
			openTag: function(params,content) {
				return '<span class="xbbcode-b">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},
		/*
			This tag does nothing and is here mostly to be used as a classification for
			the bbcode input when evaluating parent-child tag relationships
		*/
		"bbcode": {
			openTag: function(params,content) {
				return '';
			},
			closeTag: function(params,content) {
				return '';
			}
		},
		"center": {
			openTag: function(params,content) {
				return '<span class="xbbcode-center">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},

		"code": {
			openTag: function(params,content) {
				return '<span class="xbbcode-code">';
			},
			closeTag: function(params,content) {
				return '</span>';
			},
			noParse: true
		},
		"color": {
			openTag: function(params,content) {

				var colorCode = (params.substr(1)).toLowerCase() || "black";
				colorNamePattern.lastIndex = 0;
				colorCodePattern.lastIndex = 0;
				if ( !colorNamePattern.test( colorCode ) ) {
					if ( !colorCodePattern.test( colorCode ) ) {
						colorCode = "black";
					} else {
						if (colorCode.substr(0,1) !== "#") {
							colorCode = "#" + colorCode;
						}
					}
				}

				return '<span style="color:' + colorCode + '">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},
		"email": {
			openTag: function(params,content) {

				var myEmail;

				if (!params) {
					myEmail = content.replace(/<.*?>/g,"");
				} else {
					myEmail = params.substr(1);
				}

				emailPattern.lastIndex = 0;
				if ( !emailPattern.test( myEmail ) ) {
					return '<a>';
				}

				return '<a href="mailto:' + myEmail + '">';
			},
			closeTag: function(params,content) {
				return '</a>';
			}
		},
		"face": {
			openTag: function(params,content) {

				var faceCode = params.substr(1) || "inherit";
				fontFacePattern.lastIndex = 0;
				if ( !fontFacePattern.test( faceCode ) ) {
						faceCode = "inherit";
				}
				return '<span style="font-family:' + faceCode + '">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},


		"font": {
			openTag: function(params,content) {

				var faceCode = params.substr(1) || "inherit";
				fontFacePattern.lastIndex = 0;
				if ( !fontFacePattern.test( faceCode ) ) {
						faceCode = "inherit";
				}
				return '<span style="font-family:' + faceCode + '">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},

		"i": {
			openTag: function(params,content) {
				return '<span class="xbbcode-i">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},
		"img": {
			openTag: function(params,content) {

				var myUrl = content;

				urlPattern.lastIndex = 0;
				if ( !urlPattern.test( myUrl ) ) {
					myUrl = "";
				}

				return '<img src="' + myUrl + '" />';
			},
			closeTag: function(params,content) {
				return '';
			},
			displayContent: false
		},
		"justify": {
			openTag: function(params,content) {
				return '<span class="xbbcode-justify">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},
		"large": {
			openTag: function(params,content) {
				var params = params || '';
				var colorCode = params.substr(1) || "inherit";
				colorNamePattern.lastIndex = 0;
				colorCodePattern.lastIndex = 0;
				if ( !colorNamePattern.test( colorCode ) ) {
					if ( !colorCodePattern.test( colorCode ) ) {
						colorCode = "inherit";
					} else {
						if (colorCode.substr(0,1) !== "#") {
							colorCode = "#" + colorCode;
						}
					}
				}


				return '<span class="xbbcode-size-36" style="color:' + colorCode + '">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},
		"left": {
			openTag: function(params,content) {
				return '<span class="xbbcode-left">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},
		"li": {
			openTag: function(params,content) {
				return "<li>";
			},
			closeTag: function(params,content) {
				return "</li>";
			},
			restrictParentsTo: ["list","ul","ol"]
		},
		"list": {
			openTag: function(params,content) {
				return '<ul>';
			},
			closeTag: function(params,content) {
				return '</ul>';
			},
			restrictChildrenTo: ["*", "li"]
		},
		"noparse": {
			openTag: function(params,content) {
				return '';
			},
			closeTag: function(params,content) {
				return '';
			},
			noParse: true
		},
		"ol": {
			openTag: function(params,content) {
				return '<ol>';
			},
			closeTag: function(params,content) {
				return '</ol>';
			},
			restrictChildrenTo: ["*", "li"]
		},
		"php": {
			openTag: function(params,content) {
				return '<span class="xbbcode-code">';
			},
			closeTag: function(params,content) {
				return '</span>';
			},
			noParse: true
		},
		"quote": {
			openTag: function(params,content) {
				//console.log(params);
				if (typeof params !== 'undefined')
					return '<blockquote><header><cite title="' + params.replace("=", "") + '">' + params.replace("=", "") + '</cite> said:</header><p><em>';
				else
					return '<blockquote><em>';
			},
			closeTag: function(params,content) {
				if (typeof params !== 'undefined')
					return '</em></p></blockquote>';
				else
					return '</em><p></p></blockquote>';
			}
		},
		"right": {
			openTag: function(params,content) {
				return '<span class="xbbcode-right">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},
		"s": {
			openTag: function(params,content) {
				return '<span class="xbbcode-s">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},
		"size": {
			openTag: function(params,content) {

				var mySize = parseInt(params.substr(1),10) || 0;
				if (mySize < 4 || mySize > 40) {
					mySize = 14;
				}

				return '<span class="xbbcode-size-' + mySize + '">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},
		"small": {
			openTag: function(params,content) {
				var params = params || '';
				var colorCode = params.substr(1) || "inherit";
				colorNamePattern.lastIndex = 0;
				colorCodePattern.lastIndex = 0;
				if ( !colorNamePattern.test( colorCode ) ) {
					if ( !colorCodePattern.test( colorCode ) ) {
						colorCode = "inherit";
					} else {
						if (colorCode.substr(0,1) !== "#") {
							colorCode = "#" + colorCode;
						}
					}
				}

				return '<span class="xbbcode-size-10" style="color:' + colorCode + '">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},

		"sub": {
			openTag: function(params,content) {
				return '<sub>';
			},
			closeTag: function(params,content) {
				return '</sub>';
			}
		},
		"sup": {
			openTag: function(params,content) {
				return '<sup>';
			},
			closeTag: function(params,content) {
				return '</sup>';
			}
		},

		"table": {
			openTag: function(params,content) {
				return '<table class="xbbcode-table">';
			},
			closeTag: function(params,content) {
				return '</table>';
			},
			restrictChildrenTo: ["tbody","thead", "tfoot", "tr"]
		},
		"tbody": {
			openTag: function(params,content) {
				return '<tbody>';
			},
			closeTag: function(params,content) {
				return '</tbody>';
			},
			restrictChildrenTo: ["tr"],
			restrictParentsTo: ["table"]
		},
		"tfoot": {
			openTag: function(params,content) {
				return '<tfoot>';
			},
			closeTag: function(params,content) {
				return '</tfoot>';
			},
			restrictChildrenTo: ["tr"],
			restrictParentsTo: ["table"]
		},
		"thead": {
			openTag: function(params,content) {
				return '<thead class="xbbcode-thead">';
			},
			closeTag: function(params,content) {
				return '</thead>';
			},
			restrictChildrenTo: ["tr"],
			restrictParentsTo: ["table"]
		},
		"td": {
			openTag: function(params,content) {
				return '<td class="xbbcode-td">';
			},
			closeTag: function(params,content) {
				return '</td>';
			},
			restrictParentsTo: ["tr"]
		},
		"th": {
			openTag: function(params,content) {
				return '<th class="xbbcode-th">';
			},
			closeTag: function(params,content) {
				return '</th>';
			},
			restrictParentsTo: ["tr"]
		},
		"tr": {
			openTag: function(params,content) {
				return '<tr class="xbbcode-tr">';
			},
			closeTag: function(params,content) {
				return '</tr>';
			},
			restrictChildrenTo: ["td","th"],
			restrictParentsTo: ["table","tbody","tfoot","thead"]
		},
		"u": {
			openTag: function(params,content) {
				return '<span class="xbbcode-u">';
			},
			closeTag: function(params,content) {
				return '</span>';
			}
		},
		"ul": {
			openTag: function(params,content) {
				return '<ul>';
			},
			closeTag: function(params,content) {
				return '</ul>';
			},
			restrictChildrenTo: ["*", "li"]
		},
		"url": {
			openTag: function(params,content) {

				var myUrl;

				if (!params) {
					myUrl = content.replace(/<.*?>/g,"");
				} else {
					myUrl = params.substr(1);
				}

				urlPattern.lastIndex = 0;
				if ( !urlPattern.test( myUrl ) ) {
					myUrl = "#";
				}

				return '<a href="' + myUrl + '">';
			},
			closeTag: function(params,content) {
				return '</a>';
			}
		},
		/*
			The [*] tag is special since the user does not define a closing [/*] tag when writing their bbcode.
			Instead this module parses the code and adds the closing [/*] tag in for them. None of the tags you
			add will act like this and this tag is an exception to the others.
		*/
		"*": {
			openTag: function(params,content) {
				return "<li>";
			},
			closeTag: function(params,content) {
				return "</li>";
			},
			restrictParentsTo: ["list","ul","ol"]
		}
	};

	// create tag list and lookup fields
	function initTags() {
		tagList = [];
		var prop,
			ii,
			len;
		for (prop in tags) {
			if (tags.hasOwnProperty(prop)) {
				if (prop === "*") {
					tagList.push("\\" + prop);
				} else {
					tagList.push(prop);
					if ( tags[prop].noParse ) {
						tagsNoParseList.push(prop);
					}
				}

				tags[prop].validChildLookup = {};
				tags[prop].validParentLookup = {};
				tags[prop].restrictParentsTo = tags[prop].restrictParentsTo || [];
				tags[prop].restrictChildrenTo = tags[prop].restrictChildrenTo || [];

				len = tags[prop].restrictChildrenTo.length;
				for (ii = 0; ii < len; ii++) {
					tags[prop].validChildLookup[ tags[prop].restrictChildrenTo[ii] ] = true;
				}
				len = tags[prop].restrictParentsTo.length;
				for (ii = 0; ii < len; ii++) {
					tags[prop].validParentLookup[ tags[prop].restrictParentsTo[ii] ] = true;
				}
			}
		}

		bbRegExp = new RegExp("<bbcl=([0-9]+) (" + tagList.join("|") + ")([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>", "gi");
		pbbRegExp = new RegExp("\\[(" + tagList.join("|") + ")([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]", "gi");
		pbbRegExp2 = new RegExp("\\[(" + tagsNoParseList.join("|") + ")([ =][^\\]]*?)?\\]([\\s\\S]*?)\\[/\\1\\]", "gi");

		// create the regex for escaping ['s that aren't apart of tags
		(function() {
			var closeTagList = [];
			for (var ii = 0; ii < tagList.length; ii++) {
				if ( tagList[ii] !== "\\*" ) { // the * tag doesn't have an offical closing tag
					closeTagList.push ( "/" + tagList[ii] );
				}
			}

			openTags = new RegExp("(\\[)((?:" + tagList.join("|") + ")(?:[ =][^\\]]*?)?)(\\])", "gi");
			closeTags = new RegExp("(\\[)(" + closeTagList.join("|") + ")(\\])", "gi");
		})();

	};
	initTags();

	// -----------------------------------------------------------------------------
	// private functions
	// -----------------------------------------------------------------------------

	function checkParentChildRestrictions(parentTag, bbcode, bbcodeLevel, tagName, tagParams, tagContents, errQueue) {

		errQueue = errQueue || [];
		bbcodeLevel++;

		// get a list of all of the child tags to this tag
		var reTagNames = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])","gi"),
			reTagNamesParts = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])","i"),
			matchingTags = tagContents.match(reTagNames) || [],
			cInfo,
			errStr,
			ii,
			childTag,
			pInfo = tags[parentTag] || {};

		reTagNames.lastIndex = 0;

		if (!matchingTags) {
			tagContents = "";
		}

		for (ii = 0; ii < matchingTags.length; ii++) {
			reTagNamesParts.lastIndex = 0;
			childTag = (matchingTags[ii].match(reTagNamesParts))[2].toLowerCase();

			if ( pInfo && pInfo.restrictChildrenTo && pInfo.restrictChildrenTo.length > 0 ) {
				if ( !pInfo.validChildLookup[childTag] ) {
					errStr = "The tag \"" + childTag + "\" is not allowed as a child of the tag \"" + parentTag + "\".";
					errQueue.push(errStr);
				}
			}
			cInfo = tags[childTag] || {};
			if ( cInfo.restrictParentsTo.length > 0 ) {
				if ( !cInfo.validParentLookup[parentTag] ) {
					errStr = "The tag \"" + parentTag + "\" is not allowed as a parent of the tag \"" + childTag + "\".";
					errQueue.push(errStr);
				}
			}

		}

		tagContents = tagContents.replace(bbRegExp, function(matchStr, bbcodeLevel, tagName, tagParams, tagContents ) {
			errQueue = checkParentChildRestrictions(tagName.toLowerCase(), matchStr, bbcodeLevel, tagName, tagParams, tagContents, errQueue);
			return matchStr;
		});
		return errQueue;
	}

	/*
		This function updates or adds a piece of metadata to each tag called "bbcl" which
		indicates how deeply nested a particular tag was in the bbcode. This property is removed
		from the HTML code tags at the end of the processing.
	*/
	function updateTagDepths(tagContents) {
		tagContents = tagContents.replace(/\<([^\>][^\>]*?)\>/gi, function(matchStr, subMatchStr) {
			var bbCodeLevel = subMatchStr.match(/^bbcl=([0-9]+) /);
			if (bbCodeLevel === null) {
				return "<bbcl=0 " + subMatchStr + ">";
			} else {
				return "<" + subMatchStr.replace(/^(bbcl=)([0-9]+)/, function(matchStr, m1, m2) {
					return m1 + (parseInt(m2, 10) + 1);
				}) + ">";
			}
		});
		return tagContents;
	}

	/*
		This function removes the metadata added by the updateTagDepths function
	*/
	function unprocess(tagContent) {
		return tagContent.replace(/<bbcl=[0-9]+ \/\*>/gi,"").replace(/<bbcl=[0-9]+ /gi,"&#91;").replace(/>/gi,"&#93;");
	}

	var replaceFunct = function(matchStr, bbcodeLevel, tagName, tagParams, tagContents) {

		tagName = tagName.toLowerCase();

		var processedContent = tags[tagName].noParse ? unprocess(tagContents) : tagContents.replace(bbRegExp, replaceFunct),
			openTag = tags[tagName].openTag(tagParams,processedContent),
			closeTag = tags[tagName].closeTag(tagParams,processedContent);

		if ( tags[tagName].displayContent === false) {
			processedContent = "";
		}

		return openTag + processedContent + closeTag;
	};

	function parse(config) {
		var output = config.text;
		output = output.replace(bbRegExp, replaceFunct);
		return output;
	}

	/*
		The star tag [*] is special in that it does not use a closing tag. Since this parser requires that tags to have a closing
		tag, we must pre-process the input and add in closing tags [/*] for the star tag.
		We have a little levaridge in that we know the text we're processing wont contain the <> characters (they have been
		changed into their HTML entity form to prevent XSS and code injection), so we can use those characters as markers to
		help us define boundaries and figure out where to place the [/*] tags.
	*/
	function fixStarTag(text) {
		text = text.replace(/\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list[\]])/ig, "<");
		text = text.replace(/\[(?=list([ =][^\]]*)?\]|\/list[\]])/ig, ">");

		while (text !== (text = text.replace(/>list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi, function(matchStr,contents,endTag) {

			var innerListTxt = matchStr;
			while (innerListTxt !== (innerListTxt = innerListTxt.replace(/\[\*\]([^\[]*?)(\[\*\]|>\/list])/i, function(matchStr,contents,endTag) {
				if (endTag.toLowerCase() === ">/list]") {
					endTag = "</*]</list]";
				} else {
					endTag = "</*][*]";
				}
				return "<*]" + contents + endTag;
			})));

			innerListTxt = innerListTxt.replace(/>/g, "<");
			return innerListTxt;
		})));

		// add ['s for our tags back in
		text = text.replace(/</g, "[");
		return text;
	}

	function addBbcodeLevels(text) {
		while ( text !== (text = text.replace(pbbRegExp, function(matchStr, tagName, tagParams, tagContents) {
			matchStr = matchStr.replace(/\[/g, "<");
			matchStr = matchStr.replace(/\]/g, ">");
			return updateTagDepths(matchStr);
		})) );
		return text;
	}

	// -----------------------------------------------------------------------------
	// public functions
	// -----------------------------------------------------------------------------

	// API, Expose all available tags
	me.tags = function() {
		return tags;
	}

	// API
	me.addTags = function(newtags) {
		var tag;
		for (tag in newtags) {
			tags[tag] = newtags[tag];
		}
		initTags();
	}

	me.process = function(config) {

		var ret = {html: "", error: false},
			errQueue = [];

		config.text = config.text.replace(/</g, "&lt;"); // escape HTML tag brackets
		config.text = config.text.replace(/>/g, "&gt;"); // escape HTML tag brackets

		config.text = config.text.replace(openTags, function(matchStr, openB, contents, closeB) {
			return "<" + contents + ">";
		});
		config.text = config.text.replace(closeTags, function(matchStr, openB, contents, closeB) {
			return "<" + contents + ">";
		});

		config.text = config.text.replace(/\[/g, "&#91;"); // escape ['s that aren't apart of tags
		config.text = config.text.replace(/\]/g, "&#93;"); // escape ['s that aren't apart of tags
		config.text = config.text.replace(/</g, "["); // escape ['s that aren't apart of tags
		config.text = config.text.replace(/>/g, "]"); // escape ['s that aren't apart of tags

		// process tags that don't have their content parsed
		while ( config.text !== (config.text = config.text.replace(pbbRegExp2, function(matchStr, tagName, tagParams, tagContents) {
			tagContents = tagContents.replace(/\[/g, "&#91;");
			tagContents = tagContents.replace(/\]/g, "&#93;");
			tagParams = tagParams || "";
			tagContents = tagContents || "";
			return "[" + tagName + tagParams + "]" + tagContents + "[/" + tagName + "]";
		})) );

		config.text = fixStarTag(config.text); // add in closing tags for the [*] tag
		config.text = addBbcodeLevels(config.text); // add in level metadata

		errQueue = checkParentChildRestrictions("bbcode", config.text, -1, "", "", config.text);

		ret.html = parse(config);;

		if ( ret.html.indexOf("[") !== -1 || ret.html.indexOf("]") !== -1) {
			errQueue.push("Some tags appear to be misaligned.");
		}

		if (config.removeMisalignedTags) {
			ret.html = ret.html.replace(/\[.*?\]/g,"");
		}
		if (config.addInLineBreaks) {
			ret.html = '<div style="white-space:pre-wrap;">' + ret.html + '</div>';
		}

		ret.html = ret.html.replace("&#91;", "["); // put ['s back in
		ret.html = ret.html.replace("&#93;", "]"); // put ['s back in

		ret.error = errQueue.length !== 0;
		ret.errorQueue = errQueue;

		return ret;
	};

	return me;
})();

	// April fools day shit
	// if you're reading my source code, don't tell anyone about the shenanigans. feel free to contact me and i'll validate your awesomeness
var date = new Date();
// Check if April 1
if (date.getDate() === 1 && date.getMonth() === 3) {
	document.title = 'Drug Band Message Board';
	$(function() {
		$(".poster_name a").each(function() {
			var name = $(this).text();
			if (!name.match(/^.*420.*$/))
				$(this).html(name+420);
			else
				$(this).html(name+" (I really have 420 in my name)");
		});
	});
}
	// End April Fools Day

	var i, ii, iii, bands, posts, postsrefs, userData, tempUserData, postBody, tableBody, showSet, colorSet, quotesSet, videoSet, setScroll, reloadTopic, mythreads, mt, lastele, originalColor, overlap;
			$(document).ready(function() {
				getBands();
			});

			function getBands() {
				$.get("https://www.phantasytour.com/api/bands", function(data) {
					bands = data;

					$.get("https://www.phantasytour.com" + getBandApiUrlByWebUrl(bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/threads/" + location.pathname.split('/')[4] + "/posts?limit=499&skip=0", function(data) {
						posts = data.data;
						postsrefs = data.references;
					});
					//createPrintPage();
					var tCMT = setTimeout(
						function() { checkMT(); },
						2000
					);

					var tASD = setTimeout(
						function() { addScrollDown(); },
						2000
					);
					var tABT = setTimeout(
						function() { addBumpThread(); },
						2500
					);
					var tAPT = setTimeout(
						function() { addPrintThread(); },
						2500
					);
					var tABT = setTimeout(
						function() { addBoldText(); },
						2500
					);
					var tAIT = setTimeout(
						function() { addItalicText(); },
						2500
					);
					var tABIT = setTimeout(
						function() { addBoldItalicText(); },
						2500
					);
					var tALNK = setTimeout(
						function() { addLinkBuilder(); },
						2500
					);
					var tEQO = setTimeout(
						function() { enableQuoteOverride(); },
						2500
					);

				});
			}

			function getBandApiUrlByWebUrl(bands, webUrl) {
				var band = bands.filter(function (obj) {
					return obj.webUrl == webUrl;
				});
				return band[0]["url"];
			}

			function getPostBodyById(posts, postId) {
				var post = posts.filter(function (obj) {
					return obj.id == postId;
				});
				return post[0]["body"];
			}

			function enableQuoteOverride() {
				$('a[href="#reply"]').parent('span').html('').html('<a class="add_quote_to_reply" title="Quote Post In Reply"><img src="/Content/images/sprites/quote.png"></a>');
				$(document).on('click', '.add_quote_to_reply', function (e) {
					e.preventDefault();
					var postId = $(this).closest('.post_tools').find('a[href^="/PhantasyMail/"]').attr('href').replace(/\D/g,'');
					//console.log(postId);
					var userName = $(this).closest('.post_header').find('.poster_name a').text();
					var originalTextAreaContent = $('#new_post textarea').val();//console.log(originalTextAreaContent); console.log($('#new_post textarea').val());
					$.get("https://www.phantasytour.com" + getBandApiUrlByWebUrl(bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/threads/" + location.pathname.split('/')[4] + "/posts?limit=499&skip=0", function(data) {
						posts = data.data;
						postsrefs = data.references;
						var quotedPostBody = getPostBodyById(posts, postId);//console.log(quotedPostBody);
						var quotedQuotedPostBody = '[quote=' + userName + ']' + quotedPostBody + '[/quote]';//console.log(quotedQuotedPostBody);
						//console.log(originalTextAreaContent); console.log($('#new_post textarea').val());
						$('#new_post textarea').val(originalTextAreaContent + quotedQuotedPostBody);
						$('html, body').animate({
							scrollTop: $("#reply").offset().top
						}, "slow");
					});
				});
				$('.add_quote_to_reply').css('cursor', 'pointer');
			}

			function checkMT() {
				var topic = $("#post-listing .topic_title").text();
				var mt = false;
				$.get("https://www.phantasytour.com" + getBandApiUrlByWebUrl(bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/mythreads?skip=0&pageSize=40", function(data) {
					mythreads = data.aaData;
					for (var i=0; i < mythreads.length; i+=1) {
						if (mythreads[i]["Subject"] === topic) {
							mt = true;
						}
					}
					if (mt) {
						$("#bottom-pagination-container div a:contains('MT')").html($("#bottom-pagination-container div a:contains('MT')").html() + '✔');
						$(".topic_header div a:contains('MT')").html($(".topic_header div a:contains('MT')").html() + '✔');
					}
				});
			}

			var num;
			$(document).on("mouseup", "ul.pagination li a, button.load-more-button", function() {
				num = $(".post").length;
				var t = setTimeout(
					function() { checkLoad(); },
					3500
				);
		
			});
		
			function checkLoad() {
				replaceLinks();

			}

			$(document).ajaxComplete(function() {
				num = $(".post").length;
				var t = setTimeout(
					function() { checkLoad(); },
					3500
				);
			});

			function addScrollDown() {
				$(".topic_header .mod_tools > a:last").after('<span class="usr_tools"><a href="#" id="scrollDown" title="Go Down">Down</a></span>');

				$(document).on("click", "#scrollDown", function (e) {
					e.preventDefault();
					$('html, body').animate({
						scrollTop: $("#applicationHost").height()
					}, "slow");
				});
			}

			function filterByAuthorID(obj) {
				return obj.id == this.authorId;
			}

			function filterForThreadSubject(obj) {
				return obj.type == "Thread";
			}

			function createPrintPage() {
				var filteredpostsrefs, date, dateCreated;
				tableBody = '', tableHead = '', postBody = '';
				for (iii = 0; iii < posts.length; iii += 1) {//console.log(tempUserData[posts[iii]["authorId"]]);
					if (iii === 0) {
						filteredpostsrefs = postsrefs.filter(filterForThreadSubject);
						tableHead += '<tr><th class="pthead" colspan="2"><span>Thread Subject: ' + filteredpostsrefs[0]["subject"] + '</span><br>Thread ID: ' + filteredpostsrefs[0]["id"] + '</th></tr>';
					}

					filteredpostsrefs = postsrefs.filter(filterByAuthorID, {"authorId": posts[iii]["authorId"]});
					date = new Date(posts[iii]["dateCreated"]);
					dateCreated = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

					postBody = XBBCODE.process({text: posts[iii]["body"], removeMisalignedTags: false, addInLineBreaks: true});

					tableBody += '<tr id="post' + posts[iii]["id"] + '"><td class="ptdata"><span>' + filteredpostsrefs[0]["username"] + '</span><br>' + dateCreated + '</td><td class="ptpost">' + postBody.html + '</td></tr>';
				}
				var opened = window.open('');
				opened.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>My title</title><style type="text/css">blockquote{border:1px solid rgba(221,221,221,.5);padding:3px;margin:6px 15px;}th{font-weight:normal;}td.ptdata,th.pthead{font-size:11px;vertical-align:top;}th.pthead{text-align:left;}td.ptdata{text-align:right;width:150px;padding-bottom:15px;border-top:1px solid rgba(221,221,221,.5);}td.ptdata span,th.pthead span{font-size:12px;font-weight:bold;}td.ptpost{vertical-align:top;font-size:12px;padding-bottom:15px;border-top:1px solid rgba(221,221,221,.5);}</style></head><body><table><thead>' + tableHead + '</thead><tbody>' + tableBody + '</tbody></table></body></html>');
			}

			function addPrintThread() {
				$(".topic_header .mod_tools > span a#scrollDown").after('<a href="#" id="printThread" title="Print Thread">Print</a>');
				
				$(document).on("click", "#printThread", function (e) {
					e.preventDefault();

					$.get("https://www.phantasytour.com" + getBandApiUrlByWebUrl(bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/threads/" + location.pathname.split('/')[4] + "/posts?limit=499&skip=0", function(data) {
						posts = data.data;
						postsrefs = data.references;
						createPrintPage();
					});
				});
			}

			function addBoldText() {
				$('#new_post textarea').after('<a href="#" id="boldText" title="Bold Text">Bold Selected Text</a> | <a href="#" id="italicText" title="Italic Text">Italic Selected Text</a> | <a href="#" id="boldItalicText" title="Bold Italic Text">Bold and Italic Selected Text</a> | <a href="#" id="createLink" title="Create Link">Create Link</a><br><br>');
				$(document).on("click", "#boldText", function (e) {
					e.preventDefault();
					el = $('#new_post textarea')[0];
					if (el.setSelectionRange) {
					el.value = el.value.substring(0,el.selectionStart) + "[b]" + el.value.substring(el.selectionStart,el.selectionEnd) + "[/b]" + el.value.substring(el.selectionEnd,el.value.length);
					};
				});
			}
			
			function addItalicText() {
				$(document).on("click", "#italicText", function (e) {
					e.preventDefault();
					el = $('#new_post textarea')[0];
					if (el.setSelectionRange) {
					el.value = el.value.substring(0,el.selectionStart) + "[i]" + el.value.substring(el.selectionStart,el.selectionEnd) + "[/i]" + el.value.substring(el.selectionEnd,el.value.length);
					};
				});
			}
			
			function addBoldItalicText() {
				$(document).on("click", "#boldItalicText", function (e) {
					e.preventDefault();
					el = $('#new_post textarea')[0];
					if (el.setSelectionRange) {
					el.value = el.value.substring(0,el.selectionStart) + "[b][i]" + el.value.substring(el.selectionStart,el.selectionEnd) + "[/i][/b]" + el.value.substring(el.selectionEnd,el.value.length);
					};
				});
			}

			function addLinkBuilder() {
				var linkFormElements = '<div class="form-group"><label for="ptlinkurl">Link URL</label><input id="ptlinkurl" type="text" class="form-control"></div><div class="form-group"><label for="ptlinktext">Link Text</label><input id="ptlinktext" type="text" class="form-control"></div><div class="checkbox" style="float:left;vertical-align:top;margin-top:0;margin-right:15px;"><label><input id="ptlinkbold" type="checkbox">Bold</label></div><div class="checkbox"style="float:left;vertical-align:top;margin-top:0;margin-right:15px;"><label><input id="ptlinkitalic" type="checkbox">Italic</label></div><br>';
				$(document).on("click", "#createLink", function (e) {
					e.preventDefault();
					BootstrapDialog.show({
						title: 'Create a Link',
						message: linkFormElements,
						buttons: [{
							label: 'Insert Link',
							action: function (dialogRef) {
								addLink();
								dialogRef.close();
							}
						},
						{
							label: 'Close',
							action: function (dialogRef) {
								dialogRef.close();
							}
						}]
					});
				});
			}
			
			function addLink() {
					el = $('#new_post textarea')[0];
					tte = '[a href="' + document.getElementById('ptlinkurl').value + '"]' + document.getElementById('ptlinktext').value + '[/a]';
					if (document.getElementById('ptlinkitalic').checked) { tte = "[i]" + tte + "[/i]";};
					if (document.getElementById('ptlinkbold').checked) { tte = "[b]" + tte + "[/b]";};
					el.value += tte;
					document.getElementById('ptlinkurl').value = "";
					document.getElementById('ptlinktext').value = "";
			}

			function addBumpThread() {
				$(".topic_header .mod_tools > span a#scrollDown").before('<a href="#" id="bumpThread" title="Bump">Bump</a><a href="#" id="diaf" title="DIAF">DIAF</a><a href="#" id="kys" title="KYS">KYS</a><a href="#" id="nam" title="NAM">Nam</a></span>');
				$(document).on("click", "#bumpThread, #diaf, #kys, #nam", function () {
					var text = $(this).html();
					if (text === 'Nam')
						text = 'https://i.imgur.com/znUlc.jpg';
					$("#new_post textarea").val(text);
					$.post("https://www.phantasytour.com" + getBandApiUrlByWebUrl(bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/posts", {"Body": $("#new_post textarea").val(), "ThreadId": location.pathname.split('/')[4]}, function(data) {
						mt = true;
						$("#new_post textarea").val("");
						$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
						afterAjax();
					});
				});
			}
		
			$("#bottom-pagination-container div + div > a:last").prev('a').attr("onclick", "").click(function() {
				$('html, body').animate({
					scrollTop: 0
				}, "slow");
			});
		
			$(document).off("click", "#bottom-pagination-container div + div > a:last").on("click", "#bottom-pagination-container div + div > a:last", function() {
				afterAjax();
				return false;
			});
		
			$(document).off("click", "#bottom-pagination-container div a:contains('MT'), .topic_header div a:contains('MT')").on("click", "#bottom-pagination-container div a:contains('MT'), .topic_header div a:contains('MT')", function() {
				$.post("/api/mythreads/" + location.pathname.split('/')[4], function() {
					$("#bottom-pagination-container div a:contains('MT')").html($("#bottom-pagination-container div a:contains('MT')").html() + '✔').css("color", "#757575");
					$(".topic_header div a:contains('MT')").html($(".topic_header div a:contains('MT')").html() + '✔');
					mt = true;
				});
				return false;
			});
		
			function afterAjax() {
				$('button.btn.btn-default.btn-large.load-more-button').click();
				//$.ajax("https://" + window.location.host + window.location.pathname + " #applicationHost > *", {
					//timeout: 3000,
					//success: function(resp) {
						//$('#applicationHost').html(resp);
						//findHidden();
						//replaceLinks();
					//}
				//});

				//$("#applicationHost").load("https://" + window.location.host + window.location.pathname + " #applicationHost > *", function() {
					//findHidden();
					//replaceLinks();
					//alert($('script[src*=pt_js_cached]').attr("src"));
					//$("head").append("<script type='text/javascript' src='"+$('script[src*=pt_js_cached]').attr("src")+"'>setup_show_tooltips()</script>");
				//});
			}
		
			function showOverlap() {
				for (var i = 0; i < overlap; i++) {
					$(".overlap_post:nth(" + (4 - i) + ")").show();
				}
			}
		
			function replaceLinks() {
		/*$.post("http://"+window.location.host + window.location.pathname, {authenticity_token: $('input[name*="authenticity_token"]').val(), post_body:"testing123",post_topic_id: topic,commit: "Post Reply"}, function(data) {
						alert(data);
					});*/
				$("a[href$='.jpg'], a[href$='.jpeg'], a[href$='.png'], a[href$='.gif']").each(function(i) {
					var href = $(this).attr('href');
					var text = $(this).text();
					originalColor = $(this).css("color");
					var stringer = "";
					if (text != href) {
						stringer = text;
					}
					if (showSet === "load" && ($(this).parents("em").css("font-style") != "italic" || quotesSet === "qyes")) {
						$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='ptimg" + i + "' src='" + href + "' alt='' style='max-width:100%;' />");
					} else {
						$(this).css("color", "#" + colorSet).attr("class", "ptimg" + i).click(function() {
							$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
							return false;
						});
					}
					$("#ptimg" + i).error(function() {
						$(this).hide().parent("a").css("color", originalColor);
					});
				});
				var temp = true;
				if ($("a[href*='youtube'], a[href*='youtu.be'], a[href*='vimeo'], a[href$='.gifv']").length >= 10) {
					temp = false;
				}
				$("a[href*='youtube'], a[href*='youtu.be']").each(function(i) {
					var href = $(this).attr("href");
					var text = $(this).text().replace("amp;", "");
					var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
					var id = href.match(myregexp); //^[^v]+v.(.{11}).*
					if (id == null) return;
					else id = id[1];
					var stringer = "";
					if (text != href) {
						stringer = text;
					}
					//console.log(id);
					var objectstr = '<iframe class="youtube-player" type="text/html" width="100%" height="385" src="https://www.youtube.com/embed/' + id + '" frameborder="0"></iframe>';
		
					if ((videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") != "italic" || quotesSet === "qyes")) {
						$(this).css("color", "black").html(stringer + objectstr);
					} else {
						$(this).css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + objectstr);
							return false;
						});
					}
				});
				$("a[href*='vimeo']").each(function(i) {
					var href = $(this).attr("href");
					var text = $(this).text();
					var id = href.match(/[0-9]+/, "");
					var objectstr = '<iframe class="vimeo-player" src="https://player.vimeo.com/video/' + id + '?portrait=0" width="100%" height="335" frameborder="0"></iframe>';
					var stringer = "";
					if (text != href) {
						stringer = text;
					}
					if ((videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") != "italic" || quotesSet === "qyes")) {
						$(this).css("color", "black").html(stringer + objectstr);
					} else {
						$(this).css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + objectstr);
							return false;
						});
					}
				});
				$("a[href$='.gifv']").each(function(i) {
					var href = $(this).attr("href");
					var text = $(this).text();
					var id = href.match(/[0-9]+/, "");
					var objectstr = '<iframe class="gifv-player" src="' + href.replace('http://', 'https://') + '" width="100%" height="335" frameborder="0"></iframe>';
					var stringer = "";
					if (text != href) {
						stringer = text;
					}
					if ((videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") != "italic" || quotesSet === "qyes")) {
						$(this).css("color", "black").html(stringer + objectstr);
					} else {
						$(this).css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + objectstr);
							return false;
						});
					}
				});
				$(".post:not(:hidden):even").removeClass("even").addClass("odd");
				$(".post:not(:hidden):odd").removeClass("odd").addClass("even");
				if (scrollSet != "false") {
					//console.log($('.post_body_container').css('cssText'));
					$('.post_body_container').css('cssText', $('.post_body_container').css('cssText') + 'max-height: none !important').css('height', '');
				}
			}
		
			function getNumber(s) {
				var string = new Array();
				for (var i = 1; i < s.length; i++) {
					if (parseInt(s.slice(-i)) >= 0) {
						string = s.slice(-i);
					} else {
						break;
					}
				}
				return string;
			}
		
			function checkOc(s, y) {
				var number = 0;
				while (s.indexOf(y, 0) >= 0) {
					number++;
					s = s.replace(y, "");
				}
				return number;
			}
		
			function findHidden() {
				$("script[src=]").each(function() {
					var text = $(this).text();
					var index = text.indexOf("PT.board_overlap_window");
					if (text.indexOf("set_hidden_authors") >= 0) {
						for (var i = 0; i < text.length; i++) {
							if (text.slice(i, i + 2) === "([") {
								var hide = text.slice(i + 1, -11);
								hidePosts(eval(hide));
								break;
							}
						}
					} else if (index >= 0) {
						overlap = text.slice(index + 26, index + 27);
						showOverlap();
						return;
					}
				});
			}
		
			function hidePosts(a) {
				for (var i = 0; i < a.length; i++) {
					$(".author_" + a[i]).hide();
				}
			}
		
			$("img").on("mousedown", function() {
				lastele = $(this);
			});
		
			chrome.runtime.sendMessage({
				set: "show"
			}, function(response) {
				showSet = response.setShow;
				colorSet = response.setColor;
				quotesSet = response.setQuotes;
				videoSet = response.setVideo;
				reloadTopic = response.setReload;
				scrollSet = response.setScroll;
				if (reloadTopic != "false") {
					var tSB = setTimeout(function () {
						$('button[data-bind*="click: postReply"]').after($('button[data-bind*="click: postReply"]').clone().removeAttr('data-bind').removeAttr('disabled').attr('type', 'button').attr('id', 'postReplyBtn')).hide();
						$('button[data-bind*="click: onPreview"]').after($('button[data-bind*="click: onPreview"]').clone().removeAttr('data-bind').removeAttr('disabled').attr('type', 'button').attr('id', 'previewReplyBtn')).hide();
					}, 2500);
					$(document).off('click', '#postReplyBtn').on("click", '#postReplyBtn', function(e) {
						e.preventDefault;
						$(this).val("Posting...").attr('disabled', 'disabled');
						$("#errorExplanation").remove();
						if (checkOc($("#new_post textarea").val(), "quote") > 8) {
		
							$("#applicationHost").after('<div class="errorExplanation" id="errorExplanation"><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>You cannot have more than 4 quotes.</li></ul></div>');
							$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
							return false;
						}
						if ($("#new_post textarea").val().length < 1) {
							var errorHTML = "<div class='errorExplanation' id='errorExplanation'><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>Body is too short (minimum is 2 characters)</li></ul></div>";
							$("#applicationHost").after(errorHTML);
							return false;
						} else if ($("#new_post textarea").val().length < 2) {
							$("#new_post textarea").val($("#new_post textarea").val() + " ")
						}
						$.post("https://www.phantasytour.com" + getBandApiUrlByWebUrl(bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/posts", {"Body": $("#new_post textarea").val(), "ThreadId": location.pathname.split('/')[4]}, function(data) {
							mt = true;
							$("#new_post textarea").val("");
							$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
							afterAjax();
						});
					});
					$(document).off('click', '#previewReplyBtn').on("click", '#previewReplyBtn', function(e) {
						e.preventDefault;
						$(this).val("Previewing...").attr('disabled', 'disabled');
						$("#errorExplanation").remove();
						if (checkOc($("#new_post textarea").val(), "quote") > 8) {

							$("#applicationHost").after('<div class="errorExplanation" id="errorExplanation"><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>You cannot have more than 4 quotes.</li></ul></div>');
							$('#previewReplyBtn').val("Preview").removeAttr("disabled");
							return false;
						}
						if ($("#new_post textarea").val().length < 1) {
							var errorHTML = "<div class='errorExplanation' id='errorExplanation'><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>Body is too short (minimum is 2 characters)</li></ul></div>";
							$("#applicationHost").after(errorHTML);
							return false;
						} else if ($("#new_post textarea").val().length < 2) {
							$("#new_post textarea").val($("#new_post textarea").val() + " ")
						}
						//var app = require('durandal/app');
						//app.showMessage($("#new_post textarea").val(), "Your thoughts...", ["Close"], !0, {style:{width:"800px",height:"400px"}});
						var message = $("#new_post textarea").val();
						var messageBody = XBBCODE.process({text: message, removeMisalignedTags: false, addInLineBreaks: true});
						BootstrapDialog.show({
							title: 'Your thoughts...',
							message: messageBody.html,
							onhide: function (dialogRef) {
								$('#previewReplyBtn').val("Preview").removeAttr("disabled");
							},
							buttons: [{
								label: 'Close',
								action: function (dialogRef) {
									dialogRef.close();
								}
							}]
						});
					});
				}
				if (!colorSet) {
					colorSet = "0000FF";
				}
				replaceLinks();
			});
		
			chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
				if (request.run === "replaceLinks") {
					var videoset2 = videoSet;
					var showset2 = showSet;
					showSet = "load";
					videoSet = "vload";
					replaceLinks();
					showSet = showset2;
					videoSet = videoset2;
				} else if (request.run === "close") {
					var par = lastele.parent("a");
					lastele.remove();
					var href = par.attr("href");
					var stringer = par.text();
					if (par.text().length === 0) {
						par.html(href);
					}
					par.css("color", "#" + colorSet).click(function() {
						$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
						return false;
					});
				} else if (request.run === "closeAll") {
					$(".addedPTImages").each(function() {
						var par = $(this).parent("a");
						$(this).remove();
						var href = par.attr("href");
						var stringer = par.text();
						if (par.text().length === 0) {
							par.html(href);
						}
						par.css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
							return false;
						});
					});
					$(".youtube-player").each(function() {
						var par = $(this).parent("a");
						$(this).remove();
						var href = par.attr("href");
						var stringer = par.text();
						if (par.text().length === 0) {
							par.html(href);
						}
						par.css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
							return false;
						});
					});
					$(".vimeo-player").each(function() {
						var par = $(this).parent("a");
						var href = par.attr("href");
						$(this).remove();
						var id = href.match(/[0-9]+/, "");
						var stringer = par.text();
						if (par.text().length === 0) {
							par.html(href);
						}
						par.css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + '<iframe class="vimeo-player" src="http://player.vimeo.com/video/' + id + '?portrait=0" width="100%" height="335" frameborder="0"></iframe>').unbind('click');
							return false;
						});
					});
					$(".gifv-player").each(function() {
						var par = $(this).parent("a");
						var href = par.attr("href");
						$(this).remove();
						var id = href.match(/[0-9]+/, "");
						var stringer = par.text();
						if (par.text().length === 0) {
							par.html(href);
						}
						par.css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + '<iframe class="gifv-player" src="' + href.replace('http://', 'https://') + '" width="100%" height="335" frameborder="0"></iframe>').unbind('click');
							return false;
						});
					});
				}
				sendResponse({}); // snub them.
			});
