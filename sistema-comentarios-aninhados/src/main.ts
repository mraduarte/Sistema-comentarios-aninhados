import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/styles/_variables.scss'
import { createI18n } from 'vue-i18n';

import pt from './i18n/pt.json';


const i18n = createI18n({
    legacy: false,
    locale: 'pt',  // Idioma padrão
    messages: {
      pt
    }
  });

  
createApp(App).use(i18n).mount('#app')
