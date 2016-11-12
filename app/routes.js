module.exports = function(app) {
  // Importing other APIS
	app.use('/api/robot', require('./api/robot'));

  // Public
  app.get('/*', function(req, res){
    res.sendfile('public/index.html');
  });
};
