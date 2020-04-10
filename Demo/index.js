function onLoad(){


    const dependencias = {
        tela: Tela,
        util: Util
    }

    const jogodaMemoria = new JogoDaMemoria(dependencias)
    jogodaMemoria.inicializar()

}
window.onload = onLoad


