import { createApp } from "vue";
import { createI18n, useI18n } from "vue-i18n";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
// @ts-ignore
import { languages } from "./i18n";
// @ts-ignore
import { defaultLocale } from "./i18n";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const customTheme1 = {
    colors: {
        background: "#F5F5F5",
        surface: "#FFFFFF",
        primary: "#3f51b5",
        secondary: "#03dac6",
        error: "#f44336",
        info: "#2196F3",
        success: "#4caf50",
        warning: "#fb8c00"
    }
};
const messages = Object.assign(languages);
const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: "en",
    
    messages

});

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "customTheme1",
        themes: {
            customTheme1
        }
    },
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi
        }
    }
});

export default i18n;
createApp(App, {
    setup() {
        const { t } = useI18n();
        return { t };
    }
})
    .use(router)
    .use(vuetify)
    .use(i18n)
    .mount("#app");
