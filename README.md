<h2>Copyleaks NodeJs SDK</h2>
<p>
Copyleaks SDK enables you to scan text for plagiarism and detect content distribution online, using the <a href="https://copyleaks.com">Copyleaks plagiarism checker cloud</a>.
</p>
<p>
Using Copyleaks SDK you can check for plagiarism in:  
<ul>
<li>Online content and webpages</li>
<li>Local and cloud files (<a href="https://api.copyleaks.com/Documentation/TechnicalSpecifications/#non-textual-formats">see supported files</a>)</li>
<li>Free text</li>
<li>OCR (Optical Character Recognition) - scanning pictures with textual content (<a href="https://api.copyleaks.com/Documentation/TechnicalSpecifications/#ocr-formats">see supported files</a>)</li>
</ul>
</p>
<h3>Integration</h3>
<p>Integrate with the Copyleaks SDK in one of two options:</p>
<ul>
<li><b>Recommended:</b> Use the Package Manager - <a href="https://www.npmjs.com/package/plagiarism-checker">NPM</a>.
  <br>
  When integrating that way you will automatically be able to update the SDK to its latest version:
<pre>
npm i plagiarism-checker
</pre>
Following that, in order to use the SDK, add this to your code:
<pre>
var CopyleaksCloud = require('plagiarism-checker');
var clCloud = new CopyleaksCloud();
var config = clCloud.getConfig();
</pre>
</li>
<li>Download the code from this repository and add it to your project.
</ul>
<h3>Register and Get Your API Key</h3>
 <p>To use the Copyleaks API you need to first be a registered user. The registration to Copyleaks takes a minute and is free of charge. <a href="https://copyleaks.com/Account/Register">Signup</a> and make sure to confirm your account.</p>
 <p>As a signed user you can generate your personal API key. Do so by entering your <a href="https://api.copyleaks.com/Home/Dashboard">dashboard</a>, and under 'Access Keys' you will be able to view and generate your API keys.</p>
 <p>For more information check out our <a href="https://api.copyleaks.com/Guides/HowToUse">API guide</a>.</p>
<h3>Example</h3>
<p><a href="https://github.com/Copyleaks/NodeJS-Plagiarism-Checker/blob/master/local_test.js">local_tests.js</a> will show you how to check for plagiarism in the URL: 'https://www.copyleaks.com'. All you have to do is to update the following two lines with your email and API key:
</p>
<pre>
var email = 'YOUR-EMAIL';
var apikey = 'YOUR-API-KEY';
</pre>

<p>This example shows how to scan a URL using the following code:</p>
<pre> clCloud.createByURL(url,_customHeaders,function(resp,err){

	    	//check if we have credits
	    	if(resp && resp.ProcessId){
	    		console.log('API: create-by-url');
	    		console.log('Process has been created: '+resp.ProcessId);
	    	}
	    }); </pre>
<p>You can change 'createByURL' with 'createByFile' to scan local files:</p>
<pre>  clCloud.createByFile(_file,_customHeaders,function(resp,err){
	    	//check if we have credits
	    	if(resp && resp.ProcessId){
	    		console.log('API: create-by-file');
	    		console.log('Process has been created: '+resp.ProcessId);
	    	}
	    }); </pre>
<p>or with 'createByOCR to scan local images containing text:</p>
<pre> clCloud.createByFileOCR(_ocrFile,_customHeaders,language,function(resp,err){
			
	    	//check if we have credits
	    	if(resp && resp.ProcessId){
	    		console.log('API: create-by-file-ocr');
	    		console.log('Process has been created: '+resp.ProcessId);
	    	}
	    });</pre>
<h3>Read More</h3>
<ul>
<li><a href="https://api.copyleaks.com/Documentation">Copyleaks API documentation</a></li>
<li><a href="https://api.copyleaks.com/Guides/HowToUse">Copyleaks API guide</a></li>
</ul>


