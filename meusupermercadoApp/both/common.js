Stores = new Mongo.Collection("lojas");
Produtos = new Mongo.Collection("produtos");
Itens = new Mongo.Collection("itens");

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
    },
    pais:{
        type: String,
        label: "País",
        optional: false
    },
    
});

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
   senha:{
       type: String,
       label: "Senha",
       optional: false
   },
   email:{
       type: String,
       label: "Email",
       regEx: SimpleSchema.RegEx.Email,
       optional: false
   },
   endereco:{
     type: Schemas.Endereco,
     label: "Endereço",
     optional: true  
   },
   itensComprados:{
       type: [Schemas.Itens],
       label: "Itens adquiridos",
       optional: true
   },
   listasCompras:{
       type: [Schemas.Listas],
       label: "Listas de Compras",
       optional: true
   },
   criadoEm:{
       type: Date,
       label: "Criado Em",
       optional: true
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
        type: Schemas.Usuarios
    }   
});

Schemas.Itens = new SimpleSchema({
    codBar: {
        type: String,
        label: "Código de Barras"
    },
    criadoEm: {
        type: Date,
        label: "Registro criado",
		denyUpdate: true
    },
    vendidoEm: {
        type: Date,
        label: "Item Vendido",
		denyUpdate: true
    },
	loja: {
		type: Schemas.Lojas,  
	},
    preco: {
        type: Number,
        decimal: false
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
	itens: {
		type: [Itens],  
	},
    infoNutricional:{
        type: Schemas.Info    
    },
    grupo:{
        type: String,
        optional: true
    },
    subgrupo:{
        type: String,
        optional: true
    }
});


Stores.attachSchema(Schemas.Lojas);
Produtos.attachSchema(Schemas.Produtos);
Itens.attachSchema(Schemas.Itens);
*/
