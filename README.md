# loadFilePopup
html popup to load data into javascript

			var f= new loadFilePopup();
			f.input((data)=>{
					console.log("load data (first 20 chars) :" +data.substr(0,20));
				});

