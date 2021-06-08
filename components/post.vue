<template>
    <div>{{ model }}</div>
</template>

<script>
import axios from "axios";
export default {
    props: {
        model: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            model: null,
        };
    },
    created: async function () {
      // this.model = await axois.options(`${this.fookie.baseURL}/${model}`);
    },
};
</script>

<style>
</style>