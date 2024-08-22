let cart = JSON.parse(localStorage.getItem('cart'));

function updateCheckoutDisplay() {
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
            <button onclick="increaseQuantity('${item.name}')">+</button>
            <button onclick="removeFromCart('${item.name}')">移除</button></p>
        `;
    });

    totalDiv.innerText = `總金額: NT$${totalAmount}`;
}

function decreaseQuantity(productName) {
    const cartItem = cart.find(item => item.name === productName);
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
    } else {
        removeFromCart(productName);
    }
    updateCheckoutDisplay();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function increaseQuantity(productName) {
    const cartItem = cart.find(item => item.name === productName);
    cartItem.quantity++;
    updateCheckoutDisplay();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCheckoutDisplay();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function goBack() {
    window.location.href = 'index.html';
}

function proceedToOrderInfo() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'order-info.html';
}

updateCheckoutDisplay();