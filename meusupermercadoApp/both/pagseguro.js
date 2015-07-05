// if(Meteor.isServer){
// 	var pag;
// 	var pagseguro = Meteor.npmRequire('pagseguro');
// 	pag = new pagseguro({
//         email : 'felipe__eu@hotmail.com',
//         token: '2C05E090F0BA414A93D16F01725E693C',
//         mode : 'sandbox'
//     });	
//      pag.xml = Meteor.npmRequire('jstoxml');

//   	 pag.req = Meteor.npmRequire('request');

//     pag.currency('BRL');
//     pag.reference('12345');

//     pag.addItem({
//         id: 1,
//         description: 'Descrição do primeiro produto',
//         amount: "4230.00",
//         quantity: 3,
//         weight: 2342
//     });
//     pag.buyer({
//         name: 'José Comprador',
//         email: 'comprador@uol.com.br',
//         phoneAreaCode: '51',
//         phoneNumber: '12345678'
//     });
//     pag.shipping({
//         type: 1,
//         street: 'Rua Alameda dos Anjos',
//         number: '367',
//         complement: 'Apto 307',
//         district: 'Parque da Lagoa',
//         postalCode: '01452002',
//         city: 'São Paulo',
//         state: 'RS',
//         country: 'BRA'
//     });
//     //Enviando o xml ao pagseguro
//     pag.send(function(err, res) {

//         if (err) {
//             console.log(err);
//         }
//         console.log(res);
//     });   
//     	console.log('-----------------XML-----------------');
//     	console.log(pag);
//     	console.log('-------------------------------------');        
// }
if(Meteor.isServer){
    xml = Meteor.npmRequire('jstoxml');
    req = Meteor.npmRequire('request');
    
    k = xml.toXML({
      // a: {
      //   foo: 'bar',
      //   foo2: 'bar2'
      // },
      // b: {
      //   foo: 'bar',
      //   foo2: 'bar2'
      // }
      checkout:{
        currency: 'BRL',
        items: [
            {item: {
                nome: 'nome1',
                preco: 'preco1'
            }},
            {item: {
                nome: 'nome2',
                preco: 'preco2'
            }}
        ],
        reference: 'idvenda',
        sender: {
            name: 'Comprador',
            email: 'email',
            phone: {
                areacode: 'ddd',
                number: 'numero'
            }
        },
        shipping: {
            type: '',
            address: {
                street: 'rua',
                number: 'num',
                complement: 'complemento',
                district: 'estado',
                postalcode: 'cep',
                city: 'cidade',
                state: 'estado',
                country: 'pais'
            }
        }
      }
    }, {header: true, indent: '  '});
    console.log(k); 


}