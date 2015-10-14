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
  var _paymentUrl = "/v1/payments";
  var _historyUrl = "/v1/history/payments";
  var _merchantsUrl = "/v1/merchants";
  var _actionsUrl = "v1/actions";

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
      uri: constructUri(_paymentUrl),
      method: "GET"
    };
  };

  var historyDump = function() {
    return {
      uri: constructUri(_historyUrl),
      method: "GET"
    };
  };

  var merchantDump = function() {
    return {
      uri: constructUri(_merchantsUrl),
      method: "GET"
    };
  };
  
  var actionsDumpUrl = function() {
    return {
      uri: constructUri(_actionsUrl),
      method: "GET"
    };
  };

  // Sample user payment object
  // {
  //  "user_id": "af00-bc14-1245", // required 
  //  "amount": 280000             // required
  // }
  var scoreAPayment = function(paymentScoreObj) {
    return {
      uri: constructUri(_paymentUrl),
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(paymentScoreObj)
    };
  };

  setEnv(EnvStr);
  return {
    getEnv: getEnv,
    setEnv: ENV,
    getBaseUrl: getBaseUrl,
    constructUri: constructUri,
    paymentDump: paymentDump,
    historyDump: historyDump,
    merchantDump: merchantDump,

    scoreAPayment: scoreAPayment
  };
};

exports.FeedZai = FeedZai;
