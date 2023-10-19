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
            name: 'Javascript',
            img: '../Assets/Svg/js-icon.svg'
        },

        css: {
            name: 'HTML5 & CSS3',
            img: '../Assets/Svg/css-icon.svg'
        },

        py: {
            name: 'Python',
            img: '../Assets/Svg/python-icon.svg'
        },

        gd: {
            name: 'GDScript',
            img: '../Assets/Svg/godot-icon.svg'
        }
    }

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
            traffic.define({ challengerSelect: id })
            traffic.set({challengerSelect: id})
        }

       

        $('.slider-range').appendChild(strElement)
        
    })

}


// Animação de slide automático do carroussel
let left = 0
let count = 1
$('.slider-range').style.left = 0
window.onresize = function () {
    $('.slider-range').style.left = 0
    count = 1
    left = 0
}

setInterval(() => {
    if (count < $('.slide-card').length) {
        left += $('.slide-container').clientWidth + 36.5
        $('.slider-range').style.left = -left + 'px'
        count++ 
    } else {
        $('.slider-range').style.left = 0
        count = 1
        left = 0
    }
    
}, 5000)







