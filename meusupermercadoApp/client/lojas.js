Template.insertLojaForm.helpers({
	lojas: function(){
		return Stores.find();
	}
});