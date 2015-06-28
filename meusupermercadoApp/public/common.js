var Schemas = {};

Schemas.Produtos = new SimpleSchema({
    nome: {
        type: String,
        label: "Nome",
        max: 200
    },
    codBar: {
        type: String,
        label: "Código de Barras"
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
    vendidoEm: {
        type: Date,
        label: "Item Vendido",
		denyUpdate: true
    },
	lojaId: {
		type: 
	}
});

