import { createStore } from "vuex";
import axios from "axios";


export default createStore({
  state: {
    selectOption: ["19%", "21%", "23%", "25%"],
    selectOptionValue: "",
    textAreaValue: "",
    radioBtnEvent: "",
    inputValueNetto: "",
    isBtnSubmit: false,
    sendData: [],
    serverResponse: [],
  },
  getters: {
    getTextAreaValueLength: (state) => {
      return 255 - state.textAreaValue.length;
    },

    getBooleanValue: () => (param) => {
      return param == 0 ? false : true;
    },

    getRadioBtnBoolean: (state, getters) => {
      return getters.getBooleanValue(state.radioBtnEvent.length);
    },

    getSelectOptionValueBoolean: (state, getters) => {
      return getters.getBooleanValue(state.selectOptionValue.length);
    },

    getValidationInputValueByNumber: (state) => {
      const numbers = /^[0-9.,]+\.?[0-9]*$/;
      const validateInputValues = state.inputValueNetto.match(numbers);
      return validateInputValues ? true : false;
    },

    getCalculatorBruttoValue: (state) => {
      const replaceCommaToDot = state.inputValueNetto.replaceAll(",", ".");
      const calculatePercentageNumber =
        (replaceCommaToDot / 100) * parseFloat(state.selectOptionValue);
      const totalPriceBrutto =
        parseFloat(replaceCommaToDot) + calculatePercentageNumber;
      return totalPriceBrutto;
    },

    getSendFormData: (state, getters) => {
      const textAreaLength =
        getters.getTextAreaValueLength <= 254 ? true : false;

      const isRadioBtnClicked =
        getters.getRadioBtnBoolean == true ? true : false;

      return textAreaLength &&
        isRadioBtnClicked &&
        getters.getValidationInputValueByNumber
        ? (state.sendData = new Array({
            tax: state.selectOptionValue,
            nettoPrice: state.inputValueNetto,
            priceBrutto: getters.getCalculatorBruttoValue,
            text: state.textAreaValue,
          }))
        : (state.sendData = []);
    },
  },
  mutations: {
    SET_TEXT_AREA_VALUE(state, payload) {
      state.textAreaValue = payload;
    },

    SET_RADIO_BTN_VALUE(state, payload) {
      state.radioBtnEvent = payload;
    },
    SET_INPUT_SELECTED_VALUE(state, payload) {
      state.selectOptionValue = payload;
    },
    SET_INPUT_FORM_VALUE_Netto(state, payload) {
      state.inputValueNetto = payload;
    },

    SET_BUTTON_SUBMIT_EVENT(state, payload) {
      state.isBtnSubmit = payload;
    },

    SET_SERVER_RESPONSE(state, payload) {
      state.serverResponse = payload;
    },
  },

  actions: {
    textAreaValue({ commit }, payload) {
      commit("SET_TEXT_AREA_VALUE", payload);
      commit("SET_BUTTON_SUBMIT_EVENT", false);
    },

    radioBtnValue({ commit }, payload) {
      commit("SET_RADIO_BTN_VALUE", payload);
      commit("SET_BUTTON_SUBMIT_EVENT", false);
    },

    inputSelectedValue({ commit }, payload) {
      commit("SET_INPUT_SELECTED_VALUE", payload);
    },
    inputFormValueNetto({ commit }, payload) {
      commit("SET_INPUT_FORM_VALUE_Netto", payload);
      commit("SET_BUTTON_SUBMIT_EVENT", false);
    },

    buttonSubmitEvent({ commit }, payload) {
      commit("SET_BUTTON_SUBMIT_EVENT", payload);
    },

    async sendDataToServer({ commit }) {
      const data = this.state.sendData[0];

      try {
        const sendData = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          data
        );
        commit("SET_BUTTON_SUBMIT_EVENT", false);
        commit("SET_SERVER_RESPONSE", sendData.status);
      } catch (error) {
        console.log(error);
        commit("SET_SERVER_RESPONSE", error.message);
      }
    },
  },
  modules: {},
});
