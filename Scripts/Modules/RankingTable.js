import svg from "./svg-icons.js";
import { $, traffic, getUser, captalize, floatFormat } from "./aux-tools.js";



export default function RankingTable() {
    let infos = {
        lang: traffic.get('quizLang')
    }


    //Mostrar Tabela
    $('.modal-ranking-background').style.display = 'grid'

    //Inserir linhas vazias na tabela | Clones da primeira linha
    for (let i = 0; i < 15; i++) {
        const dataRowClone = $('.dr0').cloneNode(true)
        dataRowClone.classList.remove('dr0')
        dataRowClone.classList.add('dr' + (i+1))
        $('.table-body').appendChild(dataRowClone)

        // Insere icones svg dos numeros de repostas certas e erradas
        if (i < 4) {
            i==0 || i==2? $('.table-icon-capsule')[i].innerHTML = svg.checkCircle('class', 'correct-icon'): $('.table-icon-capsule')[i].innerHTML = svg.crossCircle('class', 'error-icon')   
        }
        
    }

    //Inserir informações nas linhas | Obter infos das partidas da linguagem corrente
    const userRanking = getUser().ranking
    userRanking[infos.lang].forEach((round, i) => {
        const row = '.dr' + i

        //TABLE DE PARTIDA ATUAL
        if (round.current) {
            // Posição do Rank
            $('.d-row .rank-number').textContent = '#' + (i + 1)
            // Level
            $('.d-row .level').textContent = captalize(round.level)
            // Pontuação
            $('.d-row .score').textContent = floatFormat(round.score, 1) + ' pts'
            // Número de respostas corretas
            $('.d-row .correct-number').textContent = '00'
            // Número de respostas erradas
            $('.d-row .error-number').textContent = '00'
            // Data e Hora
            $('.d-row .date-hours').textContent = round.data + ' - ' + round.hora 
        }

        //Estilização do TOP 3 Ranking
        //Insere ID
        switch (i) {
            case 0:
                $(row).id = 'first'
                break
            case 1:
                $(row).id = 'second'
                break
            case 2:
                $(row).id = 'third'
                break
        }

        //Retirar rolagem Y do html
        $('html').style.overflowY = "hidden"




        //TABELA DE RANKING
        // Posição do Rank
        $(row + ' .rank-number').textContent = '#' + (i + 1)
        // Level
        $(row + ' .level').textContent = captalize(round.level)
        // Pontuação
        $(row + ' .score').textContent = floatFormat(round.score, 1) + ' pts'
        // Número de respostas corretas
        $(row + ' .correct-number').textContent = '00'
        // Número de respostas erradas
        $(row + ' .error-number').textContent = '00'
        // Data e Hora
        $(row + ' .date-hours').textContent = round.data + ' - ' + round.hora
    })

    //*** EVENTOS */
    // Botão de sair
    $('.exit-button').addEventListener('click', () => {
        //Fechar tabela
        $('.modal-ranking-background').style.display = 'none'
        // Resetar traffic
        traffic.reset()
        window.location.href = 'main.html';
    })

    // Botão de Jogar Novamente
    $('.play-again-button').addEventListener('click', () => {
        // // Setar infos de trafic e preparar para nova partida
        // traffic.set({
        //     quesCount: 1,
        //     quesNumber: 1,
        //     score: 0,
        //     usedQuest: []
        // })

        location.reload()
    })

}
