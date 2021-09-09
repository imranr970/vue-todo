import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPen, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueObserveVisibility from 'vue-observe-visibility'

library.add( 
    faTrash,
    faPen,
    faTimes,
    faSpinner
)

const app = createApp(App)

app.use(router)
app.component('observe-visibility', VueObserveVisibility)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
