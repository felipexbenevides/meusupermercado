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
}