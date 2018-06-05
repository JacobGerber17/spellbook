const button = document.querySelector('button')
const header = document.querySelector('h1')
const header2 = document.querySelector('#header2')
const form = document.querySelector('form')

const changeHeader = function(){
    header.innerHTML = "The text has been changed."
}

const changeHeader2 = function(){
    header2.innerHTML = "The text has been changed."
}

const formChange = function(ev){
    ev.preventDefault()
    const f = ev.target
    const formText = f.formText.value
    header.textContent = formText
}

button.addEventListener('click', changeHeader2)
form.addEventListener('submit', formChange)