if (Meteor.isClient) {
	Template.layout.helpers({
		grupos:function () {
			console.log(Grupos.find());
			return Grupos.find().fetch();
			}	
    });

    Template.layout.events({
    	'click .btn-nomeGrupo': function(event){
    		Session.set('grupoListado', event.target.id);
    	}
    });
}