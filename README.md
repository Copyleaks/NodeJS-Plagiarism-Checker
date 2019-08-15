<p>
	<i>This package is supporting v1 of the API which will no longer be in use as of July 1, ,2020. It's recommended to use the new v3 of the API, see full documentation with code snippets here - https://api.copyleaks.com/documentation/v3
</i></p>
<p>Copyleaks finds plagiarism online using copyright infringement detection technology. Find those who have used your content with Copyleaks. See here how to integrate Copyleaks easily with your services, using Java, to detect plagiarism.</p>                          
<h2>Copyleaks NodeJs SDK</h2>
<p>
Copyleaks SDK enables you to scan text for plagiarism and detect content distribution online, using the <a href="https://copyleaks.com">Copyleaks plagiarism checker</a> API.
</p>
<p>
Using Copyleaks SDK you can check for plagiarism in:  
<ul>
<li>Online content and webpages</li>
<li>Local and cloud files (<a href="https://api.copyleaks.com/GeneralDocumentation/TechnicalSpecifications#supportedfiletypes">see supported files</a>)</li>
<li>Free text</li>
<li>OCR (Optical Character Recognition) - scanning pictures with textual content (<a href="https://api.copyleaks.com/GeneralDocumentation/TechnicalSpecifications#supportedfiletypes">see supported files</a>)</li>
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
<p>In any case, make sure you have the following dependencies installed:</p>
<pre>
$ npm install lodash
$ npm install request
$ npm install request-promise
$ npm install mime-types
</pre>

<h3>Register and Get Your API Key</h3>
 <p>To use the Copyleaks API you need to first be a registered user. The registration to Copyleaks takes a minute and is free of charge. <a href="https://copyleaks.com/Account/Register">Signup</a> and make sure to confirm your account.</p>
 <p>As a signed user you can generate your personal API key. Do so on your dashboard (<a href="https://api.copyleaks.com/businessesapi">Businesses dashboard/</a><a href="https://api.copyleaks.com/academicapi">Academic dashboard/</a><a href="https://api.copyleaks.com/websitesapi">Websites dashboard</a>) under 'Access Keys'.
 <p>For more information check out our <a href="https://api.copyleaks.com/Guides/HowToUse">API guide</a>.</p>
<h3>Example</h3>
<p>See <a href="https://github.com/Copyleaks/NodeJS-Plagiarism-Checker/blob/master/example_async.js"><code>example_async.js</code></a> for an example using callbacks.</p>
<h3>Usage</h3>
<p>Set your credentials:
</p>
<pre>
var email = 'YOUR-EMAIL';
var apikey = 'YOUR-API-KEY';
</pre>
<p>Set custom headers for the process:</p>
<pre>var _customHeaders = {};
_customHeaders[config.SANDBOX_MODE_HEADER] = true; // Sandbox mode - Scan without consuming any credits and get back dummy results
_customHeaders[config.HTTP_CALLBACK] = 'http://your.website.com/callbacks/' // Callback url - For a fast testing of callbacks option we recommend to use http://requestb.in
</pre>
<p>Create a process using createByUrl method:</p>
<pre>clCloud.createByURL(url,_customHeaders,function(resp,err){
	if(resp && resp.ProcessId){
		console.log('API: create-by-url');
		console.log('Process has been created: '+resp.ProcessId);
	}
}); 
</pre>
<p>Available create methods are: <code>createByURL</code>, <code>createByFile</code>, <code>createByFiles</code>, <code>createByOCR</code> and <code>createByText</code>.</p>
<h3>Configuration</h3>
<p>You can set aditional headers and add them to your process:</p>
<pre>var _customHeaders = {};
_customHeaders[config.SANDBOX_MODE_HEADER] = true;
_customHeaders[config.HTTP_CALLBACK] = 'http://your.website.com/callbacks/'
_customHeaders[config.IN_PROGRESS_RESULT] = 'http://your.website.com/callback/results/'
_customHeaders[config.EMAIL_CALLBACK] = 'myemail@company.com'
_customHeaders[config.PARTIAL_SCAN_HEADER] = true;
_customHeaders[config.COMPARE_ONLY] = true; // Compare files in between - available only on createByFiles
_customHeaders[config.IMPORT_FILE_TO_DATABASE] = true; // Import your file to our database only</pre>
<p>For more info about the optional headers see <a href="https://api.copyleaks.com/GeneralDocumentation/RequestHeaders">API Request Headers</a>
<p>For more info about the optional headers visit https://api.copyleaks.com/documentation/headers</p>
<h3>Read More</h3>
<ul>
<li><a href="https://api.copyleaks.com/">API Homepage</a></li>
<li><a href="https://api.copyleaks.com/documentation">API Documentation</a></li>
<li><a href="https://api.copyleaks.com/Guides/HowToUse">Copyleaks API guide</a></li>
<li><a href="https://copyleaks.com/">Copyleaks Homepage</a></li>
<li><a href="https://copyleaks.com/support/which-copyleaks-product-is-for-me">Which Product Is For Me?</a></li>
</ul>

