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
            required: true, minlength: 13, maxlength: 13, digits: true
          },  
          administrador:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true
          },                  
          campoEmail:{
            // campoEmail será obrigatório (required) e precisará ser um e-mail válido (email)
            required: true, email: true
          }     
        },
        // Define as mensagens de erro para cada regra
        messages:{
          nomeLoja:{
            required: "Digite o nome da empresa",
            minlength: "O nome da empresa deve conter, no mínimo, 5 caracteres"
          },
          cnpj:{
            required: "digite o CNPJ",
            minlength: "CNPJ contém 13 caracteres",
          }
        }
      });
      $("#formularioContato").validate({
        // Define as regras
        rules:{
          campoNome:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, minlength: 2
          },
          campoEmail:{
            // campoEmail será obrigatório (required) e precisará ser um e-mail válido (email)
            required: true, email: true
          },
          campoMensagem:{
            // campoMensagem será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, minlength: 2
          }
        },
        // Define as mensagens de erro para cada regra
        messages:{
          campoNome:{
            required: "Digite o seu nome",
            minLength: "O seu nome deve conter, no mínimo, 2 caracteres"
          },
          campoEmail:{
            required: "Digite o seu e-mail para contato",
            email: "Digite um e-mail válido"
          },
          campoMensagem:{
            required: "Digite a sua mensagem",
            minLength: "A sua mensagem deve conter, no mínimo, 2 caracteres"
          }
        }
      });
  });
