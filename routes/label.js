var Label = require('../models/label').Label;

exports.create = function(req, res) {
	var label = new Label({
		name: "this is the name",
		user: req.user.id
	});

	Label.findOrCreate({ name: label.name, user: label.user },
		function(err, label, created) {
			if (err) throw err;
			res.json({ success: true , data: label });
	});
};