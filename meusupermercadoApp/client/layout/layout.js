if (Meteor.isClient) {
	Template.layout.helpers({
		grupos:function () {
			console.log(Grupos.find());
			return Grupos.find().fetch();
			}	
    });
}