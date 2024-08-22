// 商品資料
const products = {
    lightPainting: { name: "客製燈光畫", price: 500 },
    phoneGrip: { name: "手機氣囊支架", price: 330 }
};

// 購物車
let cart = [];

// 添加到購物車
function addToCart(productKey) {
    const product = products[productKey];
    const cartItem = cart.find(item => item.name === product.name);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
}

// 減少商品數量
function decreaseQuantity(productName) {
    const cartItem = cart.find(item => item.name === productName);

    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            removeFromCart(productName);
        }
        updateCartDisplay();
    }
}

// 從購物車中移除商品
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
}

// 更新購物車顯示
function updateCartDisplay() {
    const cartDiv = document.getElementById('cart');
    const totalDiv = document.getElementById('total');
    
    cartDiv.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        cartDiv.innerHTML += `
            <p>${item.name} x ${item.quantity} = NT$${itemTotal}
            <button onclick="decreaseQuantity('${item.name}')">-</button>
            <button onclick="removeFromCart('${item.name}')">移除</button></p>
        `;
    });

    totalDiv.innerText = `總金額: NT$${totalAmount}`;
}

// 前往結帳
function checkout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

// 初始化購物車顯示
updateCartDisplay();
