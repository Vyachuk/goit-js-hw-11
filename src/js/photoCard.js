export const onItemHtml = item => {
    return `
        <div class="photo-card">
            <img height=170 src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    Likes <br> ${item.likes}
                </p>
                <p class="info-item">
                    Views <br> ${item.views}
                </p>
                <p class="info-item">
                    Comments <br> ${item.comments}
                </p>
                <p class="info-item">
                    Downloads <br> ${item.downloads}
                </p>
            </div>
        </div>`
}