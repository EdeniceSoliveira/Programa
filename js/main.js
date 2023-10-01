// Carrinho
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Abrir Carrinho
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// Fechar Carrinho
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// funcionamento do carrinho
  if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
  } else{
    ready();
  }

  // fazer a função
  function ready(){
    // remover coisas do carrinho
    var reomveCartButtons = document.getElementsByClassName('cart-remove');
    console.log(reomveCartButtons);
    for (var i = 0; i <reomveCartButtons.length; i++){
      var button = reomveCartButtons[i];
      button.addEventListener("click", removeCartItem);
    }
    // quantidade mudanças
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i <quantityInputs.length; i++){
      var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
    }
    // Adcionar ao carrinho
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i <addCart.length; i++){
      var button = addCart[i]
      button.addEventListener('click', addCartClicked);
    }
  }

  // remover coisas do carrinho
function removeCartItem(event){
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}
// quantity changes
function quantityChanged(event){
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
  updatetotal();
}
// adicionar ao carrinho
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;

  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText === title) {
      alert("Esse produto já foi adicionado ao carrinho");
      return;
    }
  }

  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");

  var cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
              <div class="cart-product-title">${title}</div>
              <div class="cart-price">${price}</div>
              <input type="number" value="1" class="cart-quantity">
            </div>
            <!-- Remover Carrinho -->
            <i class='bx bxs-trash cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener("change", quantityChanged);

  updatetotal();
}

// Update Total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.querySelector('.cart-price');
    var quantityElement = cartBox.querySelector('.cart-quantity');

    if (priceElement && quantityElement) {
      var price = parseFloat(priceElement.innerText.replace("R$", "").replace(",", "."));
      var quantity = quantityElement.value;
      total += price * quantity;
    }
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('total-price')[0].innerText = 'R$' + total.toFixed(2);
}
