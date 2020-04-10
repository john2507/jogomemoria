class JogoDaMemoria{
    
    constructor({tela, util}){
        this.tela = tela
        this.util = util

        this.heroisIniciais = [
            {img:'./arquivo/a.png', nome: 't'},
            {img:'./arquivo/e.png', nome: 'g'},
            {img:'./arquivo/b.png', nome: 'u'},
            {img:'./arquivo/c.png', nome: 'h'}
            
        ]
        this.iconePadrao = './arquivo/ninja.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }
    
    esconderHerois(herois){
        const heroisOcultos = herois.map(({nome, id})=>({
            id,
            nome,
            img: this.iconePadrao
        }))
        this.tela.atualizarImagens(heroisOcultos)
        
        this.heroisEscondidos = heroisOcultos
    }

    inicializar(){
        this.tela.atualizarImagens(this.heroisIniciais)
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))

    }

    jogar(){
        //console.log('clicou')
        this.embaralhar()
    }

    mostrarHeroisEscondidos(){

       const heroisEscondidos = this.heroisEscondidos 
       for(const heroi of heroisEscondidos){
       const {img} = this.heroisIniciais.find(item => item.nome === heroi.nome)
        heroi.img = img
    }
    this.tela.atualizarImagens(heroisEscondidos)
}

 verificarSelecao(id, nome){
       
        const item = { id, nome }

        const heroisSelecionados = this.heroisSelecionados.length
       
        switch(heroisSelecionados){
            case 0:
                this.heroisSelecionados.push(item)
            break;

            case 1:
                const [ opcao1 ]  = this.heroisSelecionados
                this.heroisSelecionados=[]
                
                if(opcao1.nome === item.nome && opcao1.id !== item.id){

                    this.exibirHerois(item.nome)
                   
                    this.tela.exibirMensagem()
                    return;
                }
                this.tela.exibirMensagem(false)
                break;
            
        }
    }

    exibirHerois(nomeDoHeroi){

        const { img } = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome)

        this.tela.exibirHerois(nomeDoHeroi, img)

    }

    async embaralhar(){
        const copias = this.heroisIniciais
       
        .concat(this.heroisIniciais)
       
        .map(item=>{
        
            return Object.assign({}, item, {id: Math.random() /0.5})
        })
        
        .sort(()=>Math.random()- 0.5)
        
        this.tela.atualizarImagens(copias)
        
        this.tela.exibirCarregando()

        const idDoIntervalo = this.tela.iniciarContador()

        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
        
        
    }
}


