exports.show = function(req, res) {
	res.render('dashboard', {
		user: req.user.info
	});
};