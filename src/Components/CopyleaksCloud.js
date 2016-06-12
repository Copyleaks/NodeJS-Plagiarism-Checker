var request = require('request-promise');
var fs = require('fs'); 
var path = require('path');
var _ = require('lodash');
var config = require(__dirname+'/../Helpers/config.js');
var LoginToken = require(__dirname+'/LoginToken.js');
var API = require(__dirname+'/API.js');

// INIT CONSTRUCTOR
function CopyleaksCloud() { };

//login API
CopyleaksCloud.prototype.login = function(email,apikey,cback) {
	var reqObj = { Email: email, ApiKey : apikey};

	var _url = 'https://api.copyleaks.com/v1/account/login-api';

	var _api = new API();
	var _requestOptions = _api.optionsBuilder('POST',{},_url);
	_requestOptions.body = JSON.stringify(reqObj);
	request(_requestOptions)
		.then(function(resp,err){
			var ltoken = JSON.parse(resp);

	  		CopyleaksCloud.prototype.loginToken = new LoginToken(ltoken);

	  		if(cback) cback(resp ,err);
	    	
		})
		.catch(function(err){
			if(err && err.response)
				_api.errorHandler(err.response.toJSON());

			if(cback) cback({} ,err);
		});

};

//get-credit API
CopyleaksCloud.prototype.getCreditBalance = function(cback){
	var _url = 'https://api.copyleaks.com/v1/account/count-credits';

	var _api = new API();
	var _headers = {'Authorization' : 'Bearer '+this.loginToken.getAuthHeader() };
	var _requestOptions = _api.optionsBuilder('GET',_headers,_url);
	_api.executeAPI(_requestOptions,cback);
};



//list api - get processes list
CopyleaksCloud.prototype.getProcessList = function(cback){
	var _url = 'https://api.copyleaks.com/v1/'+config.SERVICE_PAGE+'/list';

	var _api = new API();
	var _headers = {'Authorization' : 'Bearer '+this.loginToken.getAuthHeader() };
	var _requestOptions = _api.optionsBuilder('GET',_headers,_url);
	_api.executeAPI(_requestOptions,cback);
};

//create-by-file API
CopyleaksCloud.prototype.createByFile = function(file,headers,cback){
	var _fstat = fs.statSync(file);
	_fstat.extension = path.extname(file).split('.').join('');
	_fstat.original = file;

	var _url = 'https://api.copyleaks.com/v1/'+config.SERVICE_PAGE+'/create-by-file';

	var _api = new API();
	_api.handleFile(_fstat,'FILE');
	
	//Manage custom headers,authorization header
	var _headers = {'Authorization' : 'Bearer '+this.loginToken.getAuthHeader() };
	_headers = _.merge(_headers,headers);

	//handle file streaming
	var _requestOptions = _api.optionsBuilderForFiles('POST',_headers,_url);
	
	_api.executeAPI(_requestOptions,cback);

};

//create-by-file-ocr API
CopyleaksCloud.prototype.createByFileOCR = function(file,headers,language,cback){
	var _fstat = fs.statSync(file);
	_fstat.extension = path.extname(file).split('.').join('');
	_fstat.original = file;

	var _url = 'https://api.copyleaks.com/v1/'+config.SERVICE_PAGE+'/create-by-file-ocr?language='+language;

	var _api = new API();
	_api.handleFile(_fstat,'OCR');
	_api.checkOCRLanguage(language);

	//Manage custom headers,authorization header
	var _headers = {'Authorization' : 'Bearer '+this.loginToken.getAuthHeader() };
	_headers = _.merge(_headers,headers);

	//handle file streaming
	var _requestOptions = _api.optionsBuilderForFiles('POST',_headers,_url);
	
	_api.executeAPI(_requestOptions,cback);

};

//create-by-url API
CopyleaksCloud.prototype.createByURL = function(url,headers,cback){
	var _url = 'https://api.copyleaks.com/v1/'+config.SERVICE_PAGE+'/create-by-url';
	var _reqObj = { Url: url};
	var _api = new API();
	var _headers = {'Authorization' : 'Bearer '+this.loginToken.getAuthHeader() };
	_headers = _.merge(_headers,headers);
	var _requestOptions = _api.optionsBuilder('POST',_headers,_url);
	_requestOptions.body = JSON.stringify(_reqObj);
	_api.executeAPI(_requestOptions,cback);
};

CopyleaksCloud.prototype.getProcessStatus = function(pid,cback){
	var _url = 'https://api.copyleaks.com/v1/'+config.SERVICE_PAGE+'/'+pid+'/status';
	
	var _api = new API();
	var _headers = {'Authorization' : 'Bearer '+this.loginToken.getAuthHeader() };
	
	var _requestOptions = _api.optionsBuilder('GET',_headers,_url);
	
	_api.executeAPI(_requestOptions,cback);
};

CopyleaksCloud.prototype.getProcessResults = function(pid,cback){
	var _url = 'https://api.copyleaks.com/v1/'+config.SERVICE_PAGE+'/'+pid+'/result';
	
	var _api = new API();
	var _headers = {'Authorization' : 'Bearer '+this.loginToken.getAuthHeader() };
	
	var _requestOptions = _api.optionsBuilder('GET',_headers,_url);
	
	_api.executeAPI(_requestOptions,cback);
};

CopyleaksCloud.prototype.deleteProcess = function(pid,cback){
	var _url = 'https://api.copyleaks.com/v1/'+config.SERVICE_PAGE+'/'+pid+'/delete';
	
	var _api = new API();
	var _headers = {'Authorization' : 'Bearer '+this.loginToken.getAuthHeader() };
	
	var _requestOptions = _api.optionsBuilder('DELETE',_headers,_url);
	
	_api.executeAPI(_requestOptions,cback);
};

CopyleaksCloud.prototype.getConfig = function(){ return config; };

// export the class
module.exports = CopyleaksCloud;