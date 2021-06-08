import post from './components/post'
import del from './components/delete'
import view from './components/view'
import card from './components/card'
import f_store from './store/fookieStore'

const plugin = {
    install: (Vue,) => {
        if (!options || !options.store) {
            throw new Error('Please initialise plugin with a Vuex store.');
        }
        Vue.component("fookie-post", post)
        Vue.component("fookie-delete", del)
        Vue.component("fookie-card", card)
        Vue.component("fookie-view", view)

        Vue.mixin({
            created() {
                console.info("Hi I am Fookie")
            }
        })
    }
}

const fookieStore = f_store

export {
    plugin, fookieStore
}