const form = document.querySelector('form')

const handleSubmit = function(ev){
    ev.preventDefault()
    const f = ev.target
    const formText = f.formText.value
    const manaCost = f.manaCost.value
    addListItem(formText, manaCost)
    f.reset()
}

const addListItem = function (name, cost){
    const spellList = document.querySelector('#spells')
    let spell = document.createElement('li')
    spell.className = 'spell'
    let spellText = addName(name)
    let spellCost = addCost(cost)
    spell.appendChild(spellText)
    spell.appendChild(spellCost)
    spellList.appendChild(spell)
}

const addName = function(name){
    let spellText = document.createElement('span')
    spellText.className = 'spellName'
    let spellName = document.createTextNode(name)
    spellText.appendChild(spellName)
    return spellText
}

const addCost = function(cost){
    let spellCost = document.createElement('span')
    spellCost.className = 'spellCost'
    let mp = document.createTextNode('(' + cost + 'MP)')
    spellCost.appendChild(mp)
    return spellCost
}

form.addEventListener('submit', handleSubmit)