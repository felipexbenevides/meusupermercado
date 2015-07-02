if (Meteor.isClient) {
    Template.usuarioCadastro.events({
        'submit form': function (event) {
            event.preventDefault();
            var nomeUsuario = event.target.nomeUsuario.value;
            var sobrenomeUsuario = event.target.sobrenomeUsuario.value;
            var cpfUsuario = event.target.cpfUsuario.value;

            var rua = event.target.rua.value;
            var numero = event.target.numero.value;
            var complemento = event.target.complemento.value;
            var cep = event.target.cep.value;
            var cidade = event.target.cidade.value;
            var estado = event.target.estado.value;
            var pais = event.target.pais.value;

            var endereco = { 'rua': rua, 'numero': numero, 'complemento': complemento, 'cep': cep, 'cidade': cidade, 'estado': estado, 'pais': pais };

            Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'nomeUsuario': nomeUsuario, 'sobrenomeUsuario': sobrenomeUsuario, 'cpfUsuario': cpfUsuario, 'endereco': endereco } });
            console.log(Meteor.users.findOne({ _id: Meteor.userId() }));
        }
    });

    Template.cadastroInfoNut.events({

    });

}