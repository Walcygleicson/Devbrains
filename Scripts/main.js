import Header from "./Modules/Header.js";
import Footer from "./Modules/Footer.js";
import { connectKey, $ } from "./Modules/aux-tools.js";
import svg from "./Modules/svg-icons.js";



connectKey.create()
Header('#header-capsule')
Footer('#footer-capsule')

$('.rank-svg-capsule').innerHTML = svg.rank()







