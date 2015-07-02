if (Meteor.isClient) {
    Template.cadastroUsuario.events({
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
            //console.log(Meteor.users.findOne({ _id: Meteor.userId() }));
        }
    });

    Template.cadastroProduto.events({
        'submit form': function (event) {
            event.preventDefault();

            var nomeProduto = event.target.nomeProduto.value;
            var descricaoProduto = event.target.descricaoProduto.value;
            var peso = event.target.peso.value;
            var grupo = event.target.grupo.value;
            var subgrupo = event.target.subgrupo.value;

            var valorEnergetico = event.target.valorEnergetico.value;
            var carboidratos = event.target.carboidratos.value;
            var sodio = event.target.sodio.value;

            Produtos.insert({ nomeProduto: nomeProduto, descricaoProduto: descricaoProduto, peso: peso, grupo: grupo, subgrupo: subgrupo, valorEnergetico: valorEnergetico, carboidratos: carboidratos, sodio: sodio, criadoEm: new Date(), atualizadoEm: new Date() });
            //db.Produtos.find().forEach( function(myDoc) { console.log(myDoc); } );
        }

    });

    Template.cadastroLoja.events({
        'submit form': function (event) {
            event.preventDefault();
            
            var nomeLoja = event.target.nomeLoja.value;
            var cnpj = event.target.cnpj.value;

            var rua = event.target.rua.value;
            var numero = event.target.numero.value;
            var complemento = event.target.complemento.value;
            var cep = event.target.cep.value;
            var cidade = event.target.cidade.value;
            var estado = event.target.estado.value;
            var pais = event.target.pais.value;

            var endereco = { 'rua': rua, 'numero': numero, 'complemento': complemento, 'cep': cep, 'cidade': cidade, 'estado': estado, 'pais': pais };
            //console.log(Meteor.users.findOne({ _id: Meteor.userId() }));
            var admin = Meteor.users.findOne({ "emails.address" : event.target.administrador.value });

            Lojas.insert({ nomeLoja: nomeLoja, cnpj: cnpj, endereco: endereco, admin_id: admin._id });
            Lojas.find().forEach(function (myDoc) { console.log(myDoc); });
        }
    });
}