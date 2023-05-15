<template>
  <v-container>
    <div class="text-center">
      <h1>Сторінка вебмайстра</h1>
      <Form class="my-15"/>
    </div>
    <h2 class="my-5">База сайтів:</h2>
    <List />
  </v-container>
</template>
<script>
import List from "@/components/List.vue";
import Form from "@/components/Form.vue";

export default {
  name: "Master",
  components: {
    Form,
    List,
  }
}
</script>