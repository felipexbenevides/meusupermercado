Template.atualizarProduto.onRendered(function(){

          $("#atualizarProdutoForm").validate({
        // Define as regras
        rules:{
          inputNomeProduto:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, minlength: 5
          },
          inputDescricaoProduto:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, minlength: 5
          },          
          inputValorEnergetico:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, rangelength: [11,11], digits: true
          },  
          inputMarcaProduto:{
            required: true,
            digits: true
          }
        }
      });
  });
Template.cadastroProduto.onRendered(function(){
          $("#cadastroProdutoForm").validate({
        // Define as regras
        rules:{
          inputNomeProduto:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, minlength: 3
          },
          inputPeso:{
            required: true
          },
          inputDescricaoProduto:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, minlength: 5
          },          
          inputValorEnergetico:{
            // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
            required: true, minlength: 5
          },  
          inputMarcaProduto:{
            required: true, minlength: 3
          }
        }
      });
  });
