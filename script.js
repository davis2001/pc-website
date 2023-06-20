const burgerParts = document.querySelectorAll(".burger-part");
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-box");
const navBg = document.querySelector("#nav-bg");
var navOpen = false;
var cartOpen = false;
const logo = document.querySelector(".logo");
const pcs = document.getElementsByClassName("pc");

burger.addEventListener("click", toggleNav);
navBg.addEventListener("click", () => {
  if (navOpen) {
    toggleNav();
  } else if (cartOpen) {
    toggleCart();
  }
})

document.getElementById("to-pc").addEventListener("click", scrollToPc);


function scrollToPc() {
  if (screen.width < 753) {
    window.scrollTo({
      top: 532,
      left: 0,
      behavior: 'smooth'
    });
  } else if (screen.width > 753 && screen.width < 1300) {
    window.scrollTo({
      top: 757,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo({
      top: 1128,
      left: 0,
      behavior: 'smooth'
    });
  }
}

function toggleNav() {
    burgerParts.forEach((item) => {
      item.classList.toggle("active");
  });
  nav.classList.toggle("active");
  navBg.classList.toggle("active");
  document.getElementById("shopping-cart-container").style.zIndex = "0";
  if (!navOpen) {
    navOpen = true;
  } else {
    navOpen = false;
  }
  if (cartOpen) {
    toggleCart();
  }
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
  if (!cartOpen) {
    cartOpen = true;
  } else {
    cartOpen = false;
  }
  if (cartOpen) {
    document.getElementById("shopping-cart-container").style.zIndex = "13";
  }
  navBg.classList.toggle("active");
}

document.getElementById("shopping-cart-container").addEventListener("click", toggleCart);

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (!navOpen && !cartOpen) {
    if (prevScrollpos > currentScrollPos) {
      document.querySelector("nav").style.top = "0";
    } else {
      document.querySelector("nav").style.top = "-50px";
    }
  }
  prevScrollpos = currentScrollPos;
}

function ScrollToCoords() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

logo.addEventListener("click", ScrollToCoords);
let totalPrice = 0;
document.getElementById("total-price").innerHTML = "Total cost: $" + totalPrice + ".00";
var cartItems = 0;
var cartItemAmount = 0;
document.getElementById("shopping-amount").innerHTML = cartItems;

function checkIfEmpty() {
    if (cartItems > 0) {
      document.getElementById("empty-cart").style.display = "none";
  } else {
      document.getElementById("empty-cart").style.display = "block";
  }
}

document.getElementById("clear-all").addEventListener("click", removeAll);

function removeAll() {
   if (cartItems > 0) {
       var cartItemsList =  document.querySelectorAll(".pc-cart");
   cartItemsList.forEach((item) => {
        item.remove();
    });
    totalPrice = 0;
    cartItems = 0;
    checkIfEmpty();
    addBuyNow();
   }
    document.getElementById("total-price").innerHTML = "Total cost: $" + totalPrice + ".00";
    document.getElementById("shopping-amount").innerHTML = cartItems;
    checkIfEmpty();
}

//Buy now button code //
var buyNow = document.createElement("button");
buyNow.addEventListener("click", () => {
    alert("You bought " + cartItems + " items for " + totalPrice + ".00$");
})
buyNow.setAttribute("id", "buy-now");
buyNow.innerHTML = "Buy Now";
var buyNowIcon = document.createElement("i");
buyNowIcon.classList.add("fa", "fa-shopping-cart");
buyNowIcon.setAttribute("id", "buy-now-icon");
buyNow.append(buyNowIcon) ;
    
var buttonAdded = false;

function addBuyNow() {
    if (cartItems > 0 && !buttonAdded) { 
     document.getElementById("clear-all").after(buyNow);
     buttonAdded = true;
    } else if (cartItems === 0) {
        document.getElementById("buy-now").remove();
        buttonAdded = false;
    }
    
}

function cartOnclick() {
  document.querySelector("nav").style.top = "0px";
  var shoppingCart = document.querySelector("#main-cart");
  shoppingCart.style.color = "rgb(4, 213, 228)" 
  setTimeout(() => {
    shoppingCart.style.color = "white"
  }, 800);
}

function addToCart(item, price) {
  totalPrice += price;
  cartItems += 1;
  var clonedItem = pcs[item].cloneNode(true);
  clonedItem.removeChild(clonedItem.lastElementChild);
  clonedItem.classList.remove("pc");
  clonedItem.classList.add("pc-cart");
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-button");
  trashButton.append(document.createElement("i"));
  trashButton.querySelector("i").classList.add("fa", "fa-trash-o");
  clonedItem.append(trashButton);
  cartItemAmount += 1;
  clonedItem.setAttribute("id", cartItemAmount)
  trashButton.setAttribute("onclick", "removeItem(" + cartItemAmount + ")");
  trashButton.setAttribute("value", price);
  document.getElementById("cart-items").append(clonedItem);
  document.getElementById("total-price").innerHTML = "Total cost: $" + totalPrice + ".00";
  document.getElementById("shopping-amount").innerHTML = cartItems;
  checkIfEmpty();
  addBuyNow();
  cartOnclick()
}

function removeItem(which) {
    totalPrice -= Number(document.getElementById(which).querySelector("button").getAttribute("value"));
    document.getElementById(which).remove();
    cartItems -= 1;
    cartItemAmount++;
    document.getElementById("shopping-amount").innerHTML = cartItems;
    document.getElementById("total-price").innerHTML = "Total cost: $" + totalPrice + ".00";
    checkIfEmpty();
    addBuyNow();
}
