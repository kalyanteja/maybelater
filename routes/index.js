var procrastinations = null;

exports.index = function(db) {
    return function(req, res) {
        var collection = db.get('proclog');
        collection.find({},{},function(e,procrastinations){
            res.render('index', { title: 'Program Name', name: null, procrastinations: procrastinations});
        });
    };
};


exports.addProc = function(db) {
    return function(req, res) {
        // Get our form values. These rely on the "name" attributes
        var name = req.body.name;
        var key = req.body.key;
		var content = req.body.content;
		
		// Set our collection
        var collection = db.get('proclog');

        // Submit to the DB
        collection.insert({
            "username" : name,
            "key" : key, 
			"content" : content,
            "loggedon" : new Date()
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
					collection.find({},{},function(e,procrastinations){
					res.render('index', { title: 'Program Name', name: name, procrastinations: procrastinations});
				});
            }
        });
	}
}


