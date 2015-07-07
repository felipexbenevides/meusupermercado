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
            var grupo = Session.get('grupoSelecionado');
            console.log(grupo);
            var infoNutricional = event.target.inputValorProduto.value;
            var marca = event.target.inputMarcaProduto.value;
            
            if(nomeProduto == undefined){
                alert('produto vazio');
                return;
            }

            Produtos.insert({ nome: nomeProduto, descricao: descricaoProduto, criadoEm: new Date, peso: peso, nomeGrupo: grupo, infoNutricional: infoNutricional, marca: marca });
            
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
                produto = Produtos.findOne({_id : myDoc.produto}); //erro nessa linha
                var retorno = {_idItem: myDoc.codBarras, _idProduto : produto._id, nome : produto.nome, descricao: produto.descricao, peso : produto.peso, infoNutricional : produto.infoNutricional, marca: produto.marca, preco : myDoc.preco, desconto : myDoc.desconto, grupo: produto.nomeGrupo, quantidade: myDoc.quantidade};
                console.log(myDoc);
                ret.push(retorno);
            });
            console.log(ret);
            return ret;
            /*
            var loja = Lojas.findOne({administrador:Meteor.userId()});
            console.log('aqui');
            Lojas.update({_id:loja._id},{ $set : {estoque : []}},function(error, result){
                if (error){
                    console.log(error);
                }
            });
            return;*/
        }
    });

    Template.cadastroItem.events({
        'submit form': function (event) {
            event.preventDefault();

            var produto = $( "#selectProduto" ).val();
            console.log('produto:' + produto);
            var preco = event.target.inputPrecoItem.value;
            var codigo = event.target.inputCodBarrasItem.value;
            var desconto = event.target.inputDescontoItem.value
            var quantidade = event.target.inputQuantidadeItem.value;
            var estoque = {produto: produto, preco: preco, desconto: desconto, codBarras: codigo, quantidade: quantidade};
            //db.blogs.update({id:"001"}, {$push:{comments:{title:"commentX",content:".."}}}); 
            Lojas.update({_id : Lojas.findOne({administrador : Meteor.userId()})._id},{$push :{ estoque : estoque }}, function(error, result){
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
        'click .btn-editar-item' : function (event) {
            var item = Lojas.findOne({administrador: Meteor.userId()}).estoque.filter(function(item){return item.codBarras == event.target.value});
            console.log(item);
            $('.'+item[0].produto).attr("selected", true);
            $('#inputEditarPrecoItem').val(item[0].preco);
            $('#inputEditarCodBarrasItem').val(event.target.value);
            $('#inputEditarDescontoItem').val(item[0].desconto);
            $('#inputEditarQuantidadeItem').val(item[0].quantidade);
            $('#btnSubmitEditarItems').val(event.target.value);   
        }
    });

    Template.editarItem.events({
        'submit form': function(event){
            event.preventDefault();

            var produto = $( "#selectProduto" ).val();
            var preco = event.target.inputEditarPrecoItem.value;
            //var codigo = event.target.inputEditarCodBarrasItem.value;
            var desconto = event.target.inputEditarDescontoItem.value
            var quantidade = event.target.inputEditarQuantidadeItem.value;
            var estoque = {produto: produto, preco: preco, desconto: desconto, codBarras: $('#btnSubmitEditarItems').val(), quantidade: quantidade};
            //db.blogs.update({id:"001"}, {$push:{comments:{title:"commentX",content:".."}}}); 

            Lojas.update({_id : Lojas.findOne({administrador : Meteor.userId()})._id},{$pull :{ estoque : { codBarras : $('#btnSubmitEditarItems').val()}}}, function(error, result){
                if(error){
                    console.log("error");
                    console.log(error.invalidKeys);
                }
                else{
                    console.log(result);
                    Lojas.update({_id : Lojas.findOne({administrador : Meteor.userId()})._id},{$push :{ estoque : estoque }}, function(error, result){
                        if(error){
                            console.log(error.invalidKeys);
                        }
                        else
                            console.log(result);
                    });
                }
            });
        }
    });

    Template.meusProdutos.events({
        'click .btn-editar' : function (event) {
            event.preventDefault();
            Session.set('produtoEditar', event.target.value);
            var prod = Produtos.findOne({_id : event.target.value});
            console.log('Produto:' + prod);
            $('#inputAttNomeProduto').val(prod.nome);
            $('#inputAttDescricaoProduto').val(prod.descricao);
            $('#inputAttPesoProduto').val(prod.peso);
            $('.'+Grupos.findOne({nomeGrupo : prod.nomeGrupo})._id).attr("selected", true);
            Session.set('grupoSelecionado',prod.nomeGrupo);
            $('#inputAttValorProduto').val(prod.infoNutricional);
            $('#inputAttMarcaProduto').val(prod.marca);   
        }
    });

    Template.atualizarProduto.events({
        'submit form': function(event){
            event.preventDefault();
            console.log(Session.get('produtoEditar'));
            var nomeProduto = event.target.inputAttNomeProduto.value;
            var descricaoProduto = event.target.inputAttDescricaoProduto.value;
            var peso = event.target.inputAttPeso.value;
            var grupo = Session.get('grupoSelecionado');
            console.log(grupo);
            var infoNutricional = event.target.inputAttValorEnergetico.value;
            var marca = event.target.inputAttMarcaProduto.value;
            //console.log(Produtos.findOne({_id : $('#btnEditarProduto').val()}).grupo);
            if(nomeProduto == undefined){
                alert('error em nomeProduto');
                return;
            }
            Produtos.update({_id : Session.get('produtoEditar') },{ $set: { nome: nomeProduto, descricao: descricaoProduto, peso: peso, nomeGrupo : grupo , infoNutricional: infoNutricional, marca: marca }}, function(error, result){
                if(error){
                    console.log(error.invalidKeys);
                }
                else{
                    alert("Sucesso na atualização");
                }
            });
        }
    });

    Template.minhaLoja.onRendered(function(){
        loja = Lojas.findOne({ administrador: Meteor.userId()});
        $('#inputName').val(loja.nome);
        $('#inputCNPJ').val(loja.cnpj);
        $("#inputCEP").val(loja.endereco.cep);
        $("#inputRua").val(loja.endereco.rua);
        $("#inputNum").val(loja.endereco.numero);
        $("#inputComp").val(loja.endereco.complemento);
        $("#inputBairro").val(loja.endereco.bairro);
        $("#inputCidade").val(loja.endereco.cidade);
        $("#inputEstado").val(loja.endereco.estado);
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