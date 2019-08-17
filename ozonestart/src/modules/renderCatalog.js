export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
        catalogList = document.querySelector('.catalog-list'),
        catalogBtn = document.querySelector('.catalog-button'),
        catalogWrapper = document.querySelector('.catalog'),
        goods = document.querySelector('.goods'),
        categories = new Set().add('Все товары'),
        textBtn = document.querySelector('.catalog-button .span-button');

    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });

    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);

    });

    catalogBtn.addEventListener('click', (event) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';

        } else {
            catalogWrapper.style.display = 'block';
        }

        if (event.target.tagName === "LI") {
            if (event.target.textContent === 'Все товары') {
                textBtn.textContent = event.target.textContent;
                
                cards.forEach((card) => {
                    goods.appendChild(card.parentNode);
                });
            } else {
                textBtn.textContent = event.target.textContent;
                cards.forEach((card) => {
                    if (card.dataset.category === event.target.textContent) {
                        goods.appendChild(card.parentNode);
                    } else {
                        card.parentNode.remove();
                    }
                });
            }
        }
    });
}