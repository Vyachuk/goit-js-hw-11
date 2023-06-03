import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchApi } from './fetchApi';
import onItemHtml from './photoCard';

const ref = {
    gallery: document.querySelector('.gallery'),
    form: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
}

ref.form.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = ref.form.elements.searchQuery.value;
    fetchApi(inputValue)
        .then(data => {
            const dataArr = data.hits.map(item => {
                return onItemHtml(item);
            }).join('')
            ref.gallery.innerHTML = dataArr;
            ref.loadMoreBtn.classList.toggle('is-hidden')
        })
        .catch(e => {
            console.log(e);
            Report.failure('Sorry, there are no images matching your search query. Please try again.');
    })
    
})



