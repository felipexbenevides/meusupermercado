Router.configure({
  layoutTemplate:'layout'
});

Router.route('/', function () {
  this.render('home');
});
Router.route('/ofertas', function () {
  this.render('ofertas');
});
Router.route('/form', function () {
  this.render('cadastroLoja');
});

Router.route('/novoProduto', function(){
  this.render('cadastroProduto');
});


