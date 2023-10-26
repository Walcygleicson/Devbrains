import Header from "./Modules/Header.js";
import Footer from "./Modules/Footer.js";
import { connectKey, $, stringToHtml, traffic } from "./Modules/aux-tools.js";
import svg from "./Modules/svg-icons.js";

connectKey.create()
traffic.start()

Header('#header-capsule')
Footer('#footer-capsule')
langSlideCards()



// Insere os cards de desafios das linguagens
function langSlideCards() {
    const lang = {
        js: {
            name: 'js',
            img: '../Assets/Svg/js-icon.svg'
        },

        css: {
            name: 'css',
            img: '../Assets/Svg/css-icon.svg'
        },

        py: {
            name: 'py',
            img: '../Assets/Svg/py-icon.svg'
        },

        gd: {
            name: 'gds',
            img: '../Assets/Svg/gds-icon.svg'
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

                    <div class="lang-content">
                        <h2 class="title">
                            <span>Desafio</span>
                            <span class="lang-name">${lang[id]['name']}</span>
                        </h2>
                        <div class="score-container">
                            <span class="inner-txt">Melhor Pontuação: </span>
                            <span class="score">--.--</span>
                        </div>
                        <div class="level-container">
                            <span class="inner-txt">Nível: </span>
                            <span class="level">--.--</span>
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
            traffic.define({ quizLang: lang[id]['name'] })
            traffic.set({ quizLang: lang[id]['name'] })
        }
        // -------------------------------------------------

        $('.slider-range').appendChild(strElement)
        
    })

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








