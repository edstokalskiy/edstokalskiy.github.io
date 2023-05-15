<template>
  <v-expansion-panels v-if="filteredList">
    <v-expansion-panel
      v-for="{id, url, attendance, advertisingType, lang, price, visibility, booked} in filteredList"
      :key="id"
    >
      <v-expansion-panel-header :class="{'hidden': !visibility}">
        <div class="d-flex justify-space-between">
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="4"
            >
              <h2>{{ url }}</h2>
            </v-col>
            <v-col
              cols="12"
              sm="8"
            >
              <div class="d-flex justify-end">
                <v-chip-group>
                  <v-chip
                    v-if="!visibility"
                    class="ma-2"
                    color="primary"
                    outlined
                    pill
                  >
                    приховано
                    <v-icon right>
                      mdi-cancel
                    </v-icon>
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="pink"
                    label
                    text-color="white"
                  >
                    <v-icon left>
                      mdi-label
                    </v-icon>
                    {{ `${advertisingType.title} (${price}$)` }}
                  </v-chip>
                  <v-chip
                    v-if="role === 'Master'"
                    class="ma-2"
                    color="deep-purple accent-4"
                    outlined
                    @click.stop="edit(id)"
                  >
                    <v-icon left>
                      mdi-wrench
                    </v-icon>
                    редагувати
                  </v-chip>
                  <v-chip
                    v-else
                    color="deep-purple accent-4"
                    outlined
                    @click.stop="book(id)"
                  >
                    <v-icon left>
                      mdi-shape-square-plus
                    </v-icon>
                    орендувати
                  </v-chip>
                </v-chip-group>
              </div>
            </v-col>
          </v-row>

        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-chip-group>
          <v-chip
            class="ma-2"
            color="green"
            outlined
          >
            Мова: {{ lang.title }}
          </v-chip>
          <v-chip
            class="ma-2"
            color="green"
            outlined
          >
            Відвідуваність: {{ attendance }}/міс
          </v-chip>
          <v-chip
            v-if="booked"
            class="ma-2"
            color="orange"
            text-color="white"
          >
            Орендовано з: {{ `${booked.date}, ${booked.time} на ${booked.countDays} діб` }}
            <v-icon right>
              mdi-star
            </v-icon>
          </v-chip>
        </v-chip-group>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <div v-else class="subtitle-1">У вас ще немає сайтів</div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({
      sites: 'getSites',
      visibleSites: 'getVisibleSites',
      role: 'getRole',
      query: 'getQuerySite',
    }),

    list() {
      const { role, sites, visibleSites } = this;
      return (role === 'Master' && sites) || (role === 'Advertiser') && visibleSites || null;
    },

    filteredList() {
      const { query, list, role } = this;
      return role === 'Advertiser' && query && list.filter(({url}) => url === query ) || list;
    }
  },
  methods: {
    ...mapMutations([
      'setEditableSiteId',
      'updateFormVisibilityStatus',
      'updateBookingVisibilityStatus',
      'setBookingId'
    ]),

    edit(id) {
      this.setEditableSiteId(id);
      this.updateFormVisibilityStatus(true);
    },

    book(id) {
      this.updateBookingVisibilityStatus(true);
      this.setBookingId(id);
    }
  }
}
</script>

<style lang="scss">
.v-expansion-panel-header {
  &.hidden {
    background: #4c0808;
  }
}
</style>