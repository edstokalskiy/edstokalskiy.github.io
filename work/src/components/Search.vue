<template>
  <div class="my-10">
    <v-toolbar
      v-if="getVisibleSites"
      dark
      color="teal"
    >
      <v-toolbar-title>Пошук</v-toolbar-title>
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="result"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Почніть вводити назву сайту..."
        solo-inverted
      ></v-autocomplete>
    </v-toolbar>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Search",
  computed: {
    ...mapGetters(['getVisibleSites']),

    siteUrls() {
      return this.getVisibleSites.map(({url}) => url);
    }
  },
  data () {
    return {
      loading: false,
      result: [],
      search: null,
      select: null,
      filtered: false,
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val);

      if (!val && this.result.length) {
        this.result = [];
        this.filtered = false;
      }
    },

    select(val) {
      !val && this.setQuerySite(null) || this.setQuerySite(val);
    }
  },
  methods: {
    ...mapMutations(['setQuerySite']),

    querySelections (v) {
      this.loading = true
      this.filtered = true;
      // Simulated ajax query
      setTimeout(() => {
        this.result = this.siteUrls.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
  },
}
</script>