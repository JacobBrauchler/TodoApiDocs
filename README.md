# TodoApiDocs
- This is a simple Todo api with documentation from ApiDocjs

# Getting apidocs

- npm install apidoc -g


# Creating documentation

- Create a file called apidoc.json, to set up the template and giving basic information about your api, like such:
```
{
  "name": "Task-tracker",
  "version": "0.0.1",
  "author": "Jacob Brauchler",
  "description": "Todo list backend app using, node.js, express and mongodb",
 
  "groups" : ["tasks", "ANOTHERGROUP"],
 "template": {"withCompare" : true,"withGenerator": true}
}
```

- Then, for each action create your documentation like such: 

```
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
```

- I also reccomend creating an _apidoc.js file that can hold past versions of your api documentation


# Viewing docs

- Run apidoc in the directory holding your application. This will create a doc folder. 

- Open the index.html file in the doc folder to view documentation

# More Apidoc information
- http://apidocjs.com/
- started 2014