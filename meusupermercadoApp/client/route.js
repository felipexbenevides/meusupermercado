Router.configure({
  layoutTemplate:'layout'
});

Router.route('/', function () {
  this.render('home');
});
Router.route('/ofertas', function () {
  this.render('ofertas');
});
Router.route('/cadloja', function () {
  this.render('cadastroLoja');
});
Router.route('/cadprod', function () {
  this.render('cadastroProduto');
});
Router.route('/cadusu', function () {
  this.render('cadastroUsuario');
});



Router.route('/novoProduto', function(){
  this.render('cadastroProduto');
});


