import { apiIsoMed } from "../../helpers/axios";

export const agregarEntrevista = async (data: unknown): Promise<unknown> => {
   try {
        const response = await apiIsoMed.post('/entrevistas', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.warn(error);
    }
}