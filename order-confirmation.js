// 從 localStorage 獲取訂單詳情
const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
const orderNumber = Math.floor(Math.random() * 10000) + 1;  // 模擬訂單號碼
const orderDate = new Date().toLocaleDateString('zh-TW');  // 獲取當前日期
const cart = orderDetails.cart;

// 顯示訂單編號和日期
document.getElementById('orderNumber').textContent = orderNumber;
document.getElementById('orderDate').textContent = orderDate;

// 顯示訂單中的商品明細和總金額
let totalAmount = 0;
const orderItemsElement = document.getElementById('orderItems');
cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;
    const row = `
        <tr>
            <td>${item.name} x ${item.quantity}</td>
            <td>NT$${itemTotal}</td>
        </tr>
    `;
    orderItemsElement.innerHTML += row;
});

// 顯示總金額
document.getElementById('orderTotal').textContent = totalAmount;
document.getElementById('totalAmount').textContent = totalAmount;

// 顯示訂購人資訊，包括暱稱
document.getElementById('billingAddress').innerHTML = `
    ${orderDetails.name}<br>
    暱稱: ${orderDetails.nickname}<br> <!-- 顯示暱稱 -->
    📞 ${orderDetails.phone}<br>
    ✉️ ${orderDetails.email}
`;

// 根據取件方式顯示相應的地址資訊
if (orderDetails.pickupOption === '宅配') {
    document.getElementById('shippingAddress').innerHTML = `
        ${orderDetails.deliveryName}<br>
        📞 ${orderDetails.deliveryPhone}<br>
        📍 ${orderDetails.deliveryAddress}
    `;
} else {
    document.getElementById('shippingAddress').innerHTML = `
        ${orderDetails.pickupName}<br>
        📞 ${orderDetails.pickupPhone}<br>
        店名: ${orderDetails.storeName}
    `;
}
