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
function pag(){
    xml = Meteor.npmRequire('jstoxml');
    req = Meteor.npmRequire('request');
    
    k = xml.toXML({
      checkout:{
        currency: 'BRL',
        items: [
            {item: {
            id: '0002',  
            description: 'Notebook Prata',
            amount: '24300.00',
            quantity: '1',  
            weight: '1000'
            }},
            {item: {
            id: '0001',  
            description: 'Notebook Prata',
            amount: '24300.00',
            quantity: '1',  
            weight: '1000'
            }}
        ],
        reference: 'REF1234',
        sender: {
            name: 'José Comprador',
            email: 'comprador@uol.com.br',
            phone: {
                areacode: '11',
                number: '56273440'
            }
        },
        shipping: {
            type: '1',
            address: {
                street: 'rua',
                number: 'num',
                complement: 'complemento',
                district: 'estado',
                postalcode: 'cep',
                city: 'cidade',
                state: 'SP',
                country: 'pais'
            }
        }
      }
    }, {header: true, indent: '  '});
    console.log(k); 
    var options;
    options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml; charset=UTF-8'
        }
    };
    options.uri = "https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=felipe__eu@hotmail.com&token=2C05E090F0BA414A93D16F01725E693C";
    options.body = k;
    req(options, function(err, res, body) {
        if (err) {
           // return callback(err);
        } else {
            console.log(body);
            //return callback(null, body);
        }
    });    
}
function PagSeguro(email, token){
    this.email = email;
    this.token = token;
    this.xml = Meteor.npmRequire('jstoxml');
    this.req = Meteor.npmRequire('request');
    this.obj = {};
    this.options= {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml; charset=UTF-8'
        }
    };
    this.setXML = function (body) {
        this.reqxml = this.xml.toXML(body,{header: true, indent: '  '});    
  
    }
    this.send = function(){
    this.options.uri = "https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email="+ this.email +"&token="+this.token;
    this.options.body = this.reqxml;
    console.log(this.options.body);
    this.req(this.options, function(err, res, body) {
        if (err) {
           // return callback(err);
        } else {
            console.log(body);
            //return callback(null, body);
        }
    })
    };

}
var x ={     
    checkout:{
        currency: 'BRL',
        items: [
            {item: {
            id: '0002',  
            description: 'Notebook Prata',
            amount: '24300.00',
            quantity: '1',  
            weight: '1000'
            }},
            {item: {
            id: '0001',  
            description: 'Notebook Prata',
            amount: '24300.00',
            quantity: '1',  
            weight: '1000'
            }}
        ],
        reference: 'REF1234',
        sender: {
            name: 'José Comprador',
            email: 'comprador@uol.com.br',
            phone: {
                areacode: '11',
                number: '56273440'
            }
        },
        shipping: {
            type: '1',
            address: {
                street: 'rua',
                number: 'num',
                complement: 'complemento',
                district: 'estado',
                postalcode: 'cep',
                city: 'cidade',
                state: 'SP',
                country: 'pais'
            }
        }
    }
}
console.log('--------------------------------------------'+x);

PagSeguro = new PagSeguro('felipe__eu@hotmail.com', '2C05E090F0BA414A93D16F01725E693C');
PagSeguro.setXML(x);
//PagSeguro.send();
//console.log(PagSeguro.options.body);
//console.log(PagSeguro);

}






