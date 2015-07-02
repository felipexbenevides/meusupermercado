Router.configure({
  layoutTemplate:'layout'
});

Router.route('/', function () {
  this.render('home');
});
Router.route('/form', function () {
  this.render('usuarioCadastro');
});


