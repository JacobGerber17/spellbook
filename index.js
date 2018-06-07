const app = {
    init: function(){
        this.spellArray = []
        this.template = document.querySelector('.spell.template')
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
            fav: false,
        }
        this.spellArray.push(spell)
        const item = this.addListItem(spell)
        const list = document.querySelector('#spells')
        list.appendChild(item)
        console.log(this.spellArray)
        f.reset()
        f.spellName.focus()
    },

    addListItem: function(spellObj){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')

        properties = Object.keys(spellObj)

        properties.forEach(property => {
            const el = item.querySelector(`.${property}`)
            if (el) {
                el.textContent = spellObj[property]
                el.setAttribute('title', spellObj[property])
            }
        })

        const removeButton = item.querySelector('.delete')
        removeButton.addEventListener('click', (ev) =>{
            this.removeSpell(ev)
        })

        const editButton = item.querySelector('.edit')
        editButton.addEventListener('click', (ev) => {
            this.editSpell(ev)
        })

        const favButton = item.querySelector('.favButton')
        favButton.addEventListener('click', (ev) => {
            this.toggleFavorite(ev)
        })

        return item

    },

    removeSpell: function(ev){
        let spell = ev.target.parentNode
        spell.parentNode.removeChild(spell)
        let mySpell = {
            name: spell.childNodes[0].textContent,
            cost: spell.childNodes[1].textContent
        }
        let i = this.spellArray.indexOf(mySpell)
        this.spellArray.splice(i, 1)
        console.log(this.spellArray)
    },

    editSpell: function(ev){
        let spell = ev.target.parentNode
        let mySpell = {
            name: spell.childNodes[1].textContent,
            cost: spell.childNodes[3].textContent
        }
        const form = document.querySelector('form')
        console.log(mySpell)
        form.spellName.value = mySpell.name
        form.manaCost.value = mySpell.cost
        spell.parentNode.removeChild(spell)
        let i = this.spellArray.indexOf(mySpell)
        this.spellArray.splice(i, 1)
        console.log(this.spellArray)
    },

    toggleFavorite : function(ev){
        spell = ev.target.parentNode
        this.spellArray.fav = spell.classList.toggle('favSpell')
    },
}

app.init()