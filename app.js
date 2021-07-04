function serialNumber (length) {
  const numbers = []

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (92 - 65)) + 65
    numbers.push(String.fromCharCode(randomNumber))
  }

  return numbers.join('')
}

const app = Vue.createApp({
  data: function () {
    return {
      lists: ['To Do', 'Doing', 'Done'],
      cards: [
        {
          id: 'VZQUSU',
          list: 'To Do',
          text: 'Create new card feature'
        },
        {
          id: 'GXRRMI',
          list: 'Doing',
          text: 'Create move card feature'
        },
        {
          id: 'QLDJYB',
          list: 'Done',
          text: 'Create display cards feature'
        }
      ]
    }
  }
})

const vm = app.mount('#app')
