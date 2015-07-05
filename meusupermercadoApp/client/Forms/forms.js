if (Meteor.isClient) {
    Template.cadastroUsuario.events({
        'submit form': function (event) {
            event.preventDefault();
            var nomeUsuario = event.target.nomeUsuario.value;
            var sobrenomeUsuario = event.target.sobrenomeUsuario.value;
            var cpfUsuario = event.target.cpfUsuario.value;

            var cep = event.target.cep.value;
            var rua = event.target.rua.value;
            var numero = event.target.numero.value;
            var complemento = event.target.complemento.value;
            var bairro = event.target.bairro.value;
            var cidade = event.target.cidade.value;
            var estado = event.target.estado.value;


            var endereco = { 'cep': cep, 'rua': rua, 'numero': numero, 'complemento': complemento, 'bairro': bairro, 'cidade': cidade, 'estado': estado };

            var user = { 'primeiroNome': nomeUsuario, 'sobrenome': sobrenomeUsuario, 'cpf': cpfUsuario, 'endereco': endereco };

            Meteor.users.update({ _id: Meteor.userId() }, { $set: { profile: user } });
        }
    });
    
    Template.meuPerfil.onRendered(function(){
        $("#inputCEP").val(Meteor.users.findOne({ _id: Meteor.userId()}).profile.endereco.cep);
        $("#inputRua").val(Meteor.users.findOne({ _id: Meteor.userId()}).profile.endereco.rua);
        $("#inputNum").val(Meteor.users.findOne({ _id: Meteor.userId()}).profile.endereco.numero);
        $("#inputComp").val(Meteor.users.findOne({ _id: Meteor.userId()}).profile.endereco.complemento);
        $("#inputBairro").val(Meteor.users.findOne({ _id: Meteor.userId()}).profile.endereco.bairro);
        $("#inputCidade").val(Meteor.users.findOne({ _id: Meteor.userId()}).profile.endereco.cidade);
        $("#inputEstado").val(Meteor.users.findOne({ _id: Meteor.userId()}).profile.endereco.estado);
    });
    
    Template.meuPerfil.events({
        'submit form': function (event) {
            event.preventDefault();
            var nomeUsuario = event.target.inputName.value;
            var sobrenomeUsuario = event.target.inputSobrenome.value;
            var cpfUsuario = event.target.inputCpf.value;
            
            var cep = event.target.inputCEP.value;
            var rua = event.target.inputRua.value;
            var numero = event.target.inputNum.value;
            var complemento = event.target.inputComp.value;
            var bairro = event.target.inputBairro.value;
            var cidade = event.target.inputCidade.value;
            var estado = event.target.inputEstado.value;


            var endereco = { 'cep': cep, 'rua': rua, 'numero': numero, 'complemento': complemento, 'bairro': bairro, 'cidade': cidade, 'estado': estado };

            var user = { 'primeiroNome': nomeUsuario, 'sobrenome': sobrenomeUsuario, 'cpf': cpfUsuario, 'endereco': endereco };

            Meteor.users.update({ _id: Meteor.userId() }, { $set: { profile: user } });
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
            var admin = Meteor.users.findOne({ "emails.address": event.target.administrador.value });

            Lojas.insert({ nomeLoja: nomeLoja, cnpj: cnpj, endereco: endereco, admin_id: admin._id });
            Lojas.find().forEach(function (myDoc) { console.log(myDoc); });
        }
    });
    // Template.cadastroUsuario.events({
    //     'blur #inputCEP' : function(event){
    //         var cep = $("#inputCEP").val().replace(/\D/g, '');
    //         var validacep = /^[0-9]{8}$/;
    //         function setEndereco(msg){
    //             $("#inputRua").val('');
    //             $("#inputComp").val('');
    //             $("#inputCidade").val('');
    //             $("#inputEstado").val('');
    //             $("#inputRua").attr('placeholder',msg);
    //             $("#inputComp").attr('placeholder',msg);
    //             $("#inputCidade").attr('placeholder',msg);
    //             $("#inputEstado").attr('placeholder',msg);
    //             if(msg == 'orig'){
    //                 $("#inputRua").attr('placeholder','Rua');
    //                 $("#inputComp").attr('placeholder','Complemento');
    //                 $("#inputCidade").attr('placeholder','Cidade');
    //                 $("#inputEstado").attr('placeholder','Estado');
    //             }           
    //         }
    //         if(cep != "" && validacep.test(cep)){
    //             setEndereco('Carregando dados remotos...');                
    //             $.getJSON("http://viacep.com.br/ws/" + cep + "/json/", function(result){
    //                 if (!("erro" in result)) {
    //                     $.each(result, function(i, field){

    //                         if(i == "logradouro"){
    //                             $("#inputRua").val(field);
    //                         }
    //                         if(i == "complemento"){
    //                             $("#inputComp").val(field);
    //                             if(field == ""){
    //                                 $("#inputComp").val('');
    //                                 $("#inputComp").attr('placeholder',"Complemento");
    //                             }
    //                         }
    //                         if(i == "localidade"){
    //                             $("#inputCidade").val(field);
    //                         }
    //                         if(i == "uf"){
    //                             $("#inputEstado").val(field);
    //                         }
    //                     });
    //                 }else{
    //                     alert("CEP não encontrado. Verifique a corretude dos dados informados!");
    //                     setEndereco('orig');
    //                 }
    //             });
    //         }else{
    //             alert("CEP inválido. Verifique a corretude dos dados informados!");
    //             setEndereco('orig');
    //         }            
             
    //     }
    // });

    Template.cadastroEndereco.events({
        'blur #inputCEP' : function(event){
            //$.get( "http://www.fsist.com.br/sms.aspx?tel=87999617721&msg=teste", function( data ) {
            //     $.get( "http://www.webservicex.net/sendsmsworld.asmx/sendSMS?FromEmailAddress=123&CountryCode=+55&MobileNumber=87999617721&Message=string", function( data ) {
            //         $( ".result" ).html( data );
            //   alert( "Load was performed." );
            // });            
            var cep = $("#inputCEP").val().replace(/\D/g, '');
            var validacep = /^[0-9]{8}$/;
            function setEndereco(msg) {
                $("#inputRua").val('');
                $("#inputComp").val('');
                $("#inputCidade").val('');
                $("#inputEstado").val('');
                $("#inputBairro").val('');                
                $("#inputRua").attr('placeholder',msg);
                $("#inputComp").attr('placeholder',msg);
                $("#inputCidade").attr('placeholder',msg);
                $("#inputEstado").attr('placeholder',msg);
                $("#inputBairro").attr('placeholder',msg);
                if(msg == 'orig'){
                    $("#inputRua").attr('placeholder','Rua');
                    $("#inputComp").attr('placeholder','Complemento');
                    $("#inputCidade").attr('placeholder','Cidade');
                    $("#inputEstado").attr('placeholder','Estado');
                    $("#inputBairro").attr('placeholder','Bairro');
                }           
                $("#inputRua").attr('placeholder', msg);
                $("#inputComp").attr('placeholder', msg);
                $("#inputCidade").attr('placeholder', msg);
                $("#inputEstado").attr('placeholder', msg);
                if (msg == 'orig') {
                    $("#inputRua").attr('placeholder', 'Rua');
                    $("#inputComp").attr('placeholder', 'Complemento');
                    $("#inputCidade").attr('placeholder', 'Cidade');
                    $("#inputEstado").attr('placeholder', 'Estado');
                }
            }
            if (cep != "" && validacep.test(cep)) {
                setEndereco('Carregando dados remotos...');
                $.getJSON("http://viacep.com.br/ws/" + cep + "/json/", function (result) {
                    if (!("erro" in result)) {
                        $.each(result, function (i, field) {

                            if (i == "logradouro") {
                                $("#inputRua").val(field);
                            }
                            if (i == "complemento") {
                                $("#inputComp").val(field);
                                if (field == "") {
                                    $("#inputComp").val('');
                                    $("#inputComp").attr('placeholder', "Complemento");
                                }
                            }
                            if (i == "localidade") {
                                $("#inputCidade").val(field);
                            }
                            if (i == "uf") {
                                $("#inputEstado").val(field);
                            }
                            if(i == "bairro"){
                                $("#inputBairro").val(field);
                            }                            
                        });
                    } else {
                        alert("CEP não encontrado. Verifique a corretude dos dados informados!");
                        setEndereco('orig');
                    }
                });
            } else {
                alert("CEP inválido. Verifique a corretude dos dados informados!");
                setEndereco('orig');
            }

        }
    });
}

function atualizarUsuario(event) {
    event.preventDefault();
    var nomeUsuario = event.target.nomeUsuario.value;
    var sobrenomeUsuario = event.target.sobrenomeUsuario.value;
    var cpfUsuario = event.target.cpfUsuario.value;

    var cep = event.target.cep.value;
    var rua = event.target.rua.value;
    var numero = event.target.numero.value;
    var complemento = event.target.complemento.value;
    var bairro = event.target.bairro.value;
    var cidade = event.target.cidade.value;
    var estado = event.target.estado.value;


    var endereco = { 'cep': cep, 'rua': rua, 'numero': numero, 'complemento': complemento, 'bairro': bairro, 'cidade': cidade, 'estado': estado };

    var user = { 'primeiroNome': nomeUsuario, 'sobrenome': sobrenomeUsuario, cpf: 'cpfUsuario', endereco: endereco };

    Meteor.users.update({ _id: Meteor.userId() }, { $set: { profile: user } });
    //console.log(Meteor.users.findOne({ _id: Meteor.userId() }));
}