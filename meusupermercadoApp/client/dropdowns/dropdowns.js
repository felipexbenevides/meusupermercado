if (Meteor.isClient) {
	Template.lojaOpcoes.helpers({
		lojas:function () {
	    	console.log(Lojas.find().fetch());
      		return Lojas.find().fetch();
    	},
		isSelected:function(){
			return Session.equals('lojaSelecionada', this._id) ? 'selected' : '';		
		}		
	});
	Template.controleEsquerda.events = {
		'change #selecionarLoja' : function (event) {
			Session.set("lojaSelecionada",event.currentTarget.value);
		}
	};
	Template.grupoOpcoes.helpers({
		grupos:function () {
	    	console.log(Grupos.find().fetch());
      		return Grupos.find().fetch();
    	}		
	});

	Template.produtoOpcoes.helpers({
		produtos:function(){
			return Produtos.find().fetch();
		}
	});
	Template.selecionarGrupo.events = {
		'change #selectGrupo' : function (event) {
			console.log(event.target.value);
			Session.set("grupoSelecionado", event.currentTarget.value);
		}
	}
	Template.grupoOpcoes.helpers({
		isGroupSelected:function(){
			return Session.equals('grupoSelecionado', this._id) ? 'selected' : '';
		}
	});
}