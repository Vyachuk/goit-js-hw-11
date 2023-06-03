export const onItemHtml = item => {
    return `
        <div class="photo-card">
            <img height=170 src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes ${item.likes}</b>
                </p>
                <p class="info-item">
                    <b>Views ${item.views}</b>
                </p>
                <p class="info-item">
                    <b>Comments ${item.comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads ${item.downloads}</b>
                </p>
            </div>
        </div>`
}