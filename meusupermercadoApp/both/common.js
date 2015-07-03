Produtos = new Mongo.Collection("produtos");
Lojas = new Mongo.Collection("lojas");

/*
var Schemas = {};

Schemas.Info = new SimpleSchema({
    valorEnergetico: {
            type: String,
            label:"Valor Energético",
            optional: true            
        },
        carboidratos: {
            type: String,
            label:"Carboidratos",
            optional:true
        },
        sodio: {
            type: String,
            label:"Sódio",
            optional: true
        }
});



*/

Schemas.Produtos = new SimpleSchema({
    nome: {
        type: String,
        label: "Nome",
        max: 200
    },
    descricao: {
        type: String,
        label: "Descrição dos Produtos",
        max: 500,
		optional: true
    },
    criadoEm: {
        type: Date,
        label: "Registro criado",
		denyUpdate: true
    },
    peso: {
       type: Number,
       decimal: false  
    },
    infoNutricional:{
        type: String,
        optional: true    
    },
    marca:{
        type: String,
        optional: true
    },
    grupo:{
        type: Grupos,
        optional: true
    }
});

quantidadeProdutos = {
    produto:{
        type: Produtos    
    },
    quantidade:{
        type: Number
    }
}

Schemas.Usuarios = new SimpleSchema({
   primeiroNome:{
       type: String,
       label: "Primeiro Nome",
       optional: false
   },
   Sobrenome:{
       type: String,
       label: "Sobrenome",
       optional: false
   },
   cpf:{
       type: String,
       label: "CPF",
       optional: false
   },
   endereco:{
     type: Schemas.Endereco,
     label: "Endereço",
     optional: true  
   },
   itensComprados:{
       type: [quantidadeProdutos],
       label: "Itens comprados",
       optional: true
   },
   listasCompras:{
       type: [quantidadeProdutos],
       label: "Listas de Compras",
       optional: true
   },
   criadoEm:{
       type: Date,
       label: "Criado Em",
       optional: false
   }
});

Schemas.Transferencias = new SimpleSchema({
   usuario:{
       type: Meteor.users._id
   },
   loja:{
       type:
   },
   produtos:{
       type: [quantidadeProdutos],
       label: "Itens comprados"
       optional: false
   },
   dataTransferencia:{
       type: Date,
       label: "Criada Em",
       optional: false
   }
});


Schemas.Listas = new SimpleSchema({
    usuario:{
        type: Usuario,
        label: "Usuário",
        optional:false
    },
    itensDaLista:{
        type: [Schema.Itens],
        label: "Lista de Itens",
        optional: false
    }
});

Schemas.Endereco = new SimpleSchema({
    cep:{
        type: String,
        label: "CEP",
        optional: false
        },
    rua:{
        type: String,
        label: "Rua",
        optional: false
    },
    numero:{
        type: Number,
        label:"Número",
        min: 0,
        optional: false
    },
    complemento:{
        type: String,
        label: "Complemento",
        optional: true
    },
    bairro:{
        type: String,
        label: "Bairro",
        optional: false
    },
    cidade:{
        type: String,
        label: "Cidade",
        optional: false
    },
    estado:{
        type: String,
        label: "Estado",
        optional: false
    }
});


Schemas.Lojas = new SimpleSchema({
    nome:{
        type: String,
        label: "Nome da Loja",
        max: 200,
        optional: false
    },
    cnpj:{
        type: String,
        label: "CNPJ",
        optional: false
    },
    endereco: {
        type: Schemas.Endereco
    },
    administrador:{
        type: Meteor.users,
        optional: false
    }   
});

Schemas.Grupos = new SimpleSchema({
   nomeGrupo:{
       type: String,
       label: "Nome do Grupo",
   } 
});



Schemas.Estoque = new SimpleSchema({
   loja: {
       type: Lojas._id,
       optional: false
   },
   produto: {
       type: Produtos._id,
       optional: false
   },
   preco: {
       type: String,
       optional: false
   },
   quantidadeItens: {
       type: Number,
       optional: false
   },
   desconto: {
       type: Number,
       optional: true
   } 
});

/*

Stores.attachSchema(Schemas.Lojas);
Produtos.attachSchema(Schemas.Produtos);
Itens.attachSchema(Schemas.Itens);
*/
