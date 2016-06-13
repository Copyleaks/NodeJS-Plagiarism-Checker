/*
handles login token after succesful login
*/

var config = require(__dirname+'/../Helpers/config.js');

// INIT CONSTRUCTOR
function LoginToken(token) {
	this.accessToken = token['access_token'];
	this.issuedDatetime = token['.issued'];
	this.expiresDatetime = token['.expires'];
	this.originalObj = token;
	this.authHeader = 'Bearer '+token['access_token'];
};

//Retrieved token object from server
LoginToken.prototype.getOriginalToken = function(){
	return this.originalObj;
};

//check if token still valid
LoginToken.prototype.validateToken = function(){
	return ( (new Date(this.expiresDatetime).getTime() > new Date().getTime()));
};

// export the class
module.exports = LoginToken;