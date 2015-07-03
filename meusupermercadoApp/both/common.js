Produtos = new Mongo.Collection("produtos");
Lojas = new Mongo.Collection("lojas");
Grupos = new Mongo.Collection("grupos");


var Schemas = {};

/*
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

Endereco = {
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
};

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
    grupo: {
        type: Grupos,
        optional: true
    }
});

Vendas = {
    produto: {
        type: Produtos._id,
        optional: false
    },
    preco: {
        type: String,
        optional: false
    },
    desconto: {
        type: Number,
        optional: true
    },
    dataVenda: {
        type: Date,
        optional: false
    },
    comprador: {
        type: Meteor.users._id,
        optional: false
    }
};

Estoque = {
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
};

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
        type: Endereco
    },
    administrador: {
        type: Meteor.users,
        optional: false
    },
    estoque: {
        type: [Estoque]
    },
    vendas: {
        type: [Vendas]
    }
});

quantidadeProdutos = {
    loja: {
        type: Lojas
    },
    produto: {
        type: Produtos
    },
    quantidade: {
        type: Number
    }
};

Transferencias = {
    usuario: {
        type: Meteor.users._id
    },
    produtos: {
        type: [quantidadeProdutos],
        label: "Itens comprados",
        optional: false
    },
    dataTransferencia: {
        type: Date,
        label: "Criada Em",
        optional: false
    }
};

Schemas.Usuarios = new SimpleSchema({
    primeiroNome: {
        type: String,
        label: "Primeiro Nome",
        optional: false
    },
    Sobrenome: {
        type: String,
        label: "Sobrenome",
        optional: false
    },
    cpf: {
        type: String,
        label: "CPF",
        optional: false
    },
    endereco: {
        type: Endereco,
        label: "Endereço",
        optional: true
    },
    itensComprados: {
        type: [Transferencias],
        label: "Itens comprados",
        optional: true
    },
    listasCompras: {
        type: [quantidadeProdutos],
        label: "Listas de Compras",
        optional: true
    },
    criadoEm: {
        type: Date,
        label: "Criado Em",
        optional: false
    }
});

Schemas.Grupos = new SimpleSchema({
    nomeGrupo: {
        type: String,
        label: "Nome do Grupo",
    }
});



Grupos.attachSchema(Schemas.Grupos);
Produtos.attachSchema(Schemas.Produtos);
Lojas.attachSchema(Schemas.Lojas);
Meteor.users.attachSchema(Schemas.Usuario);

