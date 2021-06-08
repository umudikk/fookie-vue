export default {
    install(Vue, options) {
        Vue.mixin({
            mounted() {
                console.log('Mounted!');
            }
        });
    }
};