const app = {
    init: function(){
        const form = document.querySelector('form')
        form.addEventListener('submit', ev => {
            this.handleSubmit(ev)
        })
    },

    handleSubmit: function(ev) {
        ev.preventDefault()
        const f = ev.target
        const spell = {
            name: f.spellName.value,
            cost: f.manaCost.value,
        }
        this.addListItem(spell)
        f.reset()
    },

    addListItem: function(spellObj){
        const spellList = document.querySelector('#spells')
        let spell = document.createElement('li')
        spell.classList.add('spell')
        let spellText = this.addName(spellObj.name)
        let spellCost = this.addCost(spellObj.cost)
        spell.appendChild(spellText)
        spell.appendChild(spellCost)
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
    }
}

app.init()