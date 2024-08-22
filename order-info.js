function handlePickupOptionChange() {
    const pickupOption = document.getElementById('pickupOption').value;
    const storeInfo = document.getElementById('storeInfo');
    const deliveryInfo = document.getElementById('deliveryInfo');

    if (pickupOption === '7-11店到店' || pickupOption === '全家店到店') {
        storeInfo.classList.remove('hidden');
        deliveryInfo.classList.add('hidden');
    } else if (pickupOption === '宅配') {
        storeInfo.classList.add('hidden');
        deliveryInfo.classList.remove('hidden');
    } else {
        storeInfo.classList.add('hidden');
        deliveryInfo.classList.add('hidden');
    }
}

function copyOrdererInfo(type) {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (type === 'pickup') {
        const isChecked = document.getElementById('sameAsOrdererPickup').checked;
        document.getElementById('pickupName').value = isChecked ? name : '';
        document.getElementById('pickupPhone').value = isChecked ? phone : '';
    } else if (type === 'delivery') {
        const isChecked = document.getElementById('sameAsOrdererDelivery').checked;
        document.getElementById('deliveryName').value = isChecked ? name : '';
        document.getElementById('deliveryPhone').value = isChecked ? phone : '';
    }
}

function submitOrder(event) {
    event.preventDefault();  // 阻止表單默認的提交行為

    const orderDetails = {
        name: document.getElementById('name').value,
        nickname: document.getElementById('nickname').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        pickupOption: document.getElementById('pickupOption').value,
        storeName: document.getElementById('storeName').value || null,
        pickupName: document.getElementById('pickupName').value || null,
        pickupPhone: document.getElementById('pickupPhone').value || null,
        deliveryName: document.getElementById('deliveryName').value || null,
        deliveryPhone: document.getElementById('deliveryPhone').value || null,
        deliveryAddress: document.getElementById('deliveryAddress').value || null,
        cart: JSON.parse(localStorage.getItem('cart'))
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = 'order-confirmation.html';
}
