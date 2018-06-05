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
    const manaCost = f.manaCost.value
    const spellList = document.querySelector('#spells')
    let spell = document.createElement('li')
    let spellText = document.createElement('span')
    spellText.className = 'spellName'
    let spellCost = document.createElement('span')
    spellCost.className = 'spellCost'
    let name = document.createTextNode(formText)
    let cost = document.createTextNode('(' + manaCost + 'MP)')
    spellText.appendChild(name)
    spellCost.appendChild(cost)
    spell.appendChild(spellText)
    spell.appendChild(spellCost)
    spellList.appendChild(spell)
    f.reset()
    
}


//button.addEventListener('click', changeHeader2)
form.addEventListener('submit', formChange)