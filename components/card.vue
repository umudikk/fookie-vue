<template>
  <v-card>
    <v-card-title class='subheading font-weight-bold'>{{ item[model.display] }}
    </v-card-title>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
          v-for='(key) in keys'
          :key="key+'_viewcard'"
      >
        <v-list-item-content>
          {{ $t(key) }}:
        </v-list-item-content>
        <v-list-item-content class='align-end'>
          {{ getContent(key) }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions class='card-action'>
      <v-btn-toggle mandatory dark>
        <v-btn
            v-if='panel'
            @click='$router.push({
                                      name:"panel",
                                      params:{
                                        _id:item._id,
                                        _model:model.name
                                      }
                                      })'
            small
            fab
            color='blue'

        >
          <v-icon dark>mdi-door-open</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  props: ['model', 'query', 'remove', 'patch', 'panel', 'selectedId'],
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: null,
    };
  }
  ,
  computed: {
    item() {
      return this.model.pool.find(m => m._id == this.selectedId);
    }
    ,
    keys() {
      return ['_id'].concat(Object.keys(this.model.schema));
    },
  },
  methods: {
    getContent(key) {
      if (key == '_id') return this.item[key];
      console.log(key);
      if (typeof this.model.schema[key].relation === 'string') {
        let maybe = this.$store.state[
            this.model.schema[key].relation
            ].pool.find((i) => i._id == this.item[key]);
        if (!maybe) return '-';
        return maybe[
            this.$store.state[this.model.schema[key].relation].display
            ];
      }
      return this.item[key] || '--';
    }
    ,
  }
  ,
}
;
</script>


<style lang='scss'>
.card-action {
  flex-direction: row-reverse;
}

.post-card {
  max-height: 600px;
  overflow: scroll;
}
</style>