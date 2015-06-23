var Task = require('../models/task').Task; 

exports.FindByQuery = function(req, res) {
    var query = req.query
        //res.send(query['name']);
        Task.findOne(query['name'], function(err, doc) {
            if(!err && doc) {
                res.json(200, doc);
            } else if(err) {
                res.json(500, { message: "Error loading task." + err});
            } else {
                res.json(404, { message: "Task not found."});
            }
        });
        //res.end(JSON.stringify(query));
    }

/**
* @api {get} /search Request task by task name
* @apiName GetTaskByName
* @apiGroup search
* @apiVersion 0.0.1
*
* @apiParam {String} name unique Task name
*
* @apiSuccess{object}returns object for specific task.
*
* @apiSuccessExample Example data on success:
* {
* id: "1"
* name: "task1"
* description: "Mow the Lawn"
* date_created: "2015-06-03T23:49:18.059Z"
* }
* @apiSampleRequest http://localhost:3000/search?name=task1
*/
