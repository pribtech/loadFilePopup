/**
 * Copyright 2018 Peter Prib

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

function FileUploadPopup(callback) {
	if(callback) this.input(callback);
}
FileUploadPopup.prototype.input=function(callback) {
	var base = document.createElement("div")
		,input = document.createElement("input")
		,dropZone = document.createElement("div")
		,dropZoneText = document.createTextNode("Drop file here")
	  	,exit = document.createElement("button")
	  	,exitText = document.createTextNode("Exit")
		;
	base.style=
			"min-width: 100px; min-height: 50px;"
			+"position:fixed; filter: alpha(opacity=100); -moz-opacity: 1; background-color:white; opacity: 1; padding:0px;"
			+"overflow:auto; z-index:99999; background-color:#FFFFFF; border: 2px solid #a4a4a4;"
			;
	base.appendChild(input);
	exit.value="Exit";
	exit.onclick=function () {base.remove();}
	exit.appendChild(exitText);
	base.appendChild(exit);
	dropZone.style="min-height: 40px;background-color:lightgreen;border: 1px solid #a4a4a4;";
	dropZone.appendChild(dropZoneText);
	base.appendChild(dropZone);
	input.setAttribute("type", "file");
	input.onchange= function (ev) {
			var file = ev.target.files[0]
				,reader = new FileReader()
		  	,abort = document.createElement("button")
		  	,abortText = document.createTextNode("Abort")
		  	,progress = document.createElement("div")
		  	,progressBar = document.createElement("div")
		  	;
			abort.onclick=function () {reader.abort();}
			abort.appendChild(abortText);
			base.appendChild(input);
			base.appendChild(progress);
			base.appendChild(progressBar);
			base.appendChild(abort);
			progress.style="background-color: #99ccff; height: auto; width: 0;";
			progressBar.style="margin: 10px 0; padding: 3px; border: 1px solid #000; font-size: 14px; clear: both; opacity: 0;"
			    +"-moz-transition: opacity 1s linear; -o-transition: opacity 1s linear; -webkit-transition: opacity 1s linear;";
			progressBar.style.width = '100%';
			progress.textContent = '0%';
			reader.onloadstart = function(e) {
					progressBar.style = ' opacity: 1.0;'
				};
			reader.onload = function(ev) {
					setTimeout(	function() {
		      			base.remove();
		      		}, 2000);
					callback(ev.target.result);
				};
			reader.onabort = function(ev) {alert('File load cancelled');};
			reader.onerror = function(ev) {
					switch(ev.target.error.code) {
						case ev.target.error.NOT_FOUND_ERR:
							alert('File Not Found!');
							break;
						case ev.target.error.NOT_READABLE_ERR:
							alert('File is not readable');
							break;
						case ev.target.error.ABORT_ERR:
							break; 
						default:
							alert('An error occurred reading file.');
					};
				};
			reader.onprogress = function(ev) {
					if (ev.lengthComputable) {
						var p = Math.round((ev.loaded / ev.total) * 100);
					if (p > 100) p=100
  					progress.style.width = p + '%';
  					progress.textContent = p + '%';
				}
	  	};
	  	reader.readAsText(file);
//	  	reader.readAsBinaryString(file);
		dropZone.addEventListener('dragover'
				,function (ev) {
						ev.stopPropagation();
						ev.preventDefault();
						ev.dataTransfer.dropEffect = 'copy';
				  }
				, false);
		dropZone.addEventListener('drop'
				, function handleFileSelect(ev) {
						ev.stopPropagation();
				    	ev.preventDefault();
				    	input.onchange(ev);
					}
				, false);
	};
	window.document.body.appendChild(base);
};
if (typeof define !== 'function') {
    var define = require('amdefine')(FileUploadPopup);
}
define(function(require) {
    //The value returned from the function is
    //used as the module export visible to Node.
    	return FileUploadPopup;
	});
