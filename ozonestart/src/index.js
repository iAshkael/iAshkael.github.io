'use strict';

function currentCards() {
    return document.querySelectorAll('.goods .card');
}
//чекбокс
function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');
    checkbox.forEach(function (element) {
        element.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}
//end чекбокс
//cart
function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');

    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    const closeBtn = document.querySelector('.cart-close');
    closeBtn.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}
//end cart
//работа с корзиной
function addCart() {
    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        empty = document.getElementById('cart-empty'),
        count = document.querySelector('.counter');


    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();
            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');
        let sum = 0;
        count.textContent = cardsCart.length;

        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });
        cardTotal.textContent = sum;
        if (cardsCart.length !== 0) {
            empty.remove();
        } else {
            cartWrapper.appendChild(empty);
        }
    }
}
//end работа с корзиной
//фильтр акции
function actionPage() {

    const discountCheckbox = document.getElementById('discount-checkbox'),
        cards = document.querySelectorAll('.goods .card'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');

    //фильтр
    function filter() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount = card.querySelector('.card-sale');
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }

        });
    }
    //end фильтр
    //поиск
    function textSearch() {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';

            } else {
                card.parentNode.style.display = '';

            }


        });
        //end поиск
    }
    discountCheckbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);
    search.addEventListener('keyup', textSearch);
    searchBtn.addEventListener('click', textSearch);

}
//end фильтр акции

//получение данных с сервера

function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('https://iashkael.github.io/ozonestart/db/db.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Данные не были получены ошибка: ' + response.status);
            }
        }).then((data) => {
            return data;
        })
        .catch((err) => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div style="color:red; font-soze:30px;">Упс, что-то пошло не так</div>';
        });

}
//выводим карточки товаров
function renderCards(data) {
    data.goods.forEach((good) => {
        const goodsWrapper = document.querySelector('.goods');
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
               <div class="card" data-category="${good.category}">
               ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}        
            <div class="card-img-wrapper">
                <span class="card-img-top"
                    style="background-image: url('${good.img}')"></span>
            </div>
            <div class="card-body justify-content-between">
                <div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} ₽</div>
                <h5 class="card-title">${good.title}</h5>
                <button class="btn btn-primary">В корзину</button>
            </div>
        </div>
        `;
        goodsWrapper.appendChild(card);
    });
}
//каталог

function renderCatalog() {
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

//end получение данных с сервера
getData().then((data) => {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();
});
