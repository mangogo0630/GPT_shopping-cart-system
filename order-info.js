// 根據選擇的取件方式，顯示相應的表單部分並設置必填屬性
function handlePickupOptionChange() {
    const pickupOption = document.getElementById('pickupOption').value;
    const storeInfo = document.getElementById('storeInfo');
    const deliveryInfo = document.getElementById('deliveryInfo');

    if (pickupOption === '7-11店到店' || pickupOption === '全家店到店') {
        storeInfo.classList.remove('hidden');
        deliveryInfo.classList.add('hidden');

        // 設置取件店信息字段為必填
        document.getElementById('storeName').setAttribute('required', 'required');
        document.getElementById('pickupName').setAttribute('required', 'required');
        document.getElementById('pickupPhone').setAttribute('required', 'required');

        // 移除宅配信息字段的必填屬性
        document.getElementById('deliveryName').removeAttribute('required');
        document.getElementById('deliveryPhone').removeAttribute('required');
        document.getElementById('deliveryAddress').removeAttribute('required');
    } else if (pickupOption === '宅配') {
        storeInfo.classList.add('hidden');
        deliveryInfo.classList.remove('hidden');

        // 設置宅配信息字段為必填
        document.getElementById('deliveryName').setAttribute('required', 'required');
        document.getElementById('deliveryPhone').setAttribute('required', 'required');
        document.getElementById('deliveryAddress').setAttribute('required', 'required');

        // 移除取件店信息字段的必填屬性
        document.getElementById('storeName').removeAttribute('required');
        document.getElementById('pickupName').removeAttribute('required');
        document.getElementById('pickupPhone').removeAttribute('required');
    } else {
        storeInfo.classList.add('hidden');
        deliveryInfo.classList.add('hidden');

        // 移除所有條件字段的必填屬性
        document.getElementById('storeName').removeAttribute('required');
        document.getElementById('pickupName').removeAttribute('required');
        document.getElementById('pickupPhone').removeAttribute('required');
        document.getElementById('deliveryName').removeAttribute('required');
        document.getElementById('deliveryPhone').removeAttribute('required');
        document.getElementById('deliveryAddress').removeAttribute('required');
    }
}

// 複製訂購者信息到取件或宅配信息字段
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

// 表單提交時的驗證和處理
function submitOrder(event) {
    event.preventDefault();  // 阻止表單默認提交行為

    // 執行表單驗證
    if (!validateForm()) {
        alert('請填寫所有必填欄位');
        return;
    }

    // 收集訂單詳情
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
        cart: JSON.parse(localStorage.getItem('cart')) || []
    };

    // 將訂單詳情存儲在 localStorage 中
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // 重定向到確認頁面
    window.location.href = 'order-confirmation.html';
}

// 驗證表單中的所有必填字段
function validateForm() {
    const requiredFields = document.querySelectorAll('#orderForm [required]');
    let valid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            valid = false;
            field.classList.add('input-error');
            field.nextElementSibling.textContent = '此欄位為必填項';
        } else {
            field.classList.remove('input-error');
            field.nextElementSibling.textContent = '';
        }
    });

    return valid;
}
