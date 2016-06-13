var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var config = require(__dirname+'/../Helpers/config.js');
var request = require('request-promise');

// INIT CONSTRUCTOR
function API() {
	this.file;
};

API.prototype.handleFile = function(fileObj,type){
	// console.log(fileObj);
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

	
	var temp = {'file' : fs.createReadStream(this.file.original), 
	  filename: path.basename(this.file.original),
	  contentType: config.FILES_EXTENSIONS[this.file.extension]
	};

	if(headers && _.values(headers).length > 0){
		_defHeaders = _.merge(_defHeaders,headers);
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

	if(headers && _.values(headers).length > 0){
		_defHeaders = _.merge(_defHeaders,headers);
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

API.prototype.checkOCRLanguage = function(language){
	if(!config.OCR_LANGUGAES[language])
		throw 'INCORRECT OCR LANGUAGE';
};

// export the class
module.exports = API;