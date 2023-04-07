import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
const customTheme1 = {

    colors: {
        background: "#F5F5F5",
        surface: "#FFFFFF",
        primary: "#3f51b5",
        secondary: "#03dac6",
        error: "#f44336",
        info: "#2196F3",
        success: "#4caf50",
        warning: "#fb8c00",
    },
};

 const vuetify = createVuetify({
     components,
    directives,
     theme: {
         defaultTheme: "customTheme1",
         themes: {
             customTheme1,
         },

     },
    icons: {
         defaultSet: 'mdi',
         aliases,
         sets: {
             mdi,
         }
     }
 })

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
