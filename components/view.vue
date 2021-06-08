<template>
    <div>
        <v-toolbar class='mb-6'>
            <v-text-field
                    v-model='search'
                    clearable
                    flat
                    hide-details
                    prepend-inner-icon='mdi-magnify'
                    solo
            ></v-text-field>

            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <fookie-post v-if='post' :model='model' />
        </v-toolbar>

        <v-data-iterator
                :items='items'
                :items-per-page.sync='itemsPerPage'
                :page.sync='page'
                :search='search'
                sort-by='createdAt'
                :sort-desc='sortDesc'
                disable-pagination
                hide-default-footer
                no-data-text='İçerik bulunamadı'
                no-results-text='Aramanızla eşleşen içerik yok'
        >

            <template v-slot:default='props'>
                <v-row>
                    <v-col
                            v-for='item in props.items'
                            :key="item._id+'_viewitem'"
                            cols='12'
                            md='3'
                            sm='6'
                    >
                        <v-card color='post-card'>
                            <v-card-title class='subheading font-weight-bold'>{{
                                    item[model.display]
                                }}
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
                                        {{ getContent(item, key) }}
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
                                    <fookie-post
                                            :model='model'
                                            :selectedId='item._id'
                                            v-if='patch'
                                    />
                                    <fookie-delete
                                            v-if='remove'
                                            :model='model'
                                            :selectedId='item._id'
                                    />
                                </v-btn-toggle>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
        </v-data-iterator>
    </div>

</template>


<script>
export default {
    props: ['model', 'query', 'post', 'remove', 'patch', 'panel'],
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
    },
    computed: {
        items() {
            if (this.sortBy == null || this.sortBy == 'Tümü') {
                return this.model.pool;
            } else {
                return this.model.pool.filter((x) => x.status === this.sortBy);
            }
        },
        keys() {
            return ['_id'].concat(Object.keys(this.model.schema));
        },
        numberOfPages() {
            return Math.ceil(this.items.length / this.itemsPerPage);
        },
    },
    methods: {
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1;
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1;
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number;
        },
        getContent(item, key) {
            if (key == '_id') return item[key];
            if (typeof this.model.schema[key].relation === 'string') {
                let maybe = this.$store.state[
                        this.model.schema[key].relation
                        ].pool.find((i) => i._id == item[key]);
                if (!maybe) return '-';
                return maybe[
                        this.$store.state[this.model.schema[key].relation].display
                        ];
            }
            return item[key] || '--';
        },
    },
};
</script>


<style lang='scss'>
.card-action {
    flex-direction: row-reverse;
}
.post-card{
  max-height: 600px;
  overflow:scroll;
}
</style>