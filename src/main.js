import { createApp } from 'vue'

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import 'notyf/notyf.min.css' // Added Notyf styles globally
import './style.css'

// Scripts & Root Component
import 'bootstrap/dist/js/bootstrap.min'
import App from './App.vue'

createApp(App).mount('#app')