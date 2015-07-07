Template.cadastroLoja.onRendered(function(){
          $("#cadastroLojaForm").validate({
        // Define as regras
        rules:{
          nomeLoja:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, minlength: 5
          },
          cnpj:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, rangelength: [14, 14], digits: true
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
            required: true, rangelength: [4, 25]
          },  
          bairro:{
            required: true, rangelength: [4, 25]
          },            
          cidade:{
            required: true, rangelength: [4, 25]
          },  
          estado:{
            required: true, rangelength: [2, 15]
          },                                                            
          administrador:{
            required: true, email: true
          } 
        },
        // Define as mensagens de erro para cada regra
        messages:{
          nomeLoja:{
            required: "¹ digite o nome da empresa.",
            minlength: "O nome da empresa deve conter, no mínimo, 5 caracteres."
          },
          cnpj:{
            required: "¹ digite o cnpj.",
            rangelength: "cnpj deve conter 14 caracteres.",
            digits: 'apenas números. ex.:08064723000155.'
          },
          cep:{
            required: '¹ digite o cep.',
            digits: 'cep inválido. ex.:56300000.'

          },        
          administrador:{
            required: "¹ digite o email do administrador da loja.",
            email: "email inválido. ex.: nome@dominio.com.",
          }        
        }
      });
  });
