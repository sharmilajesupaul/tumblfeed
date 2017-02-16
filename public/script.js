var Card = {
  template: document.getElementById('card').innerHTML
};

new Vue({
  el: '#root-wrapper',
  components: {
    'card': Card
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
});