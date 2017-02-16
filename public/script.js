var Card = {
  template: document.getElementById('card').innerHTML
};

new Vue({
  el: '#root-wrapper',
  components: {
    'card': Card
  }
});