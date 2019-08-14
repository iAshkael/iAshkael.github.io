'use strict';
//чекбокс
const checkbox = document.getElementById('discount-checkbox');

checkbox.addEventListener('change', function(){
if (this.checked){
    this.nextElementSibling.classList.add('checked');
    } else{
    this.nextElementSibling.classList.remove('checked');  
    }
});
//end чекбокс
//cart

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
//end cart

//работа с корзиной

const cards = document.querySelectorAll('.goods .card'),
      cartWrapper = document.querySelector('.cart-wrapper'),
      empty = document.getElementById('cart-empty'),
      count = document.querySelector('.counter'),
      cartTotalPrice = document.querySelector('.cart-total span');
    

cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cardClone.querySelector('button').textContent = 'Удалить из корзины';
        //Удаление товара-------------------------------------------------------------------
        cardClone.querySelector('button').addEventListener('click', function(){
            cardClone.remove();
            showData();
            totalPriceChange(cardClone.querySelector('.card .card-price').textContent, false);
        });
        //end Удаление товара---------------------------------------------------------------
        cartWrapper.appendChild(cardClone);
        empty.remove();
        showData();
        // Total Price Change
        totalPriceChange(card.querySelector('.card .card-price').textContent, true);
        //end Total Price Change
        
      
    });
});

function showData (){
    const cardsCart = cartWrapper.querySelectorAll('.card');
    count.textContent = cardsCart.length;
    if(count.textContent === "0"){
        cartWrapper.appendChild(empty);
    }

}
function totalPriceChange (price, addRemove){
    if(addRemove){
        cartTotalPrice.textContent = parseInt(cartTotalPrice.textContent) + parseInt(price);
    } else{
        cartTotalPrice.textContent = parseInt(cartTotalPrice.textContent) - parseInt(price);
    }
    
}
//end работа с корзиной