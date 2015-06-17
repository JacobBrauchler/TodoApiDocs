
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', body: 'Go to /tasks page' });
};