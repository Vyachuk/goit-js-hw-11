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

ref.form.addEventListener('submit', e => {
    e.preventDefault();
    searchParam.name = ref.form.elements.searchQuery.value;
    if (!searchParam.name) {
        Notify.failure('Sorry, there are no searching text.');
        return;
    }
    fetchApiPage = 1;
    fetchApi(searchParam)
        .then(data => {
        if (data.hits.length === 0) {
            throw new Error()
        }
        Notify.info(`Hooray! We found ${data.totalHits} images`)
        const dataArr = data.hits.map(item => {
            return onItemHtml(item);
        }).join('')
        ref.gallery.innerHTML = dataArr;
        ref.loadMoreBtn.classList.toggle('is-hidden')
    })
    .catch(() => {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    })
})


ref.loadMoreBtn.addEventListener('click', () => {
    searchParam.page += 1;
    fetchApi(searchParam)
        .then(data => {
        if (searchParam.page * 40 > data.totalHits) {
            ref.loadMoreBtn.classList.toggle('is-hidden');
            Notify.info("We're sorry, but you've reached the end of search results.")
        }
        const dataArr = data.hits.map(item => {
            return onItemHtml(item);
        }).join('')
        ref.gallery.insertAdjacentHTML('beforeend', dataArr);
        }).catch(e => {
            console.log(e);
        })
})


