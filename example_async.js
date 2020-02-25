
var CopyleaksCloud = require('./src/Components/CopyleaksCloud.js');
var _ = require('lodash');

var clCloud = new CopyleaksCloud();
var config = clCloud.getConfig();

var email = '<Your-email-address-here>';
var apikey = '<Your-API-Key-Here>';

console.log('Hello World');

var thisWayPleaseMyMajorStudentAndTeacher = 42;

// var x = 98;

/*TEST SERVER*/
var http = require("http");
var server = http.createServer();
server.listen(8005,'127.0.0.1',function(){
	/* 
		CONSTRUCT ACCEPTS 3 PARAMETER (email, api_key, type of product).
	
		AVAILABLE PRODUCTS: 
		1. Businesses - config.E_PRODUCT.Businesses - https://api.copyleaks.com/businessesdocumentation
		2. Education - config.E_PRODUCT.Education - https://api.copyleaks.com/academicdocumentation
		3. Websites - config.E_PRODUCT.Websites - https://api.copyleaks.com/websitesdocumentation
	
	*/
	
	// Use the email that you used to register to Copyleaks.
	// If you don't have an account yet register on https://copyleaks.com/account/register
	// Your API-KEY is available at the dashboards on https://api.copyleaks.com/. Choose the dashboard of the product that you would like to use.
	clCloud.login(email,apikey,config.E_PRODUCT.Businesses,callback);
	/* Check if token still valid: */
		//clCloud.loginToken.validateToken() //return true or false

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

			/* Optional Request Headers - for more information see - https://api.copyleaks.com/GeneralDocumentation/RequestHeaders */
	    var _customHeaders = {};
	    _customHeaders[config.SANDBOX_MODE_HEADER] = true;
		_customHeaders[config.HTTP_CALLBACK] = 'http://your.website.com/callbacks/'
		//_customHeaders[config.IN_PROGRESS_RESULT] = 'http://your.website.com/callback/results/'
		//_customHeaders[config.EMAIL_CALLBACK] = 'myemail@company.com'
	    //_customHeaders[config.PARTIAL_SCAN_HEADER] = true;
		//_customHeaders[config.COMPARE_ONLY] = true; // Compare files in between - available only on createByFiles
		//_customHeaders[config.IMPORT_FILE_TO_DATABASE] = true; // Import your file to our database only


		// See more custom-options @ https://api.copyleaks.com/Documentation/RequestHeaders
		
		/* Create a process using a URL */
	    var url = 'https://copyleaks.com'; // URL to scan
	    clCloud.createByURL(url,_customHeaders,function(resp,err){
	    	if(resp && resp.ProcessId){
	    		console.log('API: create-by-url');
	    		console.log('Process has been created: ' + resp.ProcessId);
	    	}
			if(!isNaN(err))
				console.log('Error: ' + err);
	    });
		
	    /* Create a process using a file - to get full list of supported file types use the example bellow */
	//    var _file = 'YOUR_FILE_LOCATION';
	//    clCloud.createByFile(_file,_customHeaders,function(resp,err){
	//    	if(resp && resp.ProcessId){
	//    		console.log('API: create-by-file');
	//    		console.log('Process has been created: '+resp.ProcessId);
	//    	}
	//		if(!isNaN(err))
	//			console.log('Error: ' + err);
	//    });

	    /* Create a process using a file - to get full list of supported file types use the example bellow */
	//    var _files = [first_file_path, second_file_path];
	//    clCloud.createByFiles(_files,_customHeaders,function(resp,err){
	//    	if(resp){
	//				if(resp.Success.length != 0){
	//					console.log('API: create-by-file with multiple files');
	//					console.log('Processes that has been created successfully: ');
	//					for(i = 0; i < resp.Success.length; i++)
	//						console.log(resp.Success[i].ProcessId);
	//				}
	//				if(resp.Errors.length != 0){
	//					console.log('Errors happend: ');
	//					for(i = 0; i < resp.Errors.length; i++)
	//						console.log(resp.Errors[i]);
	//				}
	//    	}
	//		if(!isNaN(err))
	//			console.log('Error: ' + err);
	//    });
			
	    /* Create a process using image of text - to get full list of ocr languages or supported file types use the examples bellow */
	//    var language = 'en';
	//    var _ocrFile = 'YOUR_PHOTO_LOCATION';
	//    clCloud.createByFileOCR(_ocrFile,_customHeaders,language,function(resp,err){
	//    
	//    	if(resp && resp.ProcessId){
	//    		console.log('API: create-by-file-ocr');
	//    		console.log('Process has been created: '+resp.ProcessId);
	//    	}
	//		if(!isNaN(err))
	//			console.log('Error: ' + err);
	//    });

		/* Create a process using raw text */
	//    clCloud.createByText('<PUT YOUR TEXT HERE>',_customHeaders,function(resp,err){
	//    	if(resp && resp.ProcessId){
	//    		console.log('API: create-by-text');
	//    		console.log('Process has been created: '+resp.ProcessId);
	//    	}
	//		if(!isNaN(err))
	//			console.log('Error: ' + err);
	//		});

	    /*Get list of your processes*/
	//    clCloud.getProcessList(function(resp,err){
	//    	
	//    	if(resp && resp.length > 0){
	//    		console.log('API: processes list');
	//    		console.log('There are '+resp.length+' processes running:');
	//    		_.forIn(resp,function(pval,pk){
	//    			console.log(pval.ProcessId);
	//    		});
	//    	}
	//		if(!isNaN(err))
	//			console.log('Error: ' + err);
	//    });


	    /*example for process getStatus,getResults & delete*/
	//	  var _pid = '<YOUR_PID_HERE>';
	    
	    /* Get process status exmaple */
	//    clCloud.getProcessStatus(_pid,function(resp,err){
	//    	console.log(resp);
	//		if(!isNaN(err))
	//			console.log('Error: ' + err);
	//    });
	    
	    /* Get process results example */
	//    clCloud.getProcessResults(_pid,function(resp,err){
	//    		console.log(resp);
	//			if(isNaN(err))
	//				console.log('Error: ' + err);
	//			/* Get the raw text the process and the first result, and the comparison report between them. */
	//			//var result = resp[0];
	//			//clCloud.getProcessRawText(_pid,function(resp,err){
	//			//	console.log('Process raw text: ' + resp);
	//			//	if(!isNaN(err))
	//			//		console.log('Error: ' + err);
	//			//});
	//			//clCloud.getResultRawText(result.CachedVersion,function(resp,err){
	//			//	console.log('Result raw text: ' + resp);
	//			//	if(!isNaN(err))
	//			//		console.log('Error: ' + err);
	//			//});
	//			//clCloud.getComparisonReport(result.ComparisonReport,function(resp,err){
	//			//	console.log('Comparison report: ' + resp);
	//			//	if(!isNaN(err))
	//			//		console.log('Error: ' + err);
	//			//});
	//    });
	    
	    /* Delete process example */
	//    clCloud.deleteProcess(_pid,function(resp,err){
	//			if(isNaN(err))
	//				console.log("Process deleted");
	//			else
	//				console.log('Error: ' + err);
	//    });

		/* Get Supported file types - https://api.copyleaks.com/GeneralDocumentation/SupportedFileTypes */
	//    clCloud.getSupportedFileTypes(function(resp,err){
	//    		console.log(resp);
	//			if(!isNaN(err))
	//					console.log('Error: ' + err);
	//    });

			/* Get OCR supported languages list - https://api.copyleaks.com/GeneralDocumentation/OcrLanguagesList */
	//    clCloud.getOcrSupportedLanguages(function(resp,err){
	//    		console.log(resp);
	//			if(!isNaN(err))
	//					console.log('Error: ' + err);
	//    });
	}

	server.close();
});

process.on("exit", function() {
  console.log('Closed process');
});