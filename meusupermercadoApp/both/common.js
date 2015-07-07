Produtos = new Mongo.Collection("produtosNovo");
Lojas = new Mongo.Collection("lojas");
Grupos = new Mongo.Collection("grupos");

/*
Produtos.remove( { } );
Lojas.remove({});
Grupos.remove({});

a = ['Ofertas', 'Laticínios', 'Peixes', 'Frios', 'Carnes', 'Massas', 'Padaria'];
a.forEach(function(str){
    Grupos.insert({nomeGrupo : str});
});
*/
var removeDatabase = function(){
    Produtos.remove( {} );
    Lojas.remove({});
    Grupos.remove({});
};

var Schemas = {};

Schemas.Endereco = new SimpleSchema({
    cep: {
        type: String,
        label: "CEP",
        optional: false
    },
    rua: {
        type: String,
        label: "Rua",
        optional: false
    },
    numero: {
        type: Number,
        label: "Número",
        min: 0,
        optional: false
    },
    complemento: {
        type: String,
        label: "Complemento",
        optional: true
    },
    bairro: {
        type: String,
        label: "Bairro",
        optional: false
    },
    cidade: {
        type: String,
        label: "Cidade",
        optional: false
    },
    estado: {
        type: String,
        label: "Estado",
        optional: false
    }
});

Schemas.Grupos = new SimpleSchema({
    nomeGrupo: {
        type: String,
        label: "Nome do Grupo",
        unique: false
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
    infoNutricional: {
        type: String,
        optional: true
    },
    marca: {
        type: String,
        optional: true
    },
    nomeGrupo: {
        type: String,
    }
});

Schemas.Item = new SimpleSchema({
    produto: {
        type: Schemas.Produtos._id,
        optional: false
    },
    preco: {
        type: String,
        optional: false
    },
    codBarras:{
        type: String,
        optional: false      
    },
    desconto: {
        type: Number,
        optional: true
    },
    quantidade:{
        type: Number,
        optional: false
    }
});

Schemas.ItemVendido = new SimpleSchema({
    item:{
        type: Schemas.Item._id,
        optional: false
    },
    preco:{
        type: Schemas.Item.preco,
        optional: false
    },
    desconto:{
        type: Schemas.Item.desconto,
        optional: true
    },
    codBarras:{
        type: Schemas.Item.codBarras,
        optional: false
    }    
});

Schemas.Vendas = new SimpleSchema({
    itensVendidos: {
        type: [Schemas.ItemVendido],
        optional: false  
    },
    cupomPromocional:{
        type: String,
        optional: true  
    },
    valorTotal:{
        type: Number,
        optional: false    
    },
    desconto: {
        type: Number,
        optional: true
    },
    dataVenda: {
        type: Date,
        optional: false,
        denyUpdate: true
    },
    comprador: {
        type: Meteor.users._id,
        optional: false
    },
    transferenciaId:{
        type: "$._id",
        optional: false        
    },
    formasPagamento:{
        type: [String],
        optional: true
    },
    status:{
        type: String,
        optional: false
    }
});



Schemas.Lojas = new SimpleSchema({
    nome: {
        type: String,
        label: "Nome da Loja",
        max: 200,
        optional: false
    },
    cnpj: {
        type: String,
        label: "CNPJ",
        optional: false
    },
    endereco: {
        type: Schemas.Endereco
    },
    administrador: {
        type: Meteor.users._id,
        optional: false
    },
    estoque: {
        type: [Schemas.Item],
        optional: true
    },
    vendas: {
        type: [Schemas.Vendas],
        optional: true
    }
});


Schemas.ListaProdutosPorLoja = new SimpleSchema({
    loja: {
        type: Schemas.Lojas
    },
    itens: {
        type: [Schemas.Item]
    }
});

Schemas.Transferencias = new SimpleSchema({
    ListaProdutos:{
        type: [Schemas.ListaProdutosPorLoja]
    },  
    dataTransferencia: {
        type: Date,
        label: "Criada Em",
        optional: false,
        denyUpdate: true
    }
});

Schemas.Usuarios = new SimpleSchema({
    primeiroNome: {
        type: String,
        label: "Primeiro Nome",
        regEx: /^[a-z A-Z-]{2,25}$/,
        optional: true
    },
    sobrenome: {
        type: String,
        label: "Sobrenome",
        regEx: /^[a-z A-Z-]{2,25}$/,
        optional: true
    },
    cpf: {
        type: String,
        label: "CPF",
        optional: true
    },
    endereco: {
        type: Schemas.Endereco,
        label: "Endereço",
        optional: true
    },
    itensComprados: {
        type: [Schemas.Transferencias],
        label: "Itens comprados",
        optional: true
    },
    listasCompras: {
        type: [Schemas.Transferencias],
        label: "Listas de Compras",
        optional: true
    },
    createdAt: {
        type: Date,
        label: "Criado Em",
        optional: true
    }
});


Schemas.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        optional: true
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schemas.Usuarios,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    }
});


Grupos.attachSchema(Schemas.Grupos);
Produtos.attachSchema(Schemas.Produtos);
Lojas.attachSchema(Schemas.Lojas);
Meteor.users.attachSchema(Schemas.User);
