/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//js goes here :)
	var ChatMachine = __webpack_require__(1);

	$(function(){
	  new ChatMachine($('.chat'));
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var ChatMachine = function($el){
	  this.$messages = $el.find("ul");
	  this.$form = $el.find("form");
	  this.$form.on("submit", this.submitMessage.bind(this));
	};

	ChatMachine.prototype.submitMessage = function (e) {
	  e.preventDefault();
	  $.ajax({
	    method: "POST",
	    url: "/messages",
	    dataType: "json",
	    data: this.$form.serialize(),
	    success: function(message){
	      this.addMessage(message);
	      this.clearForm();
	    }.bind(this)
	  });
	  this.addSpinner();
	};

	ChatMachine.prototype.addMessage = function (message) {
	  var $message = $("<li>").text(message.author + ": " + message.text);
	  this.$messages.append($message);
	  this.$messages.find(".loader").remove();
	};

	ChatMachine.prototype.clearForm = function () {
	  this.$form.find("input[type='text']").val("");
	};

	ChatMachine.prototype.addSpinner = function () {
	  this.$messages.append('<div class="loader">Loading...</div>');
	};



	module.exports = ChatMachine;


/***/ }
/******/ ]);