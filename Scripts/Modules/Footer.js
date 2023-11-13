const LINKS = {
    facebook: 'https://www.facebook.com/profile.php?id=100077914505804&mibextid=9R9pXO',
    instagram: 'https://www.instagram.com/walcy_gleicson',
    github: 'https://github.com/Walcygleicson',
    gmail: 'mailto:walcygleicsonoliveira@gmail.com'
}

const PATH = {
    facebookIcon: '../Assets/Images/facebook-icon.png',
    instagramIcon: '../Assets/Images/instagram-icon.png',
    githubIcon: '../Assets/Images/github-icon.png',
    gmailIcon: '../Assets/Images/gmail-icon.png'
}

const TXT = {
    developer: 'Walcygleicson Oliveira / Devbrains &copy; 2023'
}


export default function Footer(capsule) {
    const capsuleNode = document.querySelector(capsule)
    const elementString = `
        <div class="footer footer-shell">
            <section class="my-social-medias">
            <ul>
                <li>
                    <a href="${LINKS.facebook}" target="_blank">
                        <img src="${PATH.facebookIcon}" alt="Icone do facebook">
                    </a>
                </li>
                <li>
                    <a href="${LINKS.instagram}" target="_blank">
                        <img src="${PATH.instagramIcon}" alt="Icone do instagram">
                    </a>
                </li>
                <li>
                    <a href="${LINKS.github}" target="_blank">
                        <img src="${PATH.githubIcon}" alt="Icone do github">
                    </a>
                </li>

                <li>
                    <a href="${LINKS.gmail}" target="_blank">
                        <img src="${PATH.gmailIcon}" alt="Icone do gmail">
                    </a>
                </li>
            </ul>
        </section>
        <section class="footer-navigation">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Sobre Nós</a></li>
                <li><a href="#">Termos</a></li>
                <li><a href="#">Política de Privacidade</a></li>
            </ul>
        </section>
        <div class="developed-by">${TXT.developer}</div>
        </div>
    `
    // Converte o elemento String em DOM / Extrai o footer-shel
    capsuleNode.appendChild(new DOMParser().parseFromString(elementString, 'text/html').querySelector('.footer-shell'))
}
