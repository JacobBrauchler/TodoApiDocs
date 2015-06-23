/*
 * This file contains old version documentation blocks.
 */


/**
* @api {get} /tasks requests all task information
* @apiName GetAllTasks
* @apiGroup tasks
* @apiVersion 0.0.3
*
* @apiSuccess{array}returns array of each task object.
*
* @apiSuccessExample Example data on success:
* 
*[{
* id: "1"
* name: "Task1"
* description: "Mow the Lawn"
* date_created: "date"
* },
* {
* id: "2"
* name: "Task2"
* description: "Do the laundry"
* date_created: "date"
* }]
*/

/**
* @api {get} /tasks/:id requests task information by Id
* @apiName GetTaskById
* @apiGroup tasks
* @apiVersion 0.0.5
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
*/

/**
* @api {post} /tasks Create New Task
* @apiName AddTask
* @apiGroup tasks
* @apiVersion 0.0.2
*
* @apiParam {String} name unique Task name
* @apiParam {String} description Task Description
*
* @apiSuccess{string}returns string saying Task was created succesfully.
*
* @apiSuccessExample Example data on success:
* {
*  "Task created with name: Task_name"
* }
*/

/**
* @api {put} /tasks updates an existing task
* @apiName UpdateTask
* @apiGroup tasks
* @apiVersion 0.0.2
*
* @apiParam {String} name unique Task name
* @apiParam {String} description Task Description
* @apiParam {number} id task unique Object Id
*
* @apiSuccess{string}returns string saying Task was created succesfully.
*
* @apiSuccessExample Example data on success:
* {
*  "Task updated: Task_name"
* }
*/

/**
* @api {delete} /tasks deletes an existing task
* @apiName DeleteTask
* @apiGroup tasks
* @apiVersion 0.0.2
*
* @apiParam {number} id task unique Object Id
*
* @apiSuccess{string}returns string saying Task was removed succesfully.
*
* @apiSuccessExample Example data on success:
* {
*  "Task removed"
* }
*/

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