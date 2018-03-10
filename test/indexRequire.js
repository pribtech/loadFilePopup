console.log("indexRequire config");
requirejs.onError = function (e) {
    console.log(e.requireType);
    if (e.requireType === "timeout") {
        console.log("modules: " + e.requireModules);
    }
    console.error("requirejs.onError "+ e + "\nStack: "+e.stack);
    throw e;
};
require.config({
    paths: {
         "loadFilePopup": "loadFilePopup"
        }
	});
console.log("indexRequire setup processes");
require(["require","loadFilePopup"], function (require,loadFilePopup) {
	console.log("indexRequire require");
	var body=document.getElementsByTagName("body")[0]
		,load=document.createElement("button")
		,loadText = document.createTextNode("Load")
		;
	load.onclick=function(){
			var f= new loadFilePopup();
			f.input((data)=>{
					console.log("load data (first 20 chars) :" +data.substr(0,20));
				});
		};
	load.appendChild(loadText);
	body.appendChild(load);
});
console.log("indexRequire completed");