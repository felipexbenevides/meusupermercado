// ssh -i MSL.pem ubuntu@54.207.91.83
Template.cadastroUsuario.events({
    'blur #cpfUsuario' : function(event){
    	function testcpf(strCPF){
			var Soma;
			var Resto;
			Soma = 0;
			
				if (strCPF == "00000000000") return false;
		 		
		 		for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
		 		Resto = (Soma * 10) % 11;
		 		
		 	if ((Resto == 10) || (Resto == 11)) Resto = 0;
		 	if (Resto != parseInt(strCPF.substring(9, 10)) ) return false; 
		 		Soma = 0;
		 	for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
		 	Resto = (Soma * 10) % 11;
		 	
		 	if ((Resto == 10) || (Resto == 11)) Resto = 0;
		 	if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
		 	return true;    
		}   
		if(!testcpf($("#cpfUsuario").val())){
			alert('CPF inválido!');
		}

    }});
Template.cadastroUsuario.onRendered(function(){
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
            required: true, rangelength: [4, 35]
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
            rangelength: "cpf deve conter 11 caracteres.",
            digits: 'apenas números. ex.:07270579444.'
          },
          cep:{
            required: '¹ digite o cep.',
            digits: 'cep inválido. ex.:56300000.'

          }    
        }
      });
  });
