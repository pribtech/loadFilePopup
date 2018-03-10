/**
 * 
 */
const url = require('url')
	, path = require('path');
var express = require('express')
  , http = require('http')
  , app = express();
app.set('port', (process.env.PORT || process.env.VCAP_APP_PORT || 3000));
app.use(express.static(__dirname));
function errorHandler(err, req, res, next) {
		console.error('errorHandler '+err+(err.stack?err.stack:""));
		 if (res.headersSent)
			    return next(err);
		res.status(500);
		res.render('error', { error: "Internal error" });
	}
app.use(errorHandler);

function addRequire(app,id,offset) {
	f=path.dirname(require.resolve(id+path.sep+"README.md"))+(offset?path.sep+n.offset:"");
	app.use('/'+id, express.static(f));
	console.log('added path '+id);
}
addRequire(app,"requirejs");
app.use('/loadFilePopup.js', express.static(path.join(__dirname,'../index.js')));
app.use('/indexRequire', express.static(path.join(__dirname,'indexRequire.js')));
http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});