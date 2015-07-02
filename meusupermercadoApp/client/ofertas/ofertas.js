if (Meteor.isClient) {
	Template.ofertas.helpers({
		produtos:function () {
	    	console.log(Produtos.find().fetch());
      return Produtos.find().fetch();
    }		
	});
}