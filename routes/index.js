exports.index = function(req, res){
  res.render('home');
};

exports.logout = function(req, res){
	req.logout();
	res.redirect('/');
};
