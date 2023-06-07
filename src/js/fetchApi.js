import axios from 'axios';
const API_KEY = '36986465-56bab1af629ac84504d809b09';

export function fetchApi({name, page }) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: name,
        image_type: 'photo',
        pretty: true,
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
    });
    try {
        return axios.get(`https://pixabay.com/api/?${searchParams}`)
    } catch (error) {
        console.log(error);
    }
}
