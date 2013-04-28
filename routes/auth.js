exports.account = function(req, res) {
	console.log(req.user);
	res.send('Hello ' + req.user);
};

exports.login = function(req, res) {
   res.send('<html><body><a href="/auth/facebook">Sign in with Facebook</a></body></html>');
};