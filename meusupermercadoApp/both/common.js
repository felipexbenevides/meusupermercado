Stores = new Mongo.Collection("lojas");
Produtos = new Mongo.Collection("produtos");
Itens = new Mongo.Collection("itens");


var Schemas = {};



Schemas.Endereco = new SimpleSchema({
    cidade:{
        type: String,
        optional: false
    },
    estado:{
        type: String,
        optional: false
    },
    bairro:{
        type: String,
        optional: false
    },
    cep:{
        type: String,
        optional: false
        },
    numero:{
        type: Number,
        min: 0,
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
        optional: false
    },
    endereco: {
        type: Schemas.Endereco
    }   
});

Schemas.Info = new SimpleSchema({
    valorEnergetico: {
            type: String            
        },
        carboidratos: {
            type: String
        },
        sodio: {
            type: String
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
Stores.attachSchema(Schemas.Lojas);
Produtos.attachSchema(Schemas.Produtos);
Itens.attachSchema(Schemas.Itens);
