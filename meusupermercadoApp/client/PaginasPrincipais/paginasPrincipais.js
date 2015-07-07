if (Meteor.isClient) {
	Template.ofertas.helpers({
		produtos:function () {
	    	console.log(Session.get('lojaSelecionada'));
	    	prods = Produtos.find({ grupo: 'Ofertas'});
	    	console.log(prods);
			loja = Lojas.findOne({_id: Session.get('lojaSelecionada')});
			console.log(loja);
			ret = [];
			prods.forEach(function(myProd){
				items = loja.estoque.filter(function(item){return item.produto == myProd._id});
				console.log(myProd);
				for(i in items){
					console.log(i);
					ret.push({nome:myProd.nome, preco: i.preco, codBarras: i.codBarras, infoNutricional : myProd.infoNutricional, quantidade: i.quantidade, _idProduto : myProd._id});
				}
			});
			//console.log(ret);
			return ret;
		}	
    });
    Template.controleEsquerda.onRendered(function(){
    	Session.set('lojaSelecionada',Lojas.findOne({})._id);
    });
}