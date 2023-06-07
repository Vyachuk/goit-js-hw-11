import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchApi } from './fetchApi';
import { onItemHtml } from './photoCard';

let searchParam = {
    page: 1,
    name: null
}

const ref = {
    gallery: document.querySelector('.gallery'),
    form: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
}

ref.form.addEventListener('submit', async e => {
    e.preventDefault();
    searchParam.name = ref.form.elements.searchQuery.value.trim();
    searchParam.page = 1;
    console.log(searchParam.name);
    if (!searchParam.name) {
        Notify.failure('Sorry, there are no searching text.');
        return;
    }
    try {
        const { data } = await fetchApi(searchParam);

        if (data.hits.length === 0) {
            throw new Error()
        }

        Notify.info(`Hooray! We found ${data.totalHits} images`)
        const dataArr = data.hits.map(item => {
            return onItemHtml(item);
        }).join('')
        ref.gallery.innerHTML = dataArr;
        if (searchParam.page * 40 < data.totalHits) {
            ref.loadMoreBtn.classList.remove('is-hidden');
        }
    } catch (error) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
})


ref.loadMoreBtn.addEventListener('click', async e => {
    searchParam.page += 1;
    try {
        const { data } = await fetchApi(searchParam);
        if (searchParam.page * 40 > data.totalHits) {
            ref.loadMoreBtn.classList.add('is-hidden');
            Notify.info("We're sorry, but you've reached the end of search results.")
        }
        const dataArr = data.hits.map(item => {
            return onItemHtml(item);
        }).join('')
        ref.gallery.insertAdjacentHTML('beforeend', dataArr);
    } 
    catch (error) {
        console.log(e);
    }
})


