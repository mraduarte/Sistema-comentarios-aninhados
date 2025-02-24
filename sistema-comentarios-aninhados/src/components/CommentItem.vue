
<template>
  <div class="comment">
    <div class="comment-field">
        <!-- Monta o formato do comentário, passando nome, data de postagem e o comentário. -->
        <p><strong>{{ comment.author }}</strong> - {{ new Date(comment.date).toLocaleString() }}</p>
        <p>{{ comment.content }}</p>
        <button @click="sendReplyButton" class="custom-button">{{ $t("common.respond") }}</button>

        <div v-if="showReplyField">
            <!-- Chama o componente do formulário para inserir as informações do comentário  -->
            <CommentForm @add-reply="addReply"></CommentForm>
        </div>
    </div>

    <div class="replies" v-if="comment.replies.length">
    <!-- Renderiza os comentários "filhos", as respostas dos comentários -->
      <CommentItem 
        class="reply" 
        v-for="reply in comment.replies" 
        :key="reply.id" 
        :comment="reply" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CommentForm from './CommentForm.vue'

//Define o parâmetro
const props = defineProps(["comment"]);

const showReplyField = ref(false);
const newReply = ref("");

//Define se o botão de enviar deve aparecer ou não
const sendReplyButton = () => {
    showReplyField.value = !showReplyField.value;
};

//Da um push na lista de replies dentro de comment para enviar a resposta de um comentário específico
const addReply = (newReply) => {
    props.comment.replies.unshift(newReply);
    showReplyField.value = false;
};

</script>
<style lang="scss" scoped>

@import "../assets/styles/variables"; // Importa as variáveis SCSS

.comment {
    margin-top: 50px;

    .comment-field {
        background-color: $background-color;
        padding: 20px;
        border-radius: 10px;
    }
}

.custom-button {
    background-color: $primary-color;
    color: white;
    font-weight: 500;
    height: 35px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: $background-color 0.3s ease;

    &:hover {
        background-color: darken($primary-color, 10%);
    }
}

.reply {
    margin-left: 60px;
}
</style>

