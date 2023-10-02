import { connectKey } from "./aux-tools.js"

export default function setAvatar(capsule) {
    const getUser = JSON.parse(localStorage.getItem(connectKey.get('user')))
    console.log(getUser.avatarIdx)
    document.querySelector(capsule).setAttribute('src', `../Assets/Avatars/default-avatar-${getUser.avatarIdx}.svg`)


    ////
    const a = document.querySelector('.user-name-bar').innerHTML = connectKey.get('user')
    

}