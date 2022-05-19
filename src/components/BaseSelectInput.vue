<template>
  <label for="vat">Vat: </label>
  <select id="vat" class="inputs-form" @change="inputSelectOption">
    <option value="" selected disabled>{{ selectOptionLabel }}</option>
    <option v-for="item in selectOption" :key="item.value" :value="item.value">
      {{ item }}
    </option>
  </select>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  selectOption: {
    type: Array,
  },
  selectOptionLabel: {
    type: String,
  },
});

const emit = defineEmits(["inputSelectValue"]);

function inputSelectOption(payload) {
  emit("inputSelectValue", payload.target.value);
}
</script>
