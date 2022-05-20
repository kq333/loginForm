<template>
  <div>
    <div class="form" v-if="Array.isArray(serverResponse)">
      <div class="form__content">
        <div class="form__text-area">
          <div class="form__element">
            <BaseTextArea @text-area-update="textAreaUpdate" />
          </div>
          <div
            class="form__paragraf"
            v-if="isBtnSubmitClicked && getTextAreaValueLength >= 255"
            :style="{ color: '#f01c1ce5' }"
          >
            Text is required
          </div>
          <div
            class="form__paragraf"
            v-if="getTextAreaValueLength < 255 && getTextAreaValueLength >= 1"
          >
            You can still add {{ getTextAreaValueLength }} characters.
          </div>
          <div
            class="form__paragraf"
            v-if="getTextAreaValueLength == 0"
            :style="{ color: '#f01c1ce5' }"
          >
            You can’t enter more than 255 characters
          </div>
        </div>

        <div class="form__radio-btn">
          <p>Send confirmation</p>

          <div class="form__radio-element">
            <div class="form__element">
              <BaseRadioButton @radio-btn-value="radioBtnValueYes" />
            </div>
            <div class="form__element">
              <BaseRadioButton
                @radio-btn-value="radioBtnValueNo"
                radio-btn-value="No"
              />
            </div>
          </div>

          <div
            class="form__paragraf"
            v-if="isBtnSubmitClicked && getRadioBtnValue == false"
            :style="{ color: '#f01c1ce5' }"
          >
            Text is required
          </div>
        </div>

        <div class="form__select-option">
          <div class="form__element">
            <BaseSelectInput
              :select-option="selectOption"
              :select-option-label="selectOptionLabel"
              @input-select-value="inputSelectValue"
            />
          </div>

          <div
            class="form__paragraf"
            v-if="isBtnSubmitClicked && getSelectOptionValueBoolean == false"
            :style="{ color: '#f01c1ce5' }"
          >
            Text is required
          </div>
        </div>

        <div
          class="form__input-netto-value"
          v-if="getSelectOptionValueBoolean == true"
        >
          <div class="form__element">
            <BaseInput @input-form-value="inputFormValueNetto" />
          </div>

          <div
            class="form__paragraf"
            v-if="
              inputValueNetto.length > 0 && !getValidationInputValueByNumber
            "
            :style="{ color: '#f01c1ce5' }"
          >
            Please, input number
          </div>
        </div>

        <div class="form__input-brutto-value">
          <div class="form__element">
            <BaseInput
              v-if="getCalculatorBruttoValue"
              labelName="Price brutto EUR"
              :value-input="getCalculatorBruttoValue"
              :is-readonly="true"
            />
          </div>
        </div>

        <div class="form__submit-btn">
          <div class="form__element">
            <BaseButton @click="submitBtnEvent" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="form__baner"
      :class="{
        'form__baner--show-baner':
          serverResponse == 201 || typeof serverResponse === 'string',
      }"
    >
      <InformationBaner :server-response="serverResponse" />
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import BaseTextArea from "@/components/BaseTextArea.vue";
import BaseRadioButton from "@/components/BaseRadioButton.vue";
import BaseSelectInput from "@/components/BaseSelectInput.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import InformationBaner from "@/components/InformationBaner.vue";

defineProps({
  getTextAreaValueLength: {
    type: Number,
  },
  getRadioBtnValue: {
    type: Boolean,
    default: false,
  },
  selectOption: {
    type: Array,
  },

  selectOptionLabel: {
    type: String,
  },
  getSelectOptionValueBoolean: {
    type: Boolean,
    default: false,
  },
  getValidationInputValueByNumber: {
    type: Boolean,
    default: false,
  },

  inputValueNetto: {
    type: String,
  },

  getCalculatorBruttoValue: {
    type: Number,
    required: true,
  },
  getSendFormData: {
    type: Array,
    required: true,
  },
  serverResponse: {
    type: [Array, Number, String],
  },

  isBtnSubmitClicked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "textAreaUpdate",
  "radioButtonValueYes",
  "radioButtonValueNo",
  "inputSelectedValue",
  "inputFormValueNetto",
  "submitBtnEvent",
]);

function textAreaUpdate(payload) {
  emit("textAreaUpdate", payload);
}

function radioBtnValueYes(payload) {
  emit("radioButtonValueYes", payload);
}

function radioBtnValueNo(payload) {
  emit("radioButtonValueNo", payload);
}

function inputSelectValue(payload) {
  emit("inputSelectedValue", payload);
}

function inputFormValueNetto(payload) {
  emit("inputFormValueNetto", payload);
}

function submitBtnEvent() {
  emit("submitBtnEvent", true);
}
</script>
