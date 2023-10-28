const { log } = console;

export const postData = async (url, options) => {
    try {
        const { value: token } = await Swal.fire({
            title: "Ingrese Token",
            input: "password",
            inputLabel: "Token",
            inputPlaceholder: "Ingrese token",
            inputAttributes: {
                maxlength: 100,
                autocapitalize: "off",
                autocorrect: "off",
            },
        });

        if (token) {
            let response = await fetch(url, {
                ...options,
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error();
                return;
            }

            Swal.fire({
                position: "top-end",
                icon: "success",
                text: "Se cargó exitosamente los datos en el dataset",
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            Swal.fire({
                icon: "error",
                text: "No se ingresó el token",
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    } catch (error) {
        log({ error });

        Swal.fire({
            icon: "error",
            text: "Algo salió mal en la carga",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1000,
        });
    }
};

export const getData = async (url, options) => {
    try {
        let response = await fetch(url, options);
        let returnValue = await response.json();
        return returnValue;
    } catch (error) {
        log({ error });
        Swal.fire({
            icon: "error",
            text: "No se pudo obtener los datos",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1000,
        });
    }
};
