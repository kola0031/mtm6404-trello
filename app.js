function serialNumber(length) {
    const numbers = []

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * (92 - 65)) + 65
        numbers.push(String.fromCharCode(randomNumber))
    }

    return numbers.join('')
}

const app = Vue.createApp({
    data: function() {
        return {
            lists: ['To Do', 'Doing', 'Done'],
            cards: [{
                    id: 'VZQUSU',
                    list: 'To Do',
                    text: 'An item that I need to do'
                },
                {
                    id: 'GXRRMI',
                    list: 'Doing',
                    text: 'An item that I am doing'
                },
                {
                    id: 'QLDJYB',
                    list: 'Done',
                    text: 'An item that is done'
                }
            ]

        }
    },
    // created: function() {
    //     const cards = localStorage.get('cards')
    //     if (cards) {
    //         this.cards = cards
    //     }
    // },


    methods: {
        getCards: function(list) {
            return this.cards.filter(card => card.list === list)
        },
        createCard: function(list) {
            this.cards.push({
                id: serialNumber(6),
                list: list,
                text: ''
            })
        },
        deleteCard: function(id) {
            const card = this.cards.findIndex(card => card.id === id)
            this.cards.splice(card, 1)
        },

        updateText: function(id, text) {
            const card = this.cards.find(card => card.id === id)
            card.text = text
        },

        updateList: function(id, list) {
            const card = this.cards.find(card => card.id === id)
            card.list = list
        },

        // watch: {
        //     cards: {
        //         deep: true,
        //         handler: function(cards) {
        //             localStorage.set('cards', JSON.stringify(cards))
        //         }
        //     }
        // }
    }
})

app.component('trello-card', {
    props: ['id', 'initialText', 'initialList'],
    data: function() {
        return {
            text: this.initialText,
            list: this.initialList
        }
    },
    template: ` <div class="card">
  <div class="card-action">
    <select class="card-action-select" v-model="list" @click="$emit('update-list', id, list)">
      <optgroup label="Move to:">
        <option>To Do</option>
        <option>Doing</option>
        <option>Done</option>
      </optgroup>
    </select>
    <button class="card-action-button" @click="$emit('delete-card', id)">&times;</button>
  </div>
  <textarea class="card-text" v-model="text" @change="$emit('update-text', text, id)"></textarea>
</div>`
})


app.component('trello-list', {
    props: ['list'],
    template: ` <div class="list">
  <div class="list-header">
      <h2 class="list-title">{{ list }}</h2>
      <button class="list-button" @click="$emit('create-card', list)">+</button>
  </div>
  <slot></slot>
</div>`
})

const vm = app.mount('#app')