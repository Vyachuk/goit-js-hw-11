import axios from 'axios';
const API_KEY = '36986465-56bab1af629ac84504d809b09';

export async function fetchApi(name) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: name,
        image_type: 'photo',
        pretty: true,
        orientation: 'horizontal',
        safesearch: true,
    });
    return axios.get(`https://pixabay.com/api/?${searchParams}`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    })
//   try {
//     const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
//       return response.data;
//   } catch (error) {
//     console.error(error);
//   }
}