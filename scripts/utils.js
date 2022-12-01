// -------------------- CUSTOM DOM SELECTOR ----------------------//
const $=(selector)=> document.querySelector(selector);

const $$=(selector)=> document.querySelectorAll(selector);


// --------------- DYNAMIC CREATE_ELEMENT ----------------------//
const createElement = function (tagName, className, content) {
    const newElement = document.createElement(tagName);
    if (className) {
        newElement.setAttribute('class', className);
    }
    if (content) {
        newElement.innerHTML = content;
    }
    return newElement
}


// ===================== TOASTIFY start ======================= //
const toastifyFunc = (icon, message, color) => {
    $(".toastify").style.backgroundColor = color;
    $(".toastify").innerHTML = ` <span id="notif-icon"> ${icon} </span> 
    <strong id="notife-message" class="text-white mx-2 fs-5"> ${message} </strong> `;
    $('.toastify').classList.remove('hide-toastify');
}