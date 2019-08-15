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
        searchBtn = document.querySelector('.search-btn'),
        goods = document.querySelector('.goods');


    function hotCheck() {
        cards.forEach((card) => {
            if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {

                    card.parentNode.remove();
                }
            } else {


                goods.appendChild(card.parentNode);
            }

        });
        currentCards().forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            if ((min.value && price < min.value) || (max.value && price > max.value)) {

                card.parentNode.remove();

            } else {
                goods.appendChild(card.parentNode);

            }
        });


    }

    function filterPrice() {

        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            if ((min.value && price < min.value) || (max.value && price > max.value)) {

                card.parentNode.remove();

            } else {
                goods.appendChild(card.parentNode);

            }
        });
        currentCards().forEach((card) => {
            if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {

                    card.parentNode.remove();
                }
            } else {


                goods.appendChild(card.parentNode);
            }

        });
    }
    discountCheckbox.addEventListener('click', hotCheck);
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

    searchBtn.addEventListener('click', () => {

        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.remove();

            } else {
                goods.appendChild(card.parentNode);

            }
            search.value = "";
            min.value = "";
            max.value = "";

        });

    });

}
toggleCheckbox();
toggleCart();
addCart();
actionPage();
//end фильтр акции
