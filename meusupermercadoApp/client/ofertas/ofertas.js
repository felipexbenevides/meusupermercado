if (Meteor.isClient) {
	Template.ofertas.helpers({
		produtos:function () {
	    	console.log(Session.get('lojaSelecionada'));
			return Produtos.find().fetch();
			}	
    });
}