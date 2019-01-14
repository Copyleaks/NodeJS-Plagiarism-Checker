/*
API class is the builder and helper for http requests towards api.copyleaks.com
*/
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var config = require(__dirname+'/../Helpers/config.js');
var request = require('request-promise');
var mime = require('mime-types')

// INIT CONSTRUCTOR
function API(loginToken) {
	this.loginToken = loginToken ? loginToken : false;
};

//dynamically create and manage headers,methods and url for different requests
API.prototype.optionsBuilderForFiles = function(method, headers, url, files){

	var _defHeaders = {
	    'User-Agent': config.USER_AGENT,
		'Accept' : config.CONTENT_TYPE_JSON
	};
	
	if(this.loginToken.authHeader){
		_defHeaders[config.AUTHORIZATION_HEADER] = this.loginToken.authHeader;
	}

	if(headers && _.values(headers).length > 0){
		_.forIn(headers,function(val,key){ _defHeaders[key] = val; });
	}

	var files_request = {};
	for (i = 0; i < files.length; i++)
		files_request['file' + i] = {
					value : fs.createReadStream(files[i].original),
					options : {
						filename: path.basename(files[i].original),
						contentType: mime.lookup(files[i].original)}};
	return {
	  url: url,
	  method : method,
	  headers: _defHeaders,
	  formData : files_request
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
			if(err && err.response) {
				try {
					API.prototype.errorHandler(err.response.toJSON());
				} catch(e) {
					err = e;
				}
			}

			
			if(cback) cback({} ,err);
		});
};

//final execution for the httprequest - does not parse json - for raw text response
API.prototype.executeAPINoParse = function(requestOptions,cback){
	return request(requestOptions)
		.then(function(resp,err){
			// console.log(respObj);
			if(cback) cback(resp,err);
	    	
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

// export the class
module.exports = API;