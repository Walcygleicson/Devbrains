import Header from "./Modules/Header.js";
import Footer from "./Modules/Footer.js"
import { $, stringToHtml, getUser, connectKey, captalize, floatFormat, traffic, noLoginUser } from "./Modules/aux-tools.js";
import RankingTable from "./Modules/RankingTable.js";
import AlertModalDefault from "./Modules/AlertModalDefault.js";
import svg from "./Modules/svg-icons.js";

Header('#header-capsule')
Footer('#footer-capsule')
traffic.start()
traffic.reset()
noLoginUser.create()
noLoginUser.define({ranking: {}})
connectKey.create()


function insertCards() {

    const lang = {
        js: 'Javascript',
        py: 'Python',
        css: 'HTML5 & CSS3',
        gds: 'GDScript',
        cs: 'C#',
        cpp: 'C++',
        rjs: 'React.js',
        njs: 'Node.js',
        php : 'PHP'
    }

    Object.keys(lang).forEach((key) => {
        let element = `
    <div class="background">
        <div class="language-card">
            <img src="../Assets/Svg/${key}-icon.svg" alt="" class="lang-img">
            
            <div class="details">
                <h2 class="language-name">${lang[key]}</h2>
                <h3>Melhor Classificação:</h3>
                <div class="score-container ${best_score(key).className}">
                    <span class="score">${best_score(key).score}</span> |
                    <span class="level">${best_score(key).level}</span>
                </div>
                <button class="open-ranking-button">${svg.rank()} Ver Ranking</button>
            </div>

            <div class="a-container">
                <a href="${key=='js'? 'play-challenger.html': '##unavaliable'}" class="go-to-challenge" id="${key}">Começar</a>
            </div>

        </div>
    
        </div>
        `
        element = stringToHtml(element)
        element.style.backgroundImage = `url(../Assets/Svg/${key}-icon.svg)`

        //** Eventos */

        //Click no botão ver ranking
        //Botão de Ver Ranking
        element.$('.open-ranking-button').addEventListener('click', () => {

            if (connectKey.get('user') != null && getUser(connectKey.get('user')).ranking[key] !== undefined || connectKey.get('user') == null && noLoginUser.get('ranking')[key] !== undefined) {
                //Abre tabela de ranking
                RankingTable(key)
            } else {
                //Abrir modal de alerta
                AlertModalDefault('Você ainda não jogou este desafio! Inicie para ter acesso ao ranking!', 'Ops!')
            }
        })

        // Botão de iniciar desafio
        element.$('.go-to-challenge').onclick = function () {
            console.log(key)
            //If provisório enquando só ha o quiz de JS
            if (key == 'js') {
                // Salva a o nome da linguagem do desafio selecionado pelo usuário
                traffic.define({ quizLang: key, langName: lang[key]})
                traffic.set({ quizLang: key, langName: lang[key] })
                
            } else {
                //Alerta para linguagens que ainda não possuem desafios
                AlertModalDefault('O desafio ' + lang[key] + ' não está disponível no momento. Tente outra linguagem!', 'Ops!')
            }

        }

        $('.challenges-list').appendChild(element)
    })


}

// Obter potuações para mostrar no card
function best_score(id) {
    let userData = []

     //Buscar dados se houver usuário logado
    userData = connectKey.get('user') == null? noLoginUser.get('ranking') : getUser(connectKey.get('user')).ranking

    return {
        score: userData[id] == undefined ? '--.--' : floatFormat(userData[id][0].score, 1) + ' pts',
        level: userData[id] == undefined ? '--.--' : captalize(userData[id][0].level),
        className: userData[id] == undefined ? '' : 'score-full'
    }
    
}


insertCards()
