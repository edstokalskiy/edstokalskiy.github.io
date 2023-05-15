<template>
  <v-row v-if="range">
    <v-col
      cols="12"
      sm="4"
    >
      <div>Фыльтр за відвідуваністю:</div>
    </v-col>
    <v-col
      cols="12"
      sm="8"
    >
      <div class="d-flex align-start range-slider">
        <span class="range-slider__values">{{ range[0] }}</span>
        <v-range-slider
          v-model="range"
          :max="getRange[1]"
          :min="getRange[0]"
          step="10"
        />
        <span class="range-slider__values">{{ range[1] }}</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Range",
  computed: {
    ...mapGetters(['getRange']),
  },
  data() {
    return {
      range: null,
    }
  },
  watch: {
    range(val) {
      this.setFilteredRange(val);
    }
  },
  mounted() {
    this.range = [this.getRange[0], this.getRange[1]];
  },
  methods: {
    ...mapMutations(['setFilteredRange']),
  }
}
</script>

<style scoped lang="scss">
.range-slider {
  &__values {
    padding: 5px 10px;
    border-radius: 5px;
    background: #fff;
    min-width: 80px;
    color: #000;
    text-align: center;
    margin: 0 5px;
  }
}
</style>