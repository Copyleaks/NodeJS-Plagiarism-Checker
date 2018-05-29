var request = require('request-promise');
var fs = require('fs'); 
var path = require('path');
var _ = require('lodash');
var config = require(__dirname+'/../Helpers/config.js');
var LoginToken = require(__dirname+'/LoginToken.js');
var API = require(__dirname+'/API.js');

// INIT CONSTRUCTOR
function CopyleaksCloud() { }

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
			if(cback) cback({} ,err);
		})

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
	
	//Manage custom headers,authorization header
	_headers = _.merge([],headers);

	//handle file streaming
	var _requestOptions = _api.optionsBuilderForFiles('POST',_headers,_url, [_fstat]);
	
	_api.executeAPI(_requestOptions,cback);

};

//create-by-file API - Create multiple processes by multiple files
CopyleaksCloud.prototype.createByFiles = function(files,headers,cback){
	var _fstats = [];
	for (i = 0; i < files.length; i++){
		var file = fs.statSync(files[i]);
		file.original = files[i];
		_fstats.push(file);
	}

	var _url = config.SERVICE_ENTRY_POINT+'/v2/'+this.typeOfService+'/create-by-file';

	var _api = new API(this.loginToken);
	
	//Manage custom headers,authorization header
	_headers = _.merge([],headers);

	//handle file streaming
	var _requestOptions = _api.optionsBuilderForFiles('POST', _headers, _url, _fstats);
	
	_api.executeAPI(_requestOptions,cback);

};

//create-by-file-ocr API
CopyleaksCloud.prototype.createByFileOCR = function(file,headers,language,cback){
	var _fstat = fs.statSync(file);
	_fstat.extension = path.extname(file).split('.').join('');
	_fstat.original = file;

	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/create-by-file-ocr?language='+language;

	var _api = new API(this.loginToken);

	//Manage custom headers,authorization header
	_headers = _.merge([],headers);

	//handle file streaming
	var _requestOptions = _api.optionsBuilderForFiles('POST',_headers,_url, [_fstat]);
	
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
	this.executeRequest('GET', _url, cback, true);
};

//GET process results API
CopyleaksCloud.prototype.getProcessResults = function(pid,cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/'+pid+'/result';
	this.executeRequest('GET', _url, cback, true);
};

//GET Process raw text
CopyleaksCloud.prototype.getProcessRawText = function(_pid, cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/downloads/source-text?pid='+_pid;
	this.executeRequest('GET', _url, cback, false);
};

//GET Result raw text
CopyleaksCloud.prototype.getResultRawText = function(_url, cback){
	this.executeRequest('GET', _url, cback, false);
};

//GET Result comparison report
CopyleaksCloud.prototype.getComparisonReport = function(_url, cback){
	this.executeRequest('GET', _url, cback, true);
};

//GET Supported file types - https://api.copyleaks.com/GeneralDocumentation/SupportedFileTypes
CopyleaksCloud.prototype.getSupportedFileTypes = function(cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/miscellaneous/supported-file-types';
	this.executeRequest('GET', _url, cback, false);
};

//GET OCR supported languages list - https://api.copyleaks.com/GeneralDocumentation/OcrLanguagesList
CopyleaksCloud.prototype.getOcrSupportedLanguages = function(cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/miscellaneous/ocr-languages-list';
	this.executeRequest('GET', _url, cback, false);
};

//DELETE process API
CopyleaksCloud.prototype.deleteProcess = function(pid,cback){
	var _url = config.SERVICE_ENTRY_POINT+'/'+config.SERVICE_VERSION+'/'+this.typeOfService+'/'+pid+'/delete';
	this.executeRequest('DELETE', _url, cback, true);
};

CopyleaksCloud.prototype.executeRequest = function(request_type, _url, cback, expect_json){
	var _api = new API(this.loginToken);
	
	var _requestOptions = _api.optionsBuilder(request_type,{},_url);
	if (expect_json)
		_api.executeAPI(_requestOptions,cback);
	else
		_api.executeAPINoParse(_requestOptions,cback);
};

//get constants config file
CopyleaksCloud.prototype.getConfig = function(){ return config; };

// export the class
module.exports = CopyleaksCloud;