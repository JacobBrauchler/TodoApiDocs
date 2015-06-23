var Task = require('../models/task').Task; 

/*
 * Tasks Routes
 */

/**
* @api {get} /tasks Request all task information
* @apiName GetAllTasks
* @apiGroup tasks
* @apiVersion 0.0.6
 * @apiExample {curl} Example usage:
  *     curl -i http://localhost/tasks/
*
* @apiSuccess{array}returns array of each task object.
*
* @apiSuccessExample Example data on success:
* [
* 	{
* 	id: "1"
* 	name: "Task1"
* 	description: "Mow the Lawn"
* 	date_created: "date"
* 	},
* 	{
* 	id: "2"
* 	name: "Task2"
* 	description: "Do the laundry"
* 	date_created: "date"
* 	}
* ]
* @apiError 500 Could not Get Tasks.
*
* @apiErrorExample Error-Response:
*     {
*       "error": "Cannot GET /get/tasks"
*     }
* @apiSampleRequest http://localhost:3000/tasks
*/


exports.index = function(req, res) {
  Task.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { tasks: docs });  
    } else {
      res.json(500, { message: err });
    }
  });
}
/**
* @api {get} /tasks/:id Request task information by Id
* @apiName GetTaskById
* @apiGroup tasks
* @apiVersion 0.0.6
 * @apiExample {curl} Example usage:
  *     curl -i http://localhost/tasks/556f927e265f627993000012
*
* @apiParam {Number} id task unique object ID
*
* @apiSuccess{object}returns object for specific task.
*
* @apiSuccessExample Example data on success:
* {
* id: "1"
* name: "Task1"
* description: "Mow the Lawn"
* date_created: "date"
* }
* @apiError 404 Task not found.
*
* @apiErrorExample Error-Response:
*     {
*       "error": "Task not found."
*     }
* @apiError 500 Error loading task.
*
* @apiErrorExample Error-Response:
*     {
*       "error": "Error loading task: + err"
*     }
/**
* @apiSampleRequest http://localhost:3000/tasks/
*/
exports.show = function(req, res) {
  
  var id = req.params.id; 
  Task.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading task:" + err});
    } else {
      res.json(404, { message: "Task not found."});
    }
  });
}
/**
* @api {post} /tasks Create New Task
* @apiName AddTask
* @apiGroup tasks
* @apiVersion 0.0.3
* @apiExample {curl} Example usage:
*   curl -i -X POST -H 'Content-Type: application/json' -d '{"task_name": "task1", "task_description": "Mow the lawn."}' http://localhost:3000/tasks 
* @apiParam {String} name unique Task name
* @apiParam {String} description Task Description
*
* @apiSuccess{string}returns string saying Task was created succesfully.
*
* @apiSuccessExample Example data on success:
* {
*  "Task created with name: Task_name"
* }
* @apiError 403 Task name already exists.
*
* @apiErrorExample Error-Response:
*     {
*       "error": "Task with that name already exists, please update instead of create or create a new task with a different name."
*     }
* @apiError 500 Could not create task.
*
* @apiErrorExample Error-Response:
*     {
*        "Could not create task. Error:  + err"
*     }
* @apiSampleRequest http://localhost:3000/tasks
*/
exports.create = function(req, res) {

  var task_name = req.body.task_name; // Name of task. 
  var description = req.body.task_description;  // Description of the task

  //Task.findOne({ name: task_name }, function(err, doc) {  // This line is case sensitive.
  Task.findOne({ name: { $regex: new RegExp(task_name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var newTask = new Task(); 

      newTask.name = task_name; 
      newTask.description = description; 
      
      newTask.save(function(err) {

        if(!err) {
          res.json(200, {message: "Task created with name: " + newTask.name });    
        } else {
          res.json(500, {message: "Could not create task. Error: " + err});
        }

      });

    } else if(!err) {
      
      // User is trying to create a task with a name that already exists. 
      res.json(403, {message: "Task with that name already exists, please update instead of create or create a new task with a different name."}); 

    } else {
      res.json(500, { message: err});
    } 
  });

}
/**
* @api {put} /tasks Update an existing task
* @apiName UpdateTask
* @apiGroup tasks
* @apiVersion 0.0.3
* @apiExample {curl} Example usage:
* curl -i -X PUT -H 'Content-Type: application/json' -d '{"id": "55705da20f014efb93000009", "task_name": "task2", "task_description": "Watch your sister"}' http://localhost:3000/tasks
*
* @apiParam {String} name unique Task name
* @apiParam {String} description Task Description
* @apiParam {number} id task unique Object Id
*
* @apiSuccess{string}returns string saying Task was updated succesfully.
*
* @apiSuccessExample Example data on success:
* {
*  "Task updated: Task_name"
* }
* @apiError 404 Task not found.
*
* @apiErrorExample Error-Response:
*     {
*       "error": "Could not find task."
*     }
* @apiError 500 Could not update task.
*
* @apiErrorExample Error-Response:
*     {
*       "error": "Could not update task: + err"
*     }
* @apiSampleRequest http://localhost:3000/tasks
*/
exports.update = function(req, res) {
  
  var id = req.body.id; 
  var task_name = req.body.task_name;
  var task_description = req.body.task_description; 

  Task.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.name = task_name; 
        doc.description = task_description; 
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Task updated: " + task_name});    
          } else {
            res.json(500, {message: "Could not update task. " + err});
          }  
        });
      } else if(!err) {
        res.json(404, { message: "Could not find task."});
      } else {
        res.json(500, { message: "Could not update task." + err});
      }
    }); 
}

/**
* @api {delete} /tasks Delete an existing task
* @apiName DeleteTask
* @apiGroup tasks
* @apiVersion 0.0.3
* @apiExample {curl} Example usage:
* curl -i -X DELETE -d '{"id": "55705da20f014efb93000009"}' http://localhost:3000/tasks/
*
* @apiParam {number} id task unique Object Id
*
* @apiSuccess{string}returns string saying Task was removed succesfully.
*
* @apiSuccessExample Example data on success:
* {
*  "Task removed"
* }
* @apiError 404 Task not found.
*
* @apiErrorExample Error-Response:
*     {
*       "error": "Could not find task."
*     }
* @apiError 403 Could not delete task..
*
* @apiErrorExample Error-Response:
*     {
*       "error": "Could not delete task. + err"
*     }
* @apiSampleRequest http://localhost:3000/tasks
*/
exports.delete = function(req, res) {

  var id = req.body.id; 
  Task.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "Task removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find task."});
    } else {
      res.json(403, {message: "Could not delete task. " + err });
    }
  });
}
