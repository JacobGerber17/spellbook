const form = document.querySelector('form')

const handleSubmit = function(ev){
    ev.preventDefault()
    const f = ev.target
    const spell = {
        name: f.spellName.value,
        cost: f.manaCost.value,
    }
    addListItem(spell)
    f.reset()
}

const addListItem = function (spellObj){
    const spellList = document.querySelector('#spells')
    let spell = document.createElement('li')
    spell.classList.add('spell')
    let spellText = addName(spellObj.name)
    let spellCost = addCost(spellObj.cost)
    spell.appendChild(spellText)
    spell.appendChild(spellCost)
    spellList.appendChild(spell)
}

const addName = function(name){
    let spellText = document.createElement('span')
    spellText.classList.add('spellName')
    let spellName = document.createTextNode(name)
    spellText.appendChild(spellName)
    return spellText
}

const addCost = function(cost){
    let spellCost = document.createElement('span')
    spellCost.classList.add('spellCost')
    let mp = document.createTextNode('(' + cost + 'MP)')
    spellCost.appendChild(mp)
    return spellCost
}

form.addEventListener('submit', handleSubmit)