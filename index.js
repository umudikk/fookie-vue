import get from './components/get'

export default {
    install: (app, options) => {
        app.provide('$fookie', options)

        app.mixin({
            created() {
                console.info("Hi I am Fookie")
                console.info(options)
            }
        })
    }
}