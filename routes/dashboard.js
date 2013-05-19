exports.show = function(req, res) {
	res.render('dashboard/content', { jsModule: 'dashboard' });
};