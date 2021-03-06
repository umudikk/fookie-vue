export default {
    state: () => ({
        fookie: {
            application: "",
            token: "",
            baseUrl: "",
            models: []
        }
    }),
    mutations: {
        getAll(state, payload) {
            state[payload.model].pool = payload.response.data;
        },
        get(state, payload) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i._id != payload.response.data._id);
            state[payload.model].pool.push(payload.response.data);
        },
        post(state, payload) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i._id != payload.response.data._id);
            state[payload.model].pool.push(payload.response.data);
        },
        remove(state, payload) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i._id != payload.query.where._id);
        },
        patch(state, payload) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i._id != payload.response.data._id);
            state[payload.model].pool.push(payload.response.data);
        },
        schema(state, payload) {
            state[payload.model].schema = payload.response.data.schema
            state[payload.model].display = payload.response.data.display
            state[payload.model].fookie = payload.response.data.fookie
        },
        login(state, payload) {
            state[payload.model].token = payload
            localStorage.setItem("token", payload)

        },
    },
    actions: {
        api: async function (ctx, payload) {
            payload.token = localStorage.getItem("token")
            ctx.commit("log", {
                title: `REQUEST -> Method:${payload.method} | Model:${payload.model}`,
                body: payload
            })
            if (ctx.state.inGame) {
                payload.response = JSON.parse(await mp.events.callProc('apiProc', JSON.stringify(payload)))
            } else {
                payload.response = await axios.post(ctx.state.baseURL, payload, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
            }

            ctx.dispatch("apiSync", payload)
            return payload.response.data
        },
        apiSync(ctx, payload) {
            if (payload.response.status == 200) {
                if (payload.method === 'delete') payload.method = 'remove'; // delete resevered keyword

                ctx.commit(payload.method, payload);
                ctx.commit("snackbar", { color: "success", text: `Method:${payload.method.toUpperCase()} | Model:${payload.model}` });

            }
        },
    },
    getters: {}
}