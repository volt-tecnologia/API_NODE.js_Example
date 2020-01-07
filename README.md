# Exemplo API Node.js para Filtro de Linha Smart Web

### 1. Importe VoltDevice.js
        const {FiltroSmartWeb} = require('./model/VoltDevice');

### 2. Inicialize o objeto
        /*      Passe, como parâmetros de inicialização, o usuário, senha e IP do equipamento
                Ao inicializar o objeto, se o equipamento estiver disponível na rede com estas credenciais, já atualizará suas informações
        */

        let equip = new FiltroSmartWeb('admin','voltvolt','192.168.0.91');

## Métodos

### 1. Buscar informações
        /* Este método retorna uma promisse de um pacote no formato 
        {       
                msg:'mensagem de erro',
                responseCode:'código de resposta HTTP - sucesso = 200',
                data='objeto json com todas as informações do equipamento'
        }*/

        equip.getInfo().then(res=>{
                    /*atualiza as informações do equipamento com o objeto de informações recebido*/
                    this.equip.lastInfo.jo = res.data;
                    
                });  

#### 1.2 Objeto de informações "lastInfo"

    equip.lastInfo.jo // objeto JSON com todas as informações do equipamento

    equip.lastInfo.getTemp(),  // função que retorna a temperatura do equipamento

    equip.lastInfo.getRmac(tomada),  // função que retorna status da porta (1-10) passada como parâmetro (True=habilitada / False=desabilitada) 

    equip.lastInfo.getAc(tomada),  //função que retorna o status da tomada (1-10) passada como parâmetro (0 = ligada / 1 = desligada)

    equip.lastInfo.getNomeAC(tomada)  // funçõ que retorna o nome da tomada (1-10) passada como parâmetro

### 2. Controle de Tomadas

    /* 
        Ao método controlTomda, devem ser passados os parâmetros: 
        -tomada: number:(0-10) tomada que receberá o comando
        -op:Comando a ser enviado à tomada (0:liga/desliga ; 1:habilita/desabilita ; 2:trocar nome da porta)
        -ac_name: opcional string com um nome para a porta, obrigatório para op 2(mudar nome da porta)

        Este método retorna uma promisse de um pacote no formato 
        {       
                msg:'mensagem de erro',
                responseCode:'código de resposta HTTP - sucesso = 200',
                data='mensagem de resposta do equipamento (caso houver)'
        }
    */
    equip.controlTomada(tomada,op,ac_name); 

#### Exemplos:
#### 2.1. Ligar/Desligar Tomada:
    equip.controlTomada(1,0).then(res=>{console.log(res);});//Inverte o estado da tomada 1 (Liga/Desliga)

#### 2.2. Habilitar/Desabilitar Tomada:
     equip.controlTomada(2,1).then(res=>{console.log(res);});//Inverte o estado da tomada 2 (Habilita/Desabilita)
     //resposta: {msg:'',responseCode:'200',data:''}

#### 2.3. Configurar nome da Tomada:
     equip.controlTomada(3,2,'Tomada 3').then(res=>{console.log(res);}); //Altera o nome da tomada 3 para 'Tomada 3'
     //resposta: {msg:'',responseCode:'200',data:''}

### 3. Configurar interface Ethernet
     equip.configRede(false, null, null, null, null, null, '8.8.4.4')
     /* 
        À função configEthernet, devem ser passados os parâmetros: 
        -boolDhcp: Boolean (True habilita DHCP do equipamento / False desabilita)
        -newhost: String ( Hostname à ser configurado no equipamento)
        -newip: String ( Endereço IP a ser configurado no equipamento)
        -newgtw: String ( Endereço de gateway a ser configurado no equipamento)
        -newmask: String ( Máscara de rede a ser configurada no equipamento)
        -newdns1: String ( Endereço de DNS primário)
        -newdns2: String ( Endereço de DNS secundário)

        Este método retorna uma promisse de um pacote no formato 
        {       
                msg:'mensagem de erro',
                responseCode:'código de resposta HTTP - sucesso = 200',
                data='mensagem de resposta do equipamento (caso houver)'
        }
    */
    equip.configEthernet(boolDhcp, newhost, newip, newgtw, newmask, newdns1, newdns2)
### Exemplo
        /*
        Configurar a interface de rede com os parâmetros:
        Hostname: 'Filtro de Linha'
        IP: '192.168.0.91'
        Gateway: '192.168.0.1'
        Máscara de rede: '255.255.255.0'
        DNS Primário: '8.8.8.8'
        DNS Secundário: '8.8.4.4'   

        Qualquer um dos parâmetros pode ser passado como null para manter a configuração anterior     
        */
        equip.configEthernet(false, 'Filtro de Linha', '192.168.0.91', '192.168.0.1', '255.255.255.0', '8.8.8.8', '8.8.4.4').then(res =>{
                console.log(res); // { msg: '', responseCode: 200, data: '' }
        })