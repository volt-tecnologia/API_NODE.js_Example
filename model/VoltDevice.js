const axios = require('axios');



const data = {
    jo:{},
    getTemp(){
        return this.jo.temp;
    },
    getRmac(tomada){// retorna status da tomada (true = Habilitada/ false = Desabilitada)
        switch(tomada)
        {
            case 1: return this.jo.rmac1 ; break;
            case 2: return this.jo.rmac2 ; break;
            case 3: return this.jo.rmac3 ; break;
            case 4: return this.jo.rmac4 ; break;
            case 5: return this.jo.rmac5 ; break;
            case 6: return this.jo.rmac6 ; break;
            case 7: return this.jo.rmac7 ; break;
            case 8: return this.jo.rmac8 ; break;
            case 9: return this.jo.rmac9 ; break;
            case 10: return this.jo.rmac10 ; break;
        }
    },
    /**
     * getAc(tomada)
     * Retorna status da tomada (1 = Desligada/ 0 = Ligada)
     * @param tomada - Number 1~10
     * 
     */
    getAc(tomada){  
        switch(tomada)
        {
            case 1: return this.jo.ac0 ; break;
            case 2: return this.jo.ac1 ; break;
            case 3: return this.jo.ac2 ; break;
            case 4: return this.jo.ac3 ; break;
            case 5: return this.jo.ac4 ; break;
            case 6: return this.jo.ac5 ; break;
            case 7: return this.jo.ac6 ; break;
            case 8: return this.jo.ac7 ; break;
            case 9: return this.jo.ac8 ; break;
            case 10: return this.jo.ac9 ; break;
        }
    },
    getNomeAC(tomada){  // Retorna o nome da tomada
        switch(tomada)
        {
            case 1: return this.jo.nt1 ; break;
            case 2: return this.jo.nt2 ; break;
            case 3: return this.jo.nt3 ; break;
            case 4: return this.jo.nt4 ; break;
            case 5: return this.jo.nt5 ; break;
            case 6: return this.jo.nt6 ; break;
            case 7: return this.jo.nt7 ; break;
            case 8: return this.jo.nt8 ; break;
            case 9: return this.jo.nt9 ; break;
            case 10: return this.jo.nt10 ; break;
        }
    }
}



const FiltroSmartWeb =  
    class 
    {
        
        constructor (user, password, ip)
        {
            if(user == null || password == null || ip == null){
                console.log('\n\n///////////\nERRO !!!!!!!!!!!\nInstancie o Equipamento com os parâmetros corretos (String username, String password, String ip)!!\nERRO !!!!!!!!!!!\n///////////\n\n')
            }else{
                this.teste = 'aoowa';
                this.user = user;
                this.password = password;
                this.ip = ip;
                this.lastInfo = data;
                this.options = {
                    headers: { 'Content-Type': 'application/json'/*,
                                'Authorization':'Basic '+(Buffer.from(this.user+':'+this.password).toString('base64'))*/
                            },auth:{username:this.user,password:this.password},
                    timeout:2000
                  };

                  
                this.getInfo = httpGetInfo;
                this.controlTomada = ctrlAc;
                this.configRede = configEthernet;

                this.getInfo();
            }
                  

        
        }

        
}

function httpGetInfo(){
    
    return reqGETHTTP('http://'+this.ip+'/status.json', this.options).then(res=>{
        //console.log('responseCode: '+res.responseCode)
        this.lastInfo.jo = res.data;
        
    });

}


async function reqGETHTTP(url, options){
    //console.log(url)
    //console.log(options)    
    
    return axios.get(url, options).then((res)=>{
        //console.log({msg:'', responseCode:res.status, data:res.data});
        return {msg:'', responseCode:res.status, data:res.data}
    }).catch((err)=>{
        return {msg:err, responseCode:'', data:''};
    
    });
}

async function reqPOSTHTTP(url, data, options){
    console.log(url)
    console.log(options)   
     
    
    return axios.post(url, data, options).then((res)=>{
        console.log({msg:'', responseCode:res.status, data:res.data});
        return {msg:'', responseCode:res.status, data:res.data}
    }).catch((err)=>{
        console.log({msg:err, responseCode:'', data:''});
        return {msg:err, responseCode:'', data:''};
    
    });
}

function ctrlAc(tomada, op, ac_name){
        
    switch(op){
        case 0:
            if(this.lastInfo.getRmac(tomada) != 'false'){
                
                return reqGETHTTP("http://" + this.ip + "/outpoe.cgi?poe=" + tomada + "&sts="+(this.lastInfo.getAc(tomada) == '0' ? '0':'1')+"&pr=0", this.options);
                
            }else console.log('Porta '+tomada+' desabilitada!!')
            break;
        case 1:
            var nomePorta = this.lastInfo.getNomeAC(tomada);
            
            return reqGETHTTP("http://" + this.ip + "/output.htm?porta=" + tomada + "&rmac=" + (this.lastInfo.getRmac(tomada)=='true'? 'false':'true') + "&nt=" + nomePorta, this.options);
    
        break;
        
       case 2:
               if(ac_name != null) 
               return reqGETHTTP("http://" + this.ip + "/output.htm?porta=" + tomada + "&rmac=" + (this.lastInfo.getRmac(tomada)) + "&nt=" + ac_name, this.options);
                  
               else JOptionPane.showMessageDialog(null, "Digite um nome válido para a tomada!!");
               break;
               
    }
    
    
    
    

    
}

function configEthernet(boolDhcp, newhost, newip, newgtw, newmask, newdns1, newdns2){

const params = new URLSearchParams();
params.append('dhcp', (boolDhcp?'true':'false'));
params.append('host', (newhost == null ? this.lastInfo.jo.devhost:newhost));
params.append('ip', (newip == null ? this.lastInfo.jo.devip:newip));
params.append('gw', (newgtw == null ? this.lastInfo.jo.devgtw:newgtw));
params.append('sub', (newmask == null ? this.lastInfo.jo.devmask:newmask));
params.append('dns1', (newdns1 == null ? this.lastInfo.jo.devdns1:newdns1));
params.append('dns2', (newdns2 == null ? this.lastInfo.jo.devdns2:newdns2));

    console.log(data)
    return reqPOSTHTTP("http://" + this.ip + "/config.htm?", params, this.options).then(
         reqGETHTTP("http://" + this.ip + "/reset.cgi?timeout=1", this.options)
    );
}




module.exports = {FiltroSmartWeb};




