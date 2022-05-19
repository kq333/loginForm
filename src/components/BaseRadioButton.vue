<template>
  <label :for="radioBtnValue"> {{ radioBtnValue }}</label>
  <input
    class="radio-button"
    type="radio"
    :id="radioBtnValue"
    name="buttonRadio"
    :value="radioBtnValue"
    @change="getValueBtn"
  />
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

defineProps({
  radioBtnValue: {
    type: String,
    default: "Yes",
  },
});

const emit = defineEmits(["radioBtnValue"]);

function getValueBtn(payload) {
  emit("radioBtnValue", payload.target.value);
}
</script>

<style lang="scss" scoped>
input {
  width: 20px;
}

label {
  font-weight: 400;
}
</style>
