Template.meuPerfil.onRendered(function(){
          $("#cadastroUsuarioForm").validate({
        // Define as regras
        rules:{
          primeiroNome:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, minlength: 5
          },
          sobrenome:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, minlength: 5
          },          
          cpf:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, rangelength: [11,11], digits: true
          },  
          cep:{
            required: true,
            digits: true
          },  
          rua:{
            required: true, rangelength: [4, 25]
          },  
          numero:{
            required: true,
            digits: true
          },  
          complemento:{
          },  
          bairro:{
            required: true, rangelength: [4, 25]
          },            
          cidade:{
            required: true, rangelength: [4, 25]
          },  
          estado:{
            required: true, rangelength: [2, 15]
          }
        },
        // Define as mensagens de erro para cada regra
        messages:{
          cpf:{
            required: "¹ digite o cnpj.",
            rangelength: "cnpj deve conter 11 caracteres.",
            digits: 'apenas números. ex.:07270579444.'
          },
          cep:{
            required: '¹ digite o cep.',
            digits: 'cep inválido. ex.:56300000.'

          }    
        }
      });
  });
