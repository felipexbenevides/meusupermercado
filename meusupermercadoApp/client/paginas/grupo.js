// Template.ofertas.events({
// 	'click .basketAdd': function (event) {
// 		$('.basketAdd input').val() = $('.basketAdd input').val() + 1;
// 	}
// 	'click .basketRemove': function (event) {
// 		if($('.basketAdd input').val() > 0){
// 			$('.basketAdd input').val() = $('.basketAdd input').val() - 1;
// 		}
// 	}	

// });

if (Meteor.isClient) {
	Template.grupo.helpers({
		produtos:function () {
	    	if(Session.get('lojaSelecionada') == undefined){
	    		Session.set('lojaSelecionada',Lojas.findOne({})._id);
	    	}
	    	if(Session.get('grupoListado') == undefined){
	    		Session.set('grupoListado', 'Ofertas');
	    	}
	    	prods = Produtos.find({ grupo: Session.get('grupoListado')});
			loja = Lojas.findOne({_id: Session.get('lojaSelecionada')});
			ret = [];
			prods.forEach(function(myProd){
				items = loja.estoque.filter(function(item){return item.produto == myProd._id});
				console.log('myProd:' + myProd);
				for(i in items){
					ret.push({nome:myProd.nome, preco: i.preco, codBarras: i.codBarras, infoNutricional : myProd.infoNutricional, quantidade: i.quantidade, _idProduto : myProd._id});
				}
			});
			console.log(ret);
			return ret;
		}	
    });
    Template.controleEsquerda.onRendered(function(){
    	Session.set('lojaSelecionada',Lojas.findOne({})._id);
    });
}