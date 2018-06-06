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
        f.reset()
    },

    addListItem: function(spellObj){
        const spellList = document.querySelector('#spells')
        let spell = document.createElement('li')
        spell.classList.add('spell')
        let spellText = this.addName(spellObj.name)
        let spellCost = this.addCost(spellObj.cost)
        let removeButton = this.addRemoveButton()
        spell.appendChild(spellText)
        spell.appendChild(spellCost)
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
        let mp = document.createTextNode('(' + cost + 'MP)')
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

    removeSpell: function(spell){
        spell.parentNode.removeChild(spell)
        let i = this.spellArray.indexOf([spell.childNodes[0].textContent, spell.childNodes[1].textContent])
        this.spellArray.splice(i, 1)
    }
}

app.init()