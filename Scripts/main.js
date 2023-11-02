import Header from "./Modules/Header.js";
import Footer from "./Modules/Footer.js";
import AlertModalDefault from "./Modules/AlertModalDefault.js";
import { connectKey, $, stringToHtml, traffic, getUser, captalize, floatFormat } from "./Modules/aux-tools.js";
import svg from "./Modules/svg-icons.js";
import RankingTable from "./Modules/RankingTable.js";

connectKey.create()
traffic.start()

Header('#header-capsule')
Footer('#footer-capsule')
langSlideCards()


// Insere os cards de desafios das linguagens
function langSlideCards() {
    var lang = {
        js: {
            name: 'Javascript',
            img: '../Assets/Svg/js-icon.svg'
        },
    
        css: {
            name: 'HTML5 & CSS3',
            img: '../Assets/Svg/css-icon.svg'
        },
    
        py: {
            name: 'Python',
            img: '../Assets/Svg/py-icon.svg'
        },
    
        gds: {
            name: 'GDScript',
            img: '../Assets/Svg/gds-icon.svg'
        },

        cs: {
            name: 'C Sharp',
            img: '../Assets/Svg/cs-icon.svg'
        },

        cpp: {
            name: 'C++',
            img: '../Assets/Svg/cpp-icon.svg'
        },

        rjs: {
            name: 'React.js',
            img: '../Assets/Svg/rjs-icon.svg'
        },

        njs: {
            name: 'Node.js',
            img: '../Assets/Svg/njs-icon.svg'
        },

        php: {
            name: 'PHP',
            img: '../Assets/Svg/php-icon.svg'
        }
    }
    
    // Slavar lista de linguagens
    traffic.define({ langList: [] })
    traffic.set({langList: [...Object.keys(lang)]})

    Object.keys(lang).forEach((id) => {
        let strElement = `
                <div class="slide-card">
                    <div class="logo-container">
                        <img class="lang-logo" src="${lang[id]['img']}" alt="logo de linguagem">

                        <a href="play-challenger.html" class="go-to-challenger" id="${id}">Começar</a>
                    </div>

                    <div class="lang-content ${best_score(id).className}">
                        <h2 class="title">
                            <span>Desafio</span>
                            <span class="lang-name">${lang[id]['name']}</span>
                        </h2>
                        <div class="score-container">
                            <span class="inner-txt">Melhor Pontuação: </span>
                            <span class="score">${best_score(id).score}</span>
                        </div>
                        <div class="level-container">
                            <span class="inner-txt">Nível: </span>
                            <span class="level">${best_score(id).level}</span>
                        </div>
                        <button class="score-rank-button">
                            <span class="rank-svg-capsule">${svg.rank()}</span>
                            <span class="inner-txt">Ver Ranking</span>
                        </button>
                    </div>
                </div>`
        
        strElement = stringToHtml(strElement)

        // **** EVENTOS ****

        // Botão de iniciar desafio
        strElement.$('.go-to-challenger').onclick = function () {

            // Salva a o nome da linguagem do desafio selecionado pelo usuário
            traffic.define({ quizLang: id, langName: lang[id]['name'] })
            traffic.set({ quizLang: id, langName: lang[id]['name'] })
        }

        //Botão de Ver Ranking
        strElement.$('.score-rank-button').addEventListener('click', () => {

            if (getUser(connectKey.get('user')).ranking[id] !== undefined) {
                RankingTable(id)
            } else {
                //Abrir modal de alerta
                AlertModalDefault('Você ainda não jogou este desafio! Inicie para ter acesso ao ranking!', 'Ops!')
            }
        })
        // -------------------------------------------------

        $('.slider-range').appendChild(strElement)
        
    })

}

// Obter potuações para mostrar no card
function best_score(id) {
    let userData = getUser(connectKey.get('user')).ranking
    return {
        score: userData[id] == undefined ? '--.--' : floatFormat(userData[id][0].score, 1) + ' pts',
        level: userData[id] == undefined ? '--.--' : captalize(userData[id][0].level),
        className: userData[id] == undefined ? '' : 'score-full'
    }
    
}



// Animação de slide automático do carroussel
let left = 0
let count = 1
let canSlide = true
$('.slider-range').style.left = 0

window.onresize = function () {
    $('.slider-range').style.left = 0
    $('.slide-container').scrollLeft = 0
    count = 1
    left = 0
}

setInterval(() => {
    if (window.innerWidth <= 530 && canSlide) {
        if (count < $('.slide-card').length) {
            left += $('.slide-container').clientWidth + 36.5
            $('.slider-range').style.left = -left + 'px'
            count++ 
        } else {
            $('.slider-range').style.left = 0
            count = 1
            left = 0
        }
    }

    canSlide = true
    
}, 6000)

//Insere os icones svg nos botões de slide left e right
//Evento de click
$('.slide-buttons > button').forEach((but) => {
    // Click
    but.addEventListener('click', (e) => {
        canSlide = false
        if (e.target.classList.contains('left')) {
            left -= $('.slide-container').clientWidth + 36.5
            count--

            if (count > 0) {
                $('.slider-range').style.left = -left + 'px'
            } else if (count <= 0) {
                left = $('.slider-range').clientWidth - $('.slide-container').clientWidth + 2
                count = 4
                $('.slider-range').style.left = -left + 'px'
            }
        } else if (e.target.classList.contains('right')) {
            left += $('.slide-container').clientWidth + 36.5
            count++

            if (left >= 0 && count <= 4) {
                $('.slider-range').style.left = -left + 'px'
            } else if (count > 4) {
                left = 0
                count = 1
                $('.slider-range').style.left = -left + 'px'
            }
        } 
    })

    //Insere svg
    but.innerHTML = svg.chevronLeft()
})









