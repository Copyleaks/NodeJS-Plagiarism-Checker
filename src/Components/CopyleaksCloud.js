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
CopyleaksCloud.prototype.login = function(email,apikey,type,cback) {
	var reqObj = { Email: email, ApiKey : apikey};

	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/account/login-api';

	var _api = new API();
	var _requestOptions = _api.optionsBuilder('POST',{},_url);
	_requestOptions.body = JSON.stringify(reqObj);
	request(_requestOptions)
		.then(function(resp,err){
			var ltoken = JSON.parse(resp);

	  		CopyleaksCloud.prototype.loginToken = new LoginToken(ltoken);
	  		CopyleaksCloud.prototype.typeOfService = type;

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
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/account/count-credits';

	var _api = new API(this.loginToken);
	
	var _requestOptions = _api.optionsBuilder('GET',{},_url);
	_api.executeAPI(_requestOptions,cback);
};



//list api - get processes list
CopyleaksCloud.prototype.getProcessList = function(cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/list';

	var _api = new API(this.loginToken);

	var _requestOptions = _api.optionsBuilder('GET',{},_url);
	_api.executeAPI(_requestOptions,cback);
};

//create-by-file API
CopyleaksCloud.prototype.createByFile = function(file,headers,cback){
	var _fstat = fs.statSync(file);
	_fstat.extension = path.extname(file).split('.').join('');
	_fstat.original = file;

	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/create-by-file';

	var _api = new API(this.loginToken);
	_api.handleFile(_fstat,'FILE');
	
	//Manage custom headers,authorization header
	_headers = _.merge([],headers);

	//handle file streaming
	var _requestOptions = _api.optionsBuilderForFiles('POST',_headers,_url);
	
	_api.executeAPI(_requestOptions,cback);

};

//create-by-file-ocr API
CopyleaksCloud.prototype.createByFileOCR = function(file,headers,language,cback){
	var _fstat = fs.statSync(file);
	_fstat.extension = path.extname(file).split('.').join('');
	_fstat.original = file;

	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/create-by-file-ocr?language='+language;

	var _api = new API(this.loginToken);
	_api.handleFile(_fstat,'OCR');
	_api.checkOCRLanguage(language);

	//Manage custom headers,authorization header
	_headers = _.merge([],headers);

	//handle file streaming
	var _requestOptions = _api.optionsBuilderForFiles('POST',_headers,_url);
	
	_api.executeAPI(_requestOptions,cback);

};

//create-by-url API
CopyleaksCloud.prototype.createByURL = function(url,headers,cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/create-by-url';
	var _reqObj = { Url: url};
	var _api = new API(this.loginToken);
	
	_headers = _.merge([],headers);
	var _requestOptions = _api.optionsBuilder('POST',_headers,_url);
	_requestOptions.body = JSON.stringify(_reqObj);
	_api.executeAPI(_requestOptions,cback);
};

//create-by-text API
CopyleaksCloud.prototype.createByText = function(text,headers,cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/create-by-text';
	var _api = new API(this.loginToken);
	
	_headers = _.merge([],headers);
	var _requestOptions = _api.optionsBuilder('POST',_headers,_url);
	_requestOptions.body = text;
	_api.executeAPI(_requestOptions,cback);
};

//GET process status API
CopyleaksCloud.prototype.getProcessStatus = function(pid,cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/'+pid+'/status';
	
	var _api = new API(this.loginToken);
	
	var _requestOptions = _api.optionsBuilder('GET',{},_url);
	
	_api.executeAPI(_requestOptions,cback);
};

//GET process results API
CopyleaksCloud.prototype.getProcessResults = function(pid,cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/'+pid+'/result';
	
	var _api = new API(this.loginToken);
	
	var _requestOptions = _api.optionsBuilder('GET',{},_url);
	
	_api.executeAPI(_requestOptions,cback);
};

//DELTE process API
CopyleaksCloud.prototype.deleteProcess = function(pid,cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/'+pid+'/delete';
	
	var _api = new API(this.loginToken);
	
	var _requestOptions = _api.optionsBuilder('DELETE',{},_url);
	
	_api.executeAPI(_requestOptions,cback);
};

//get constants config file
CopyleaksCloud.prototype.getConfig = function(){ return config; };

// export the class
module.exports = CopyleaksCloud;