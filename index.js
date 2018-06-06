const app = {
    init: function(){
        const form = document.querySelector('form')
        form.addEventListener('submit', ev => {
            this.handleSubmit(ev)
        })
    },

    spellArray: [],

    handleSubmit: function(ev) {
        ev.preventDefault()
        const f = ev.target
        const spell = {
            name: f.spellName.value,
            cost: f.manaCost.value,
        }
        this.spellArray.push([spell.name, spell.cost])
        this.addListItem(spell)
        console.log(this.spellArray)
        f.reset()
    },

    addListItem: function(spellObj){
        const spellList = document.querySelector('#spells')
        let spell = document.createElement('li')
        spell.classList.add('spell')
        let spellText = this.addName(spellObj.name)
        let spellCost = this.addCost(spellObj.cost)
        let removeButton = this.addRemoveButton()
        let editButton = this.addEditButton()
        spell.appendChild(spellText)
        spell.appendChild(spellCost)
        spell.appendChild(editButton)
        spell.appendChild(removeButton)
        spellList.appendChild(spell)
    },

    addName: function(name) {
        let spellText = document.createElement('span')
        spellText.classList.add('spellName')
        let spellName = document.createTextNode(name)
        spellText.appendChild(spellName)
        return spellText
    },

    addCost: function(cost) {
        let spellCost = document.createElement('span')
        spellCost.classList.add('spellCost')
        let mp = document.createTextNode('(' + cost + ' MP)')
        spellCost.appendChild(mp)
        return spellCost
    },

    addRemoveButton: function() {
        let removeButton = document.createElement('span')
        removeButton.textContent = 'X'
        removeButton.classList.add('delete')
        removeButton.addEventListener('click', ev => {
            this.removeSpell(removeButton.parentNode)
        })
        return removeButton;
    },

    addEditButton: function() {
        let editButton = document.createElement('span')
        editButton.textContent = 'Edit'
        editButton.classList.add('edit')
        editButton.addEventListener('click', ev => {
            this.editSpell(editButton.parentNode)
        })
        return editButton
    },

    removeSpell: function(spell){
        spell.parentNode.removeChild(spell)
        let i = this.spellArray.indexOf([spell.childNodes[0].textContent, spell.childNodes[1].textContent])
        this.spellArray.splice(i, 1)
        console.log(this.spellArray)
    },

    editSpell: function(spell){
        let spellName = spell.childNodes[0].textContent
        let spellCost = spell.childNodes[1].textContent
        let cost = spellCost.split(' ')[0]
        let finalCost = cost.substring(1, cost.length)
        const form = document.querySelector('form')
        form.spellName.value = spellName
        form.manaCost.value = finalCost
        spell.parentNode.removeChild(spell)
        let i = this.spellArray.indexOf([spellName, spellCost])
        this.spellArray.splice(i, 1)
        console.log(this.spellArray)
    },
}

app.init()