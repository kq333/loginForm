<template>
  <div>
    <button class="universal-btn" :type="`${btnType}`">{{ text }}</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  btnType: {
    type: String,
    default: "submit",
  },
  text: {
    type: String,
    default: "submit",
  },
});
</script>
