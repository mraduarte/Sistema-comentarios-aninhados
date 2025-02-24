
<template>
  <header>
    <h2 class="title">{{ $t("common.title") }}</h2>
  </header>
  <div class="container">
    <CommentList :comments="comments" />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import CommentList from "../src/components/CommentList.vue";

const comments = ref([]);

//Inicia com as informações do json
onMounted(async () => {
  const response = await fetch("/src/data/comments.json");
  comments.value = await response.json();
});
</script>

<style scoped>
.title {
  text-align: center;
  color: black;
  font-family: "Cinzel", serif;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

.container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

</style>
