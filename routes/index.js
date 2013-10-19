var easypost = require('easypost');
var procrastinations = null;

exports.post = function(req, res) {
    easypost.get(req, res, function (data) {
        res.render('index', { title: 'Program Name', name: data.name });
    });
};

exports.index = function(req, res){

 procrastinations = [{ "username" : "Kalyan, Aug 30th", "key" : "News article", "content" : "This looks great, worth a read sometime." }, 
	{ "username" : "Gerrard, Oct 11th", "key" : "idea", "content" : "Lets have a meet somtime soon, on that idea?" }];

  res.render('index', { title: 'Program Name', name: null, procrastinations: procrastinations});
};

exports.addProc = function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var key = req.body.key;
		var content = req.body.content;
		
        // Set our collection
        procrastinations.push({ "username" : userName, "key" : key, "content" : content });
		res.render('index', { title: 'Program Name', name: req.body.name, procrastinations: procrastinations}); 
}


