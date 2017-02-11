import Vue from 'vue';
import App from './App';
import Coach from './Coach';
import Chat from './Chat';

const NotFound = { template: '<p>Page not found</p>' }
const routes = {
  '/': App,
  '/coach': Coach,
  '/chat': Chat,
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  mode: 'history',
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
