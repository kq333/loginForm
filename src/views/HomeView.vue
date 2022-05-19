<template>
  <div class="home-view">
    <main class="home-view__main">
      <section class="home-view__form-section">
        <ValidationForm
          @text-area-update="textAreaUpdate"
          @radio-button-value-yes="radioBtnValue"
          @radio-button-value-no="radioBtnValue"
          @input-selected-value="inputSelectedValue"
          @input-form-value-netto="inputFormValueNetto"
          @submit-btn-event="submitBtnEvent"
          :get-text-area-value-length="getTextAreaValueLength"
          :get-radio-btn-value="getRadioBtnValue"
          :select-option="selectOption"
          select-option-label="Choose VAT"
          :get-select-option-value-boolean="getSelectOptionValueBoolean"
          :get-validation-input-value-by-number="
            getValidationInputValueByNumber
          "
          :input-value-netto="inputValueNetto"
          :get-calculator-brutto-value="getCalculatorBruttoValue"
          :get-send-form-data="getSendFormData"
          :server-response="serverResponse"
          :is-btn-submit-clicked="isBtnSubmitClicked"
        />
      </section>
    </main>
  </div>
</template>

<script setup>
import ValidationForm from "../components/ValidationForm.vue";
import { useStore } from "vuex";
import { computed, watch } from "vue";

const store = useStore();

const isBtnSubmitClicked = computed(() => store.state.isBtnSubmit);
const getTextAreaValueLength = computed(
  () => store.getters.getTextAreaValueLength
);
const getRadioBtnValue = computed(() => store.getters.getRadioBtnBoolean);
const selectOption = computed(() => store.state.selectOption);
const getSelectOptionValueBoolean = computed(
  () => store.getters.getSelectOptionValueBoolean
);
const getValidationInputValueByNumber = computed(
  () => store.getters.getValidationInputValueByNumber
);
const inputValueNetto = computed(() => store.state.inputValueNetto);
const getCalculatorBruttoValue = computed(
  () => store.getters.getCalculatorBruttoValue
);
const getSendFormData = computed(() => store.getters.getSendFormData);
const serverResponse = computed(() => store.state.serverResponse);

watch([getSendFormData, isBtnSubmitClicked], () => {
  getSendFormData.value.length > 0 && isBtnSubmitClicked.value == true
    ? store.dispatch("sendDataToServer")
    : "";
});

function textAreaUpdate(payload) {
  store.dispatch("textAreaValue", payload);
}

function radioBtnValue(payload) {
  store.dispatch("radioBtnValue", payload);
}

function inputSelectedValue(payload) {
  store.dispatch("inputSelectedValue", payload);
}

function inputFormValueNetto(payload) {
  store.dispatch("inputFormValueNetto", payload);
}

function submitBtnEvent(payload) {
  store.dispatch("buttonSubmitEvent", payload);
}
</script>
