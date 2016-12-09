function Flashlight() {
  // track flashlight state
  this._isSwitchedOn = false;
}

Flashlight.prototype = {

  available: function (callback) {
    cordova.exec(function (avail) {
      callback(avail ? true : false);
    }, function() { callback(false); }, "Flashlight", "available", []);
  },

  switchOn: function (successCallback, errorCallback, options) {
    var opts = options || {};
    this._isSwitchedOn = true;
    cordova.exec(successCallback, errorCallback, "Flashlight", "switchOn", [opts]);
  },

  switchOff: function (successCallback, errorCallback) {
    this._isSwitchedOn = false;
    cordova.exec(successCallback, errorCallback, "Flashlight", "switchOff", []);
  },
  
  switchOnPrep: function (successCallback, errorCallback, options) {
    var opts = options || {};
    cordova.exec(successCallback, errorCallback, "Flashlight", "switchOnPrep", [opts]);
  },

  switchOffPrep: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Flashlight", "switchOffPrep", []);
  },
  
  switchOnFast: function (successCallback, errorCallback, options) {
    var opts = options || {};
    this._isSwitchedOn = true;
    cordova.exec(successCallback, errorCallback, "Flashlight", "switchOnFast", [opts]);
  },

  switchOffFast: function (successCallback, errorCallback) {
    this._isSwitchedOn = false;
    cordova.exec(successCallback, errorCallback, "Flashlight", "switchOffFast", []);
  },

  toggle: function (successCallback, errorCallback, options) {
    if (this._isSwitchedOn) {
      this.switchOff(successCallback, errorCallback);
    } else {
      this.switchOn(successCallback, errorCallback, options);
    }
  },

  toggleFast: function (successCallback, errorCallback, options) {
    if (this._isSwitchedOn) {
      this.switchOffFast(successCallback, errorCallback);
    } else {
      this.switchOnFast(successCallback, errorCallback, options);
    }
  },

  isSwitchedOn: function () {
    return this._isSwitchedOn;
  }
};

Flashlight.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.flashlight = new Flashlight();
  return window.plugins.flashlight;
};

cordova.addConstructor(Flashlight.install);
