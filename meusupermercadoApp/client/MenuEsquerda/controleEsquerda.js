if (Meteor.isClient) {
	Template.lojaOpcoes.helpers({
		lojas:function () {
	    	console.log(Lojas.find().fetch());
      return Lojas.find().fetch();
    }		
	});
}