import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    vuetify: new Vuetify({
            theme: {
                dark: true,
                themes: {
                    dark: {
                        primary: '#0F1642',
                        accent: '#2B3253',
                        secondary: '#7E72F2',
                        success: '#28C76F',
                        info: '#2196F3',
                        warning: '#FF9F43',
                        error: '#EA5455',
                        backgroundwarning: '#FFDFC2',
                        backgroundsecondary: '#D5D1FB'
                    },
                    light: {
                        // primary:'#0000FF',
                        // accent: '#FF4081',
                        // secondary: '#ffe18d',
                        // success: '#4CAF50',
                        // info: '#2196F3',
                        // warning: '#FB8C00',
                        // error: '#FF5252'
                    }
                }
            }
        }
    ),
    icons: {
        iconfont:'mdi'
    },
});
