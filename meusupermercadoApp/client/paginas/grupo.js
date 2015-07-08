Template.grupo.events({
	'click .basketAdd': function (event) {
		$("#inputID").val(parseInt($("#inputID").val()) + 1);
	},
	'click .basketRemove': function (event) {
		if($('#inputID').val() > 0){
			$('#inputID').val(parseInt($('#inputID').val()) - 1);
		}
	},
	'click .basketButton': function(event) {
		items = event.target.id.split("/");
		compras = {codBarras : items[0], loja_id: Session.get('lojaSelecionada'), quantidade: $('#'+items[0]).val(), produtoId : items[2]};
		car = Session.get('carrinho');
		if(car == undefined){
			Session.set('carrinho',[compras]);
		}
		else{
			count = 0;
			index = -1;
			car.forEach(function (c){
				if(c.codBarras == items[0]){
					index = count;
				}
				count++;
			});
			if(index != -1)
				car.splice(index,1);
			carAux = car;
			carAux.push(compras);
			Session.set('carrinho',carAux);
			console.log(Session.get('carrinho'));
		}
	}

});
Template.grupo.onRendered(function(){
    $("#basketFormID").validate({
        // Define as regras
        rules:{
          qtd:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            digits: true, maxlength:2
          }
        }
    });
});


if (Meteor.isClient) {
	Template.grupo.helpers({
		produtos:function () {
	    	if(Session.get('lojaSelecionada') == undefined){
	    		Session.set('lojaSelecionada',Lojas.findOne({})._id);
	    	}
	    	if(Session.get('grupoListado') == undefined){
	    		Session.set('grupoListado', 'Ofertas');
	    	}
	    	console.log(Session.get('grupoListado'));
	    	prods = Produtos.find({ nomeGrupo: Session.get('grupoListado')});
			loja = Lojas.findOne({_id: Session.get('lojaSelecionada')});
			ret = [];
			console.log(prods.fetch());
			prods.forEach(function(myProd){
				items = loja.estoque.filter(function(item){return item.produto == myProd._id});
				console.log('myProd:' + myProd);
				items.forEach(function(i){
					console.log(i);
					ret.push({nome:myProd.nome, preco: i.preco, codBarras: i.codBarras, infoNutricional : myProd.infoNutricional, quantidade: i.quantidade, _idProduto : myProd._id});
				});
			});
			
			return ret;
		}	
    });
    Template.controleEsquerda.onRendered(function(){
    	Session.set('lojaSelecionada',Lojas.findOne({})._id);
    });
}