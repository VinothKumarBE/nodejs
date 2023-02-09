
//--------------------------------BASICS-----------------------------------------

// function Hello(){
//     const name = "NodeJS";
//     console.log(name);
//     console.log(7+3);
// }
// Hello();

//------------------------------BASICS--------------------------------------------

//blocking Synchronous way FILE-----------------------------------------------------

//const fs= require('fs');

// const textIn= fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

//-----------------------------------------------------------------------------
// const fs= require('fs');
// const textOut = `this are all avacados: ${textIn}\n created at: ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('hai hello')

//------------------------------------------------------------------------------

// Non blocking Synchronous way

// fs.readFile('./txt/start.txt', 'utf-8', (err, data) =>{
// console.log(data);
// });
// console.log('will read file')   

//------------------------------------------------------------------------------------------

//-------------------------Server-----------------------------------------------------------

// const http = require ('http');
//  const Server =http.createServer((req, res) => {
//     console.log(req)
//     res.end('hello welcome to the server side');

// });
// Server.listen('8900', '127.0.0.1', () =>{
//     console.log('Listnening to request on port  8000')
// })


//---------------------------ROUTING-------------------------------
const fs = require('fs')
const url = require('url');
const http = require('http');


const replaceTemplate  = (temp, product) =>{
let output  =  temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);


if(product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
return output;


    
}
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8', )
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8', )
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8', )

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8', )
const dataObj = JSON.parse(data);
 //    console.log(productData)
   const server = http.createServer((req,res) =>{
    // console.log(req.url);
    // res.end('helloooooooooooooo welcome server');

    const pathName = req.url;
   // OVER REVIEW PAGE
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'content-type':'text/html '});

          
             const cardsHtml =   dataObj.map(el =>  replaceTemplate(tempCard, el)).join('');
             const output = tempOverview.replace(' {%PRODUCT_CARDS%}' ,cardsHtml );
            // console.log(cardsHtml);
             res.end(output);
    }
   // PRODUCT PAGE
    else if(pathName === '/product')
    {
       res.end('this is product')
    }
   // API
    else if(pathName === '/api') {

    
       res.writeHead(200, {'content-type':'application/json'});
       res.end(data)

    // NOT FOUND
} else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>page not found!</h1>');
    }
});
   
    server.listen('8000', '127.0.0.1', () =>{
        console.log('Listenening to request port 8000')
    })



//-------------------------------------------------------------------------------------------------------------------


