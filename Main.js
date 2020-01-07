const http = require('http');
const axios = require('axios');

const {FiltroSmartWeb} = require('./model/VoltDevice');





/*vd = new VoltDevice('admin','voltvolt','192.168.0.90', 'ee:ee:ee:ee:ee:ee', '30', 'FiltroSmartweb'); 
console.log(vd.user);*/


//console.log(equip.user);
let equip = new FiltroSmartWeb('admin','voltvolt','192.168.0.91');
equip.updateInfo().then((resp)=>{
   
    //console.log(equip.lastInfo.jo)
    //equip.controlTomada(1,0,'').then(res=>{console.log(res);equip.updateInfo();}); // tomada 1, op 0,  nome vazio: Inverte status da tomada (Ligado/Desligado)
    //equip.controlTomada(1,1,'').then(res=>{console.log(res);equip.updateInfo();}); //tomada 1, op 1,  nome vazio: Inverte status da porta (Habilitada/Desabilitada)
    //equip.controlTomada(1,2,'').then(res=>{console.log(res);equip.updateInfo();}); //tomada 1, op 2,  nome 'Tomada 1-': Altera o nome da tomada 1 para 'Tomada1-'
    equip.configRede(false, 'abc', null, null, null, null, '8.8.4.4').then(res =>{
        console.log(res)
    })
    //console.log(equip.lastInfo.jo);
});

//let equip = new FiltroSmartWeb();
//equip.getInfo();






