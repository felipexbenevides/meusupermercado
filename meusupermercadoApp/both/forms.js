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

   Template.layout.helpers({
      administrador: function(){
          var loja = Lojas.findOne({'administrador':Meteor.userId()});
          if(loja != undefined){
              return true;
          }
          else{
              return false;
          }
      } 
   });
    
    
    Template.cadastroProduto.events({
        'submit form': function (event) {
            event.preventDefault();

            var nomeProduto = event.target.inputNomeProduto.value;
            var descricaoProduto = event.target.inputDescricaoProduto.value;
            var peso = event.target.inputPesoProduto.value;
            var grupo = Grupos.findOne({_id : $( "#selectGrupo" ).val()});
            var infoNutricional = event.target.inputValorProduto.value;
            var marca = event.target.inputMarcaProduto.value;
            
            Produtos.insert({ nome: nomeProduto, descricao: descricaoProduto, criadoEm: new Date, peso: peso, grupo: grupo, infoNutricional: infoNutricional, marca: marca }, function(error, result){
                if(error){
                    console.log(error.invalidKeys);
                }
                else{
                    alert("Sucesso no cadastro");
                }
            });
            //db.Produtos.find().forEach( function(myDoc) { console.log(myDoc); } );
        }
    });

    Template.meusProdutos.helpers({
        produtos : function(){
            return Produtos.find({}).fetch();
        }
    });

    Template.meusItens.helpers({
        itens: function(){
            var loja = Lojas.findOne({administrador: Meteor.userId()});
            var itens = loja.estoque.filter(function(item){return (item.quantidade > 0)});
            var ret = [];
            itens.forEach(function(myDoc){
                produto = Produtos.findOne({_id : myDoc.produto});
                var retorno = {nome : produto.nome, descricao: produto.descricao, peso : produto.peso, infoNutricional : produto.infoNutricional, marca: produto.marca, preco : myDoc.preco, desconto : myDoc.desconto, grupo: produto.grupo.nomeGrupo, quantidade: myDoc.quantidade};
                ret.push(retorno);
            });
            console.log(ret);
            return ret;
        }
    });

    Template.cadastroItem.events({
        'submit form': function (event) {
            event.preventDefault();

            var produto = $( "#selectProduto" ).val();
            var preco = event.target.inputPrecoItem.value;
            var codigo = event.target.inputCodBarrasItem.value;
            var desconto = event.target.inputDescontoItem.value
            var quantidade = event.target.inputQuantidadeItem.value;
            var estoque = [{produto: produto, preco: preco, desconto: desconto, codBarras: codigo, quantidade: quantidade}];
            Lojas.update({_id : Lojas.findOne({administrador : Meteor.userId()})._id},{$set : {estoque : estoque}}, function(error, result){
                if(error){
                    console.log(error.invalidKeys);
                }
                else
                    console.log(result);
            });
            //db.Produtos.find().forEach( function(myDoc) { console.log(myDoc); } );
        }
    });

    Template.meusItens.events({
        'click .btn-editar' : function (event) {
            var prod = Produtos.findOne({_id : event.target.value});
            $('#inputPrecoItem').val(prod.nome);
            $('#inputAttDescricaoProduto').val(prod.descricao);
            $('#inputAttPesoProduto').val(prod.peso);
            $('.'+Grupos.findOne({nomeGrupo : prod.grupo.nomeGrupo})._id).attr("selected", true);
            $('#inputAttValorProduto').val(prod.infoNutricional);
            $('#inputAttMarcaProduto').val(prod.marca);   
        }
    });

    Template.meusProdutos.events({
        'click .btn-editar' : function (event) {
            var prod = Produtos.findOne({_id : event.target.value});
            $('#inputAttNomeProduto').val(prod.nome);
            $('#inputAttDescricaoProduto').val(prod.descricao);
            $('#inputAttPesoProduto').val(prod.peso);
            $('.'+Grupos.findOne({nomeGrupo : prod.grupo.nomeGrupo})._id).attr("selected", true);
            $('#inputAttValorProduto').val(prod.infoNutricional);
            $('#inputAttMarcaProduto').val(prod.marca);   
        }
    });

    Template.minhaLoja.onRendered(function(){
        $('#inputName').val(Lojas.findOne({ administrador: Meteor.userId()}).nome);
        $('#inputCNPJ').val(Lojas.findOne({ administrador: Meteor.userId()}).cnpj);
        $("#inputCEP").val(Lojas.findOne({ administrador: Meteor.userId()}).endereco.cep);
        $("#inputRua").val(Lojas.findOne({ administrador: Meteor.userId()}).endereco.rua);
        $("#inputNum").val(Lojas.findOne({ administrador: Meteor.userId()}).endereco.numero);
        $("#inputComp").val(Lojas.findOne({ administrador: Meteor.userId()}).endereco.complemento);
        $("#inputBairro").val(Lojas.findOne({ administrador: Meteor.userId()}).endereco.bairro);
        $("#inputCidade").val(Lojas.findOne({ administrador: Meteor.userId()}).endereco.cidade);
        $("#inputEstado").val(Lojas.findOne({ administrador: Meteor.userId()}).endereco.estado);
        $('#inputUsuario').attr("placeholder",Meteor.users.findOne({_id : Meteor.userId()}).emails[0].address);
        $('#inputUsuario').attr("disabled",true);
        });
        
    Template.minhaLoja.events({
        'submit form': function (event) {
            event.preventDefault();

            var nomeLoja = event.target.nomeLoja.value;
            var cnpj = event.target.cnpj.value;

            var cep = event.target.inputCEP.value;
            var rua = event.target.inputRua.value;
            var numero = event.target.inputNum.value;
            var complemento = event.target.inputComp.value;
            var bairro = event.target.inputBairro.value;
            var cidade = event.target.inputCidade.value;
            var estado = event.target.inputEstado.value;
            
            var endereco = { 'rua': rua, 'numero': numero, 'complemento': complemento, 'cep': cep,'bairro': bairro, 'cidade': cidade, 'estado': estado };
            //console.log(Meteor.users.findOne({ _id: Meteor.userId() }));
            //var admin = Meteor.users.findOne({ "emails.address": event.target.administrador.value });
            Lojas.update({ _id: Lojas.findOne({administrador : Meteor.userId()})._id},{$set : { nome: nomeLoja, cnpj: cnpj, endereco: endereco }}, function(error, result){
                if(error){
                    console.log(error.invalidKeys)
                }
                else{
                    console.log(result);
                }
            });   
        }
    }); 
          
    Template.cadastroLoja.events({
        'submit form': function (event) {
            event.preventDefault();

            var nomeLoja = event.target.nomeLoja.value;
            var cnpj = event.target.cnpj.value;

            var cep = event.target.inputCEP.value;
            var rua = event.target.inputRua.value;
            var numero = event.target.inputNum.value;
            var complemento = event.target.inputComp.value;
            var bairro = event.target.inputBairro.value;
            var cidade = event.target.inputCidade.value;
            var estado = event.target.inputEstado.value;

            var endereco = { 'rua': rua, 'numero': numero, 'complemento': complemento, 'cep': cep,'bairro': bairro, 'cidade': cidade, 'estado': estado };
            //console.log(Meteor.users.findOne({ _id: Meteor.userId() }));
            var admin = Meteor.users.findOne({ "emails.address": event.target.administrador.value });

            console.log(Lojas.insert({ nome: nomeLoja, cnpj: cnpj, endereco: endereco, administrador: admin._id }, function(error, result){
                if(error){
                    console.log(error.invalidKeys)
                }
                else{
                    console.log(result);
                }
            }));   
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