import axios from 'axios';

const baseIsoMed = import.meta.env.VITE_API_ISOMED;

export const apiIsoMed = axios.create({
    baseURL: baseIsoMed,
});