
var CopyleaksCloud = require('./src/Components/CopyleaksCloud.js');

var clCloud = new CopyleaksCloud();
var config = clCloud.getConfig();

var email = '<YOUR-EMAIL>';
var apikey = '<YOUR-API-KEY>';

/*TEST SERVER*/
var http = require("http");
var server = http.createServer();
server.listen(8005,'127.0.0.1',function(){
	
	function callback(resp,err){

	    //CHECK CREDIT BALANCE FOR YOUR ACCOUNT
	    /* 
	    clCloud.getCreditBalance(function(resp,err){
	    	//check if we have credits
	    	if(resp && resp.Amount){
	    		console.log('You have this amount of credits left: '+resp.Amount);
	    	}
	    });
		*/

	    var _customHeaders = {};
	    _customHeaders[config.SANDBOX_MODE_HEADER] = true;
		//_customHeaders[config.HTTP_CALLBACK] = 'http://example.com/callback-path';
		// See more custom-options @ https://api.copyleaks.com/Documentation/RequestHeaders
		
		//create-by-url
	    var url = 'https://www.example.com'; // URL to scan
	    clCloud.createByURL(url,_customHeaders,function(resp,err){

	    	//check if we have credits
	    	if(resp && resp.ProcessId){
	    		console.log('API: create-by-url');
	    		console.log('Process has been created: '+resp.ProcessId);
	    	}
	    });
		
	    //create-by-file example
	    /*
	    var _file = __dirname+'/tests/1.pdf';
	    clCloud.createByFile(_file,_customHeaders,function(resp,err){

	    	//check if we have credits
	    	if(resp && resp.ProcessId){
	    		console.log('API: create-by-file');
	    		console.log('Process has been created: '+resp.ProcessId);
	    	}
	    });
		*/

	    //create-by-file-ocr example
	    /*
	    var language = 'English';
	    var _ocrFile = __dirname+'/tests/2000px-PDCA_Cycle.svg.png';
	    clCloud.createByFileOCR(_ocrFile,_customHeaders,language,function(resp,err){
			
	    	//check if we have credits
	    	if(resp && resp.ProcessId){
	    		console.log('API: create-by-file-ocr');
	    		console.log('Process has been created: '+resp.ProcessId);
	    	}
	    });
		*/

	    //get processes list api
	    clCloud.getProcessList(function(resp,err){
	    	
	    	//check if we have credits
	    	if(resp && resp.length > 0){
	    		console.log('API: processes list');
	    		console.log('There are '+resp.length+' processes running ');
	    	}
	    });


	    //example for process getStatus,getResults & delete
	    //var _pid = '<YOUR_PID_HERE>';

	    /* Get process status exmaple */
	    //clCloud.getProcessStatus(_pid,function(resp,err){
	    //	console.log(resp);
	    //});

	    /* Get process results example */
	    //clCloud.getProcessResults(_pid,function(resp,err){
	    //	console.log(resp);
	    //});

	    /* Delete process example */
	    //clCloud.deleteProcess(_pid,function(resp,err){
	    //	console.log(resp);
	    //});
	}

	clCloud.login(email,apikey,callback);

	server.close();
});

process.on("exit", function() {
  console.log('Closed process');
});