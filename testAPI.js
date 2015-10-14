var FeedZai = function(EnvStr, configObj) {
  'use strict';
  if (!configObj) { 
    // console.log("Require username password etc!!");
    return null;
  } 

  // username is your API key
  var _username = configObj.username || "makersquare18";
  var _password = configObj.password || "";
  var httpsStr = "https://";

  if (EnvStr !== "dev" && EnvStr !== "prod") { 
    // console.log("prod or dev?"); 
    return null; 
  }

  var ENV = EnvStr === "prod" ? EnvStr : "dev";
  
  var baseURL;
  var _sandboxUrl = "sandbox.feedzai.com";
  var _productionUrl = "api.feedzai.com";
  // Sub query URL list
  // GET
  var _paymentDumpUrl = "/v1/payments";
  var _historyDumpUrl = "/v1/history/payments";
  var _merchantsDumpUrl = "/v1/merchants";
  var _actionsDumpUrl = "v1/actions";

  /* Initialize */
  var setEnv = function(envStr) {
    ENV = envStr === "prod" ? envStr : "dev";
    baseURL = ENV === "dev" ? _sandboxUrl : _productionUrl;
  };
  
  // Getters
  var getEnv = function() {
    return ENV;
  };
  
  var getBaseUrl = function() {
    return baseURL;
  };

  // appendStr starts with leading slash
  var constructUri = function(appendStr) {
    // TODO: check type and others
    return httpsStr + _username + ":" + _password + "@" + baseURL + appendStr;
  };

  // url: /v1/payments
  // Construct request object
  var paymentDump = function() {
    return {
      uri: constructUri(_paymentDumpUrl),
      method: "GET"
    };
  };

  var historyDump = function() {
    return {
      uri: constructUri(_historyDumpUrl),
      method: "GET"
    };
  };

  var merchantDump = function() {
    return {
      uri: constructUri(_merchantsDumpUrl),
      method: "GET"
    };
  };
  
  var actionsDumpUrl = function() {
    return {
      uri: constructUri(_actionsDumpUrl),
      method: "GET"
    };
  };
  
  var scoreAPayment = function() {
  };

  setEnv(EnvStr);
  return {
    getEnv: getEnv,
    setEnv: ENV,
    getBaseUrl: getBaseUrl,
    constructUri: constructUri,
    paymentDump: paymentDump,
    historyDump: historyDump,
    merchantDump: merchantDump
  };
};

exports.FeedZai = FeedZai;
