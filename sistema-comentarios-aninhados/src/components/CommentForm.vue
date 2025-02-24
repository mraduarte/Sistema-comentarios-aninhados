<template>
    <div class="review-area">
        <textarea 
            :class="{ 'reply-input': true, 'empty': isEmptyReply }" 
            v-model="newReply" 
            placeholder=" Adicione um comentário..." 
            rows="5"
        ></textarea>
        <button class="custom-button" @click="sendReply">{{ $t("common.sendComment") }}</button>

    </div>
    <span v-if="isEmptyReply" class="empty-reply"> {{ $t("common.emptyReplyMessage") }}</span>
</template>

<script setup>

import {ref} from "vue"

const newReply = ref("");
const emit = defineEmits(["add-reply"]);
let isEmptyReply = ref(false);

//Função que monta o json para o envio das respostas
const sendReply = () => {

    if(!newReply.value.length){
        isEmptyReply.value = true;
        return
    }

    isEmptyReply.value = false;

    if(newReply.value.trim()){
        const newComment = {
            id: Date.now().toString(),
            author: "Você",
            date: new Date().toISOString(),
            content: newReply.value,
            replies:[]
        };

        emit("add-reply", newComment);

        newReply.value = "";
    }
}

</script>

<style lang="scss" scoped>
@import "../assets/styles/variables"; // Importa as variáveis SCSS

.reply-input {
    background-color: $input-bg;
    width: 80%;
    margin-top: 30px;
    color: black;
    margin-right: 15px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    word-wrap: break-word;

    &.empty {
        border: 2px solid $error-color;
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

    &:hover {
        background-color: darken($primary-color, 10%);
    }
}

.empty-reply {
    font-size: 12px;
    color: $error-color;
    font-weight: 600;
    margin-top: 5px;
}

.review-area{
    display: flex;
    align-items: end;
}
</style>
