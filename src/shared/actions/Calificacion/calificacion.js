export const addCalifiacion = async (newCalifiacion) => {
    try {
        const { data } = await appApi.post(`/calificacion`, newCalifiacion);
        return data;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};