import * as Vue from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { URL, TOKEN } from "./config.js";
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

    async mounted() {
        let res = await fetch(this.metadata);
        this.cols = await res.json();
        this.data = await getData(this.api_uri, {
            method: "GET",
            headers: { Authorization: `Bearer ${TOKEN}` },
        });
    },

    methods: {
        fetchLastData: async function () {
            try {
                let response = await fetch(this.api_uri, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${TOKEN}` },
                });
                let returnValue = await response.json();
                this.data = returnValue;
                Swal.fire({
                    icon: "success",
                    text: "Se sincronizaron con los datos recientes",
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: "No se pudieron obtener los datos",
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
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
    if (fecha_muestra == "" || aspecto == "") {
        Swal.fire({
            icon: "warning",
            text: "Debes completar los campos requeridos",
            allowOutsideClick: false,
        });
        return;
    }

    document.getElementById("clearData").click();
    postData(URL, { method: "POST", body: data });
});
