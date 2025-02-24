
<template>
    <div>
        <button class="custom-button" @click="sendReplyButton">{{ $t("common.addReview") }}</button>

        <div v-if="showReplyField">
            <!-- Chama o componente do formulário para inserir as informações do comentário -->
            <CommentForm @add-reply="addReply"></CommentForm>
        </div>
    </div>
    <div>
        <div class="comment-list">
            <!-- Passa por todos os comentários em comments e renderiza -->
            <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
        </div>
    </div>
</template>

<script setup>
import CommentItem from "./CommentItem.vue";
import CommentForm from "./CommentForm.vue";
import { ref } from "vue";

//Define o parâmetro
const props = defineProps(["comments"]);

//Referência para o botão de enviar
const showReplyField = ref(false);
const newReply = ref("");

//Decide se o botão de enviar deve aparecer ou não
const sendReplyButton = () => {
    showReplyField.value = !showReplyField.value;
};

//Adiciona o comentário novo depois de ter passado pelo componente do formulário e da um push para enviar para a lista de comments
const addReply = (newReply) => {
    props.comments.unshift(newReply);
    showReplyField.value = false;
};
</script>

<style lang="scss" scoped>

@import "../assets/styles/variables"; // Importa as variáveis SCSS

.custom-button {
    background-color: $primary-color;
    color: white;
    font-weight: 500;
    height: 35px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: $background-color 0.3s ease;

    &:hover {
        background-color: darken($primary-color, 10%);
    }
}

.reply-input {
    background-color: $background-color;
    height: 40px;
    width: 900px;
    margin-top: 30px;
    color: black;
    margin-right: 15px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

.comment-list {
    margin-top: 20px;
}
</style>
