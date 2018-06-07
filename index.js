class App {
    constructor() {
      this.spells = []
      this.template = document.querySelector('.spell.template')
      this.list = document.querySelector('#spells')
  
      const form = document.querySelector('form')
      form.addEventListener('submit', ev => {
        this.handleSubmit(ev)
      })
    }
  
    renderItem(spell) {
      const item = this.template.cloneNode(true)
      item.classList.remove('template')
  
      // ['name', 'level', etc.]
      const properties = Object.keys(spell)
  
      // Replace the appropriate values in each <span>
      properties.forEach(property => {
        const el = item.querySelector(`.${property}`)
        if (el) {
          el.textContent = spell[property]
          el.setAttribute('title', spell[property])
        }
      })
  
      // delete button
      item
        .querySelector('button.delete')
        .addEventListener(
          'click',
          this.removeSpell.bind(this, spell)
        )
  
      // fav button
      item
        .querySelector('button.fav')
        .addEventListener(
          'click',
          this.toggleFavorite.bind(this, spell)
        )
  
      // move up
      item
        .querySelector('button.up')
        .addEventListener(
          'click',
          this.moveUp.bind(this, spell)
        )
  
      // move down
      item
        .querySelector('button.down')
        .addEventListener(
          'click',
          this.moveDown.bind(this, spell)
        )
  
  
      return item
    }
  
    moveDown(spell, ev) {
      // Find the <li>
      const button = ev.target
      const item = button.closest('.spell')
  
      // Find its index in the array
      const i = this.spells.indexOf(spell)
  
      // Only move it if it's not already last
      if (i < this.spells.length - 1) {
        // Move it in the array
        const nextSpell = this.spells[i + 1]
        this.spells[i + 1] = spell
        this.spells[i] = nextSpell
  
        // Move it on the page
        this.list.insertBefore(item.nextSibling, item)

        this.save()
      }
    }
  
    moveUp(spell, ev) {
      // Find the <li>
      const button = ev.target
      const item = button.closest('.spell')
  
      // Find its index in the array
      const i = this.spells.indexOf(spell)
  
      // Only move it if it's not already first
      if (i > 0) {
        // Move it in the array
        const previousSpell = this.spells[i - 1]
        this.spells[i - 1] = spell
        this.spells[i] = previousSpell
  
        // Move it on the page
        this.list.insertBefore(item, item.previousSibling)

        this.save()
      }
    }
  
    removeSpell(spell, ev) {
      // Remove from the DOM
      const button = ev.target
      const item = button.closest('.spell')
      item.parentNode.removeChild(item)
  
      // Remove from the array
      const i = this.spells.indexOf(spell)
      this.spells.splice(i, 1)

      this.save()
    }

    editSpell(spell, ev){
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
  
    toggleFavorite(spell, ev) {
      const button = ev.target
      const item = button.closest('.spell')
      spell.favorite = item.classList.toggle('fav')
      this.save()
    }
  
    handleSubmit(ev) {
      ev.preventDefault()
  
      const f = ev.target
  
      const spell = {
        name: f.spellName.value,
        level: f.level.value,
        favorite: false,
      }
      this.spells.push(spell)
  
      const item = this.renderItem(spell)
      this.list.appendChild(item)
  
      this.save()
      f.reset()
      f.spellName.focus()
    }

    save() {
        localStorage.setItem('spells', JSON.stringify(this.spells))
    }
  }
  
  const app = new App()