//import { createServer } from 'http';

//createServer((req, res) => {
  //res.write('Hello World!');
  //res.end();
//}).listen(process.env.PORT);

import { https } from 'https';


import pkg from 'node-forge';
const { forge } = pkg;



//var https = require('https');
//var forge = require('node-forge');
    forge.options.usePureJavaScript = true; 

var pki = forge.pki;
var keys = pki.rsa.generateKeyPair(2048);
var cert = pki.createCertificate();

cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear()+1);

var attrs = [
     {name:'commonName',value:'example.org'}
    ,{name:'countryName',value:'US'}
    ,{shortName:'ST',value:'Virginia'}
    ,{name:'localityName',value:'Blacksburg'}
    ,{name:'organizationName',value:'Test'}
    ,{shortName:'OU',value:'Test'}
];
cert.setSubject(attrs);
cert.setIssuer(attrs);
cert.sign(keys.privateKey);

var pem_pkey = pki.publicKeyToPem(keys.publicKey);
var pem_cert = pki.certificateToPem(cert);

console.log(pem_pkey);
console.log(pem_cert);

https.createServer( { key:pem_pkey, cert:pem_cert },(req,res)=>
{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(443);
