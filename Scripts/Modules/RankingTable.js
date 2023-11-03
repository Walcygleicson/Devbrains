import svg from "./svg-icons.js";
import { $, traffic, getUser, captalize, floatFormat, connectKey, noLoginUser } from "./aux-tools.js";



export default function RankingTable(lang) {
    let infos = {
        lang: lang==undefined?traffic.get('quizLang'): lang
    }

    
    //Mostrar Tabela
    $('.modal-ranking-background').style.display = 'grid'

    //Inserir linhas vazias na tabela | Clones da primeira linha
    for (let i = 0; i < 15; i++) {
        if ($('.table-body').children.length < 16) {
            
            const dataRowClone = $('.dr0').cloneNode(true)
            dataRowClone.classList.remove('dr0')
            dataRowClone.classList.add('dr' + (i+1))
            $('.table-body').appendChild(dataRowClone)
    
            // Insere icones svg dos numeros de repostas certas e erradas
            if (i < 4) {
                i==0 || i==2? $('.table-icon-capsule')[i].innerHTML = svg.checkCircle('class', 'correct-icon'): $('.table-icon-capsule')[i].innerHTML = svg.crossCircle('class', 'error-icon')   
            }
        } 
    }


    //Inserir informações nas linhas | Obter infos das partidas da linguagem corrente

    // Ontem infos do usuário ou de noLoginUser
    const userRanking = connectKey.get('user') == null ? noLoginUser.get('ranking') : getUser().ranking
    
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
            $('.d-row .correct-number').textContent = round.correctNumb
            // Número de respostas erradas
            $('.d-row .errors-number').textContent = round.errorNumb
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
        $(row + ' .correct-number').textContent = round.correctNumb
        // Número de respostas erradas
        $(row + ' .error-number').textContent = round.errorNumb
        // Data e Hora
        $(row + ' .date-hours').textContent = round.data + ' - ' + round.hora
    })

    //*** EVENTOS */
    // Botão de sair
    $('.exit-button').addEventListener('click', (e) => {
        //Fechar tabela
        $('.modal-ranking-background').style.display = 'none'
        $('html').removeAttribute('style')

        if (!e.target.classList.contains('no-reload')) {
            
            // Resetar traffic
            traffic.reset()
            window.location.href = 'challenges.html';
        }

         //Limpar linhas e ids
        $('.table-body > .data-row > td').forEach((td) => {
            td.textContent = ''
            td.parentNode.removeAttribute('id')
        })

    })

    // Botão de Jogar Novamente
    $('.play-again-button').addEventListener('click', (e) => {
       
        if (e.target.textContent == 'Jogar') {
            if ($('title').id == 'home') {
                $('.logo-container > a#' + lang).click()
            } else if ($('title').id == 'challengers') {
                $('.a-container > a#' + lang).click()
            }

        } else {
            location.reload()
        }

    })

}
