import * as Vue from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { URL } from "./config.js";
import { postData, getData } from "./data.controller.js";

const { log } = console;
const { createApp } = Vue;

const dataInit = {
    data: function () {
        return {
            metadata: "./asset/js/metadata.json",
            api_uri: URL + "?sort_by=fecha_muestra&sort_order=desc&limit=10",
            cols: [],
            data: [],
        };
    },

    async created() {
        let res = await fetch(this.metadata);
        this.cols = await res.json();
        this.data = await getData(this.api_uri, { method: "GET" });
    },

    method: {
        getData,
    },
};

createApp(dataInit).mount("#app");

document.getElementById("loadData").addEventListener("click", (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById("form-data"));
    let obj = {};
    data.forEach((value, key) => {
        obj[key] = value;
    });

    const { fecha_muestra, aspecto, pseudomonas_aeruginosa } = obj;
    if (fecha_muestra == "" || aspecto == "" || pseudomonas_aeruginosa == "") {
        alert("Debes completar los campos requeridos");
        return;
    }

    document.getElementById("clearData").click();
    postData(URL, { method: "POST", body: data });
});
