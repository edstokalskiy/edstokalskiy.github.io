<template>
	<v-container>
		<v-row class="text-center">
			<v-col cols="12">
				<v-img
					:src="require('../assets/logo.svg')"
					class="my-3"
					contain
					height="100"
				/>
			</v-col>

			<v-col class="mb-4">
				<h1 class="display-2 font-weight-bold mb-3">
						Обери свій профіль
				</h1>
			</v-col>

			</v-row>
      <div class="d-flex justify-center">
        <v-card
          v-for="{id, title, image, routeName} of types"
          :key="id"
          class="mx-10 my-12"
          max-width="374"
        >
          <v-img
            height="250"
            :src="image"
          ></v-img>

          <v-card-title>{{ title }}</v-card-title>

          <v-divider class="mx-4"></v-divider>

          <div class="text-center py-5">
            <v-btn
              rounded
              color="primary"
              dark
              @click="goToPage(routeName)"
            >
              Обрати
            </v-btn>
          </div>
        </v-card>
      </div>
	</v-container>
</template>

<script>
import {mapMutations} from "vuex";

export default {
	name: 'HomeView',
  data() {
    return {
      types: [
        {
          id: 1,
          title: 'Вебмайстер',
          routeName: 'Master',
          image: 'https://www.openstudycollege.com/osc/uploads/2019/11/DLC008-Webmaster-%E2%80%93-HTML-and-CSS-for-Beginners_backgroundimage.jpg',
        },
        {
          id: 2,
          title: 'Рекламодавець',
          routeName: 'Advertiser',
          image: 'https://www.strateligent.com/wp-content/uploads/2021/04/STR_BlogFeaturedImage_DigitalAdvertising.jpg',
        },
      ]
    }
  },
  methods: {
    ...mapMutations(['setRole']),

    goToPage(routeName) {
      this.setRole(routeName);
      this.$router.push({ name: routeName })
    },
  },
}
</script>
