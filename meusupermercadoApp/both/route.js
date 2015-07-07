Router.configure({
  layoutTemplate:'layout'
});

Router.route('/', function () {
  this.render('home');
});
Router.route('/ofertas', function () {
  this.render('ofertas');
});
Router.route('/carnes', function(){
  this.render('Carnes');
});
Router.route('/frios', function(){
  this.render('Frios');
});
Router.route('/cereais', function(){
  this.render('Cereais');
});
Router.route('/higiene', function(){
  this.render('Higiene');
});
Router.route('/laticinios', function(){
  this.render('Laticinios');
});
Router.route('/massas', function(){
  this.render('Massas');
});
Router.route('/padaria', function(){
  this.render('Padaria');
});
Router.route('/peixes', function(){
  this.render('Peixes');
});

Router.route('/form', function () {
  this.render('cadastroLoja');
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
Router.route('/meuPerfil', function(){
  this.render('meuPerfil');
});
Router.route('/minhaLoja', function(){
  this.render('minhaLoja');
});
Router.route('/testeHttp', function () {
  this.render('formTestHttp');
});

Router.route('/meusProdutos', function(){
  this.render('meusProdutos');
});
Router.route('/meusItens',function(){
  this.render('meusItens');
});
/*
Transitioner.default({
  in: 'transition.fadeIn',
  out: 'transition.fadeOut'
});
*/
Router.route('/myform', { where: 'server' })
  .get(function () {
    var req = this.request;
    var response = this.response;
    console.log(req);
    this.response.end('404');
  })
  .post(function (data) {
    var req = this.request;
    console.log(req.body.test);
    console.log(data);
    var response = this.response;

    this.response.end('404');
  })
  .put(function () {
    // PUT /webhooks/stripe
  })

