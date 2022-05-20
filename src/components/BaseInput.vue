<template>
<div>
  <label :for="labelName">{{ labelName }} </label>
  <input
    type="text"
    class="baseInput"
    v-model="inputValue"
    @input="inputEmitValues"
    :readonly="isReadonly"
    :name="labelName"
  />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watchEffect } from "vue";

const props = defineProps({
  labelName: {
    type: String,
    default: "Price netto EUR",
  },
  valueInput: {
    type: Number,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["inputFormValue"]);

const inputValue = ref();

watchEffect(() => (inputValue.value = props.valueInput));

function inputEmitValues() {
  emit("inputFormValue", inputValue.value);
}
</script>
