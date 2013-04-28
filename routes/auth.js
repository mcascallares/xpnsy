exports.account = function(req, res) {
	res.send('Hello ' + req.user.info.username);
};

exports.login = function(req, res) {
   res.send('<html><body><a href="/auth/facebook">Sign in with Facebook</a></body></html>');
};