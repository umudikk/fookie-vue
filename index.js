import get from './components/get'

export default {
    install: (app, options) => {
        app.provide('fookie', options)

        app.directive('my-directive', {
            mounted(el, binding, vnode, oldVnode) {
                // some logic ...
            }

        })

        app.components({
            "fookie-get": get
        })

        app.mixin({
            created() {
                // some logic ...
            }

        })
    }
}