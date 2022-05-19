<template>
  <label for="Description">Description</label>
  <textarea
    class="text-area"
    maxlength="255"
    id="Description"
    name="Description"
    rows="8"
    cols="40"
    v-model="characterLength"
    @input="inputValue"
  ></textarea>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["textAreaUpdate"]);
const characterLength = ref();

function inputValue() {
  emit("textAreaUpdate", characterLength.value);
}
</script>
