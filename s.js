var cartIcon=document.querySelector("#cartIcon");
var closeIcon=document.querySelector(".fa-times");
var cart=document.querySelector(".cart");

cartIcon.onclick=()=>{
    cart.classList.add("active")
}

closeIcon.onclick=()=>{
    cart.classList.remove("active")
};

if(document.readyState='loading'){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
};

function ready(){
    var removeIcon=document.getElementsByClassName("fa-trash");
    for(var i=0; i<removeIcon.length; i++){
        var button=removeIcon[i];
        button.addEventListener("click", removeIconItem)
    };

    var addToCart=document.getElementsByClassName("addcart");
    for(var i=0; i<addToCart.length; i++){
        var button=addToCart[i];
        button.addEventListener("click", addToCartProduct)
    };

     var inputQuantity=document.getElementsByClassName("cartQuantity");
    for(var i=0; i<inputQuantity.length; i++){
        var input=inputQuantity[i];
        input.addEventListener("change", inputQuantityChanged)
    };
    loadCartItems()
};

function addToCartProduct(event){
    var button=event.target;
    var shopProduct=button.parentElement;
    var title=shopProduct.getElementsByClassName("productTitle")[0].innerText;
    var price=shopProduct.getElementsByClassName("productPrice")[0].innerText;
    var productImg=shopProduct.getElementsByClassName("productImg")[0].src;
    addToProductCart(title, price, productImg);
    updateTotal();
    updateCartIcon();
    saveCartItems()
};

function  addToProductCart(title, price, productImg){
    var cartProduct=document.createElement("div");
    cartProduct.classList.add("cartBox");
    var cartItems=document.getElementsByClassName("cartContent")[0];
    var cartItemNames=cartItems.getElementsByClassName("cartProductTitle");
    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText===title){
            alert("add this product in cart page");
            return;
        }
    }

    var cartContentBox=`
    
    <img src="${productImg}" alt="" class="cartImg">
                    <div class="detiles1">
                        <h3 class="cartProductTitle">${title}</h3>
                        <h4 class="cartProductPrice">${price}</h4>
                        <input type="number" value="1" class="cartQuantity" style="width: 45px;">
                    </div>
                    <i class="fa fa-trash" style="font-size: 25px;"></i>
    
    
    `;

    cartProduct.innerHTML=cartContentBox;
    cartItems.append(cartProduct);
    cartProduct.getElementsByClassName("fa-trash")[0].addEventListener("click", removeIconItem);
    cartProduct.getElementsByClassName("cartQuantity")[0].addEventListener("change", inputQuantityChanged);
    saveCartItems()
}

function inputQuantityChanged(event){
    var input=event.target;
    if(isNaN(input.value)|| input.value <=0){
        input.value=1
    };
    updateTotal();
    updateCartIcon();
    saveCartItems()
}

function removeIconItem(event){
    var button=event.target;
    button.parentElement.remove();
    updateTotal();
    updateCartIcon();
    saveCartItems()
};

function updateTotal(){
    var cartContent=document.getElementsByClassName("cartContent")[0];
    var cartBoxes=cartContent.getElementsByClassName("cartBox");
    var total=0;


    for(var i=0; i<cartBoxes.length; i++){
        var cartBox=cartBoxes[i];
        var priceElement=cartBox.getElementsByClassName("cartProductPrice")[0];
        var quantityElement=cartBox.getElementsByClassName("cartQuantity")[0];
        var price=parseFloat(priceElement.innerText.replace("$", ""));
        var quantity=quantityElement.value;
        total +=price*quantity
    }
    total=Math.round(total*100)/100;
    document.getElementsByClassName("totalPrice")[0].innerText="$"+total;
    localStorage.setItem("cartTotal", total)
}

function updateCartIcon(){
    var cartBoxes=document.getElementsByClassName("cartBox");
    var quantity=0;


    for(var i=0; i<cartBoxes.length; i++){
        var cartBox=cartBoxes[i];
        var quantityElement=cartBox.getElementsByClassName("cartQuantity")[0];
        quantity+=parseInt(quantityElement.value)
    }
    var cartIcon=document.querySelector("#cartIcon");
    cartIcon.setAttribute("data-quantity", quantity)
};

function saveCartItems(){
    var cartContent=document.getElementsByClassName("cartContent")[0];
    var cartBoxes=cartContent.getElementsByClassName("cartBox");
    var cartItems=[];


    for(var i=0; i<cartBoxes.length; i++){
        var cartBox=cartBoxes[i];
        var quantityElement=cartBox.getElementsByClassName("cartQuantity")[0];
        var priceElement=cartBox.getElementsByClassName("cartProductPrice")[0];
        var titleElement=cartBox.getElementsByClassName("cartProductTitle")[0];
        var productImg=cartBox.getElementsByClassName("cartImg")[0].src;

        var item={
            title:titleElement.innerText,
            price:priceElement.innerText,
            quantity:quantityElement.value,
            productImg:productImg
        }
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
};

function loadCartItems(){
    var cartItems=localStorage.getItem("cartItems");
    if(cartItems){
        cartItems=JSON.parse(cartItems);

        for(var i=0; i<cartItems.length; i++){
            var item=cartItems[i];
            addToProductCart(item.title, item.price, item.productImg);

            var cartBoxes=document.getElementsByClassName("cartBox");
            var cartBox=cartBoxes[cartBoxes.length-1];
            var quantityElement=cartBox.getElementsByClassName("cartQuantity")[0];
            quantityElement.value=item.quantity
        }
    }
     var cartTotal=localStorage.getItem("cartTotal");
    if(cartTotal){
        document.getElementsByClassName("totalPrice")[0].innerText="$"+cartTotal
    };
    updateCartIcon();
}