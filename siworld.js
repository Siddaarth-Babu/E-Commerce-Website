let carticon = document.querySelector('.icon');
let body = document.querySelector('body');
let closebutton = document.querySelector('#close') ;
let itemslist = document.querySelector('.itemslist');
let finalAmount = document.querySelector('#total-cost')
let addtocart = document.getElementsByClassName('cart');
let plusButton = document.getElementsByClassName('plus');
let minusButton = document.getElementsByClassName('minus');
let checkOut = document.querySelector('#checkout');
let showCards = document.getElementsByClassName('summary');
let cartNumber = document.querySelector('.cartQuantity');
// let loader = document.getElementById('preloader');
let bar = document.querySelector('#navbar');
let menu = document.querySelector('#menu');
let cross = document.querySelector('#cross');

if(menu){
    menu.addEventListener('click',()=>{
        bar.classList.add('active');
    })
}

if(cross){
    cross.addEventListener('click',()=>{
        bar.classList.remove('active');
    })
}
// window.addEventListener('load',()=>{
//     loader.remove();
// })


carticon.addEventListener('click',()=>{
    body.classList.toggle('cartvisible');
})

closebutton.addEventListener('click',()=>{
    body.classList.toggle('cartvisible');
})

itemslist.innerHTML='';
let totalCost=0;

for(let i=0;i<(addtocart.length);i++){
    addtocart[i].addEventListener('click',plusCart);
    payAmount();
}

checkOut.addEventListener('click',()=>{
    alert('Your order has been Placed \n Thank you. Visit Again :)');
    afterOrder();
    payAmount();

})

function updateCart(){
    let totalCount = document.getElementsByClassName('numberof');
    let displayCount = 0;
    for(let k=0;k<totalCount.length;k++){
        let countAlone = Number(totalCount[k].innerHTML);
        displayCount+=countAlone;
    }
    cartNumber.innerHTML = `${displayCount}`;
}

function afterOrder(){
    let child = itemslist.lastElementChild;
    while(child){
        itemslist.removeChild(child);
        child = itemslist.lastElementChild; 
    }
    for(let i=0;i<(addtocart.length);i++){
        addtocart[i].innerHTML = "Add to Cart";
        addtocart[i].classList.remove('active0');
    }
    cartNumber.innerHTML = '0';
}

function plusCart(event){
    let button = event.target;
    button.innerText = "Added to Cart";
    button.classList.add('active0');
    let newProduct = document.createElement('div');
        newProduct.classList.add(`${button.id}`);
        newProduct.classList.add('summary');
        let count=1;
        newProduct.innerHTML = 
        `<img class="cart-image" src="${button.dataset.imageSource}">
        <div class="product-name">${button.dataset.productName}</div>
        <div class="price">Rs <span class="productPrice">${button.dataset.productPrice}</span></div>
        <div class="quantity">
            <button class="minus">-</button>
            <span class="numberof">${count}</span>
            <button class="plus">+</button>
        </div>`

        itemslist.appendChild(newProduct);
        updateCart();


    for(let j=0;j<plusButton.length;j++){
        plusButton[j].addEventListener('click',updatePlus);
        payAmount();
    }
    for(let j=0;j<minusButton.length;j++){
        minusButton[j].addEventListener('click',updateMinus);
        payAmount();
    }
}

function updatePlus(event){
    let addButton = event.target;
    let parent = addButton.parentElement;
    let grandParent = parent.parentElement;
    let quantity = parent.querySelector('.numberof').innerText;
    quantity++;
    parent.querySelector('.numberof').innerText = `${quantity}`;
    updatePrice(quantity, grandParent);
    updateCart();
}

function updateMinus(event){
    let minusButton = event.target;
    let parent = minusButton.parentElement;
    let grandParent = parent.parentElement;
    let quantity = parent.querySelector('.numberof').innerText;
    let search = grandParent.classList[0];
    if(quantity!=1){
        quantity--;
        parent.querySelector('.numberof').innerText = `${quantity}`;
        updatePrice(quantity, grandParent);
        updateCart();
    }
    else{
        document.querySelector(`#${search}`).innerHTML = "Add to Cart";
        document.querySelector(`#${search}`).classList.remove('active0');
        grandParent.remove();
        updateCart();
        payAmount();
    }  
}

function updatePrice(num, relation){
    let rupee = relation.querySelector('.price span').innerHTML;
    let thenQuantity = relation.querySelector('.quantity .numberof').innerHTML; 
    let friend = relation.classList[0];
    let newSearch = document.querySelector(`#${friend}`);
    let initCost = newSearch.dataset.productPrice;
    let newRupee = num*Number(initCost);
    relation.querySelector('.price span').innerHTML = `${newRupee}`;
    payAmount();
}

function payAmount(){
    let cash = document.getElementsByClassName('productPrice');
    let payableCash = 0;
    for(let k=0;k<cash.length;k++){
        let cashAlone = Number(cash[k].innerHTML);
        payableCash+=cashAlone;
    }
    finalAmount.innerHTML = `${payableCash}`;
}





