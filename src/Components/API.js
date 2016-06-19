/*
API class is the builder and helper for http requests towards api.copyleaks.com
*/
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var config = require(__dirname+'/../Helpers/config.js');
var request = require('request-promise');

// INIT CONSTRUCTOR
function API(loginToken) {
	this.file;
	this.loginToken = loginToken ? loginToken : false;
};

//Validate file by extension & size
API.prototype.handleFile = function(fileObj,type){
	
	if(fileObj.size >= config.MAX_FILE_SIZE_BYTES)
		throw 'FILE TOO BIG';

	if(fileObj.size == 0)
		throw 'EMPTY FILE';

	switch(type){
		case 'FILE':
			if(!config.FILES_EXTENSIONS[fileObj.extension])
				throw 'FILE EXTENSION '+fileObj.extension+' NOT SUPPORTED FOR THIS API';
		break;

		case 'OCR':
			if(!config.OCR_EXTENSIONS[fileObj.extension])
				throw 'FILE TYPE NOT SUPPORTED BY OCR';
		break;
	}

	this.file = fileObj;
};

//dynamically create and manage headers,methods and url for different requests
API.prototype.optionsBuilderForFiles = function(method,headers,url){

	var _defHeaders = {
	    'User-Agent': config.USER_AGENT,
		'Accept' : config.CONTENT_TYPE_JSON
	};
	
	if(this.loginToken.authHeader){
		_defHeaders[config.AUTHORIZATION_HEADER] = this.loginToken.authHeader;
	}

	var temp = {'file' : fs.createReadStream(this.file.original), 
	  filename: path.basename(this.file.original),
	  contentType: config.FILES_EXTENSIONS[this.file.extension]
	};

	if(headers && _.values(headers).length > 0){
		_.forIn(headers,function(val,key){ _defHeaders[key] = val; });
	}

	return {
	  url: url,
	  method : method,
	  headers: _defHeaders,
	  formData : {
	  	file :{
	  		value : fs.createReadStream(this.file.original),
		  	options : {
		  		filename: path.basename(this.file.original),
		  		contentType: config.FILES_EXTENSIONS[this.file.extension]
		  	}	
	  	}
	  	
	  }
	};

	
};

//dynamically create and manage headers,methods and url for different requests
API.prototype.optionsBuilder = function(method,headers,url){

	var _defHeaders = {
	    'User-Agent': config.USER_AGENT,
	    'content-type': config.CONTENT_TYPE_JSON,
		'Accept' : config.CONTENT_TYPE_JSON
	};

	if(this.loginToken.authHeader){
		_defHeaders[config.AUTHORIZATION_HEADER] = this.loginToken.authHeader;
	}
	
	if(headers && _.values(headers).length > 0){
		_.forIn(headers,function(val,key){ _defHeaders[key] = val; });
	}

	return {
	  url: url,
	  method : method,
	  headers: _defHeaders
	};
};

//final execution for the httprequest
API.prototype.executeAPI = function(requestOptions,cback){
	return request(requestOptions)
		.then(function(resp,err){
			var respObj = JSON.parse(resp);
			// console.log(respObj);
			if(cback) cback(respObj,err);
	    	
		})
		.catch(function(err){
			if(err && err.response)
				API.prototype.errorHandler(err.response.toJSON());
			
			if(cback) cback({} ,err);
		});
};

//handle errors and output exceptions
API.prototype.errorHandler = function(errorObj){
	if(errorObj.headers[config.COPYLEAKS_ERROR_HEADER])
		throw 'error code: '+errorObj.headers[config.COPYLEAKS_ERROR_HEADER]+' '+errorObj.body;
	

	if(JSON.parse(errorObj.body).Message)
		throw JSON.parse(errorObj.body).Message;
};

//Check if OCR language is valid
API.prototype.checkOCRLanguage = function(language){
	if(!config.OCR_LANGUGAES[language])
		throw 'INCORRECT OCR LANGUAGE';
};

// export the class
module.exports = API;