const { log } = console;

export const postData = async (url, options) => {
    try {
        let response = await fetch(url, options);

        if (!response.ok) {
            throw new Error();
            return;
        }

        alert("Cargaste el registro exitosamente!");
        //document.location = "/";
    } catch (error) {
        log({ error });
        alert("Oops, algo salió mal");
    }
};

export const getData = async (url, options) => {
    try {
        let response = await fetch(url, options);
        let returnValue = await response.json();
        return returnValue;
    } catch (error) {
        log({ error });
        alert("Oops, algo salió mal");
    }
};
