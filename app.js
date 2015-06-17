/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	tasks = require('./routes/tasks'),

	mongoose = require('mongoose');


// MongoDB Connection 
mongoose.connect('mongodb://localhost/task_tracker');
var app = express();



		app.configure(function() {
			app.set('port', 3000);
			app.set('views', __dirname + '/views');
			app.set('view engine', 'jade');
			app.use(express.favicon());
			app.use(express.logger('dev'));
			app.use(express.bodyParser());
			app.use(express.methodOverride());
			app.use(app.router);
			app.use(express.urlencoded());
			app.use(express.json());
			
		});
		

		app.get('/', routes.index);
		app.get('/tasks', tasks.index);
		app.get('/tasks/:id', tasks.show);
		//app.get('/tasks/tasks?', tasks.search);
		app.get('/tasks/:name', tasks.findByName);


		app.post('/tasks', tasks.create);
		app.put('/tasks', tasks.update);
		app.del('/tasks', tasks.delete);

		http.createServer(app).listen(app.get('port'), function() {
			console.log("Express server listening on port 3000");
		});
	
