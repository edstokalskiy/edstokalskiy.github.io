<template>
  <v-container>
    <div class="text-center">
      <h1>Рекламодавець</h1>
    </div>

    <Booking class="my-15"/>

    <Search/>

    <h2 class="my-5">Дступні сайти:</h2>

    <Range />

    <List />

  </v-container>
</template>
<script>
import List from "@/components/List.vue";
import Search from "@/components/Search.vue";
import Range from "@/components/Range.vue";
import Booking from "@/components/Booking.vue";
export default {
  name: 'Advertiser',
  components: {
    Booking,
    List,
    Search,
    Range,
  },
}
</script>