class App  {
    init(){
        this.spellArray = []
        this.template = document.querySelector('.spell.template')
        this.list = document.querySelector('#spells')
        const form = document.querySelector('form')
        form.addEventListener('submit', ev => {
            this.handleSubmit(ev)
        })
    }

    handleSubmit(ev) {
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
    }

    addListItem(spellObj){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')

        const properties = Object.keys(spellObj)

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

        item
            .querySelector('span.up')
            .addEventListener(
                'click',
                this.moveUp.bind(this, spellArray)
        )

        return item

    }

    removeSpell(ev){
        let spell = ev.target.parentNode.parentNode
        spell.parentNode.removeChild(spell)
        let mySpell = {
            name: spell.childNodes[0].textContent,
            cost: spell.childNodes[1].textContent
        }
        let i = this.spellArray.indexOf(mySpell)
        this.spellArray.splice(i, 1)
        console.log(this.spellArray)
    }

    editSpell(ev){
        let spell = ev.target.parentNode.parentNode
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
    }

    toggleFavorite(ev){
        spell = ev.target.parentNode.parentNode
        this.spellArray.fav = spell.classList.toggle('favSpell')
    }

    moveUp(spell, ev){
        const i = this.spellArray.indexOf(spell)

        if(i > 0){
            const button = ev.target
            const item = button.closest('.spell')
            this.list.insertBefore(item, item.previousSibling)

            
            const previousSpell = this.spellArray[i - 1]
            this.spellArray[i-1] = spell
            this.spellArray[i] = previousSpell
        }
    }

    moveDown(spell, ev){
        const i = this.spellArray.indexOf(spell)

        if(i < this.spellArray.length - 1){
            const button = ev.target
            const item = button.closest('.spell')
            this.list.insertBefore(item.nextSibling, item)

            const nextSpell = this.spellArray[i + 1]
            this.spellArray[i+1] = spell
            this.spellArray[i] = nextSpell
        }
    }
}

new App()