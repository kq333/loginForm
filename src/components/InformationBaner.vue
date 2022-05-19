<template>
  <div
    class="modal"
    :class="{
      'modal--success': serverResponse == 201,
      'modal--error-warning': typeof serverResponse === 'string',
    }"
  >
    <div class="modal__content">
      <p class="modal__info-success" v-if="serverResponse == 201">Success</p>
      <p class="modal__info-error" v-if="typeof serverResponse === 'string'">
        {{ serverResponse }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  serverResponse: {
    type: [Array, Number, String],
  },
});
</script>
