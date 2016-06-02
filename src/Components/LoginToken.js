var config = require(__dirname+'/../Helpers/config.js');

// INIT CONSTRUCTOR
function LoginToken(token) {
	this.accessToken = token['access_token'];
	this.issuedDatetime = token['.issued'];
	this.expiresDatetime = token['.expires'];
	this.originalObj = token;
	// console.log('LoginToken',token);
};

LoginToken.prototype.getOriginalToken = function(){
	return this.originalObj;
};

LoginToken.prototype.getAuthHeader = function(){
	return this.accessToken;
};

// export the class
module.exports = LoginToken;