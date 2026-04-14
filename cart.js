const cartBox = document.querySelector('.cart-product-list');
const totalbox = document.querySelector('.cart-check');
const emptyMessage = document.querySelector('.cart-empty');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    if (!cartBox || !totalbox) return;

    cartBox.innerHTML = '';
    totalbox.innerHTML = '';

    if (cart.length === 0) {
        emptyMessage.style.display = 'flex';
        cartBox.style.display = 'none';
        totalbox.style.display = 'none';
        return;
    }

    emptyMessage.style.display = 'none';
    cartBox.style.display = 'flex';
    totalbox.style.display = 'block';

    const groupedCart = cart.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, quantity: 1 };
        } else {
            acc[item.id].quantity += 1;
        }
        return acc;
    }, {});

    let totalPrice = 0;

    Object.values(groupedCart).forEach((item) => {
        const itemSubtotal = item.price * item.quantity;
        totalPrice += itemSubtotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img class='cart-img' src="${item.image}">
            <div class="item-info">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)} each</p>
            </div>

            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>

            <div class="item-total">
                <strong>$${itemSubtotal.toFixed(2)}</strong>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove All</button>
            </div>
        `;
        cartBox.appendChild(div);
    });


    totalbox.innerHTML = `
        <div class="summary-wrapper">
            <h3>Summary</h3>
            <div class="summary-row">
                <span>Total items:</span>
                <span>${cart.length}</span>
            </div>
            <hr>
            <div class="summary-row total">
                <h4>Total:</h4>
                <h4>$${totalPrice.toFixed(2)}</h4>
            </div>
            <button class="checkout-btn">Checkout</button>
        </div>
    `;
}

window.updateQuantity = function(id, change) {
    if (change === 1) {
        const itemToAdd = cart.find(item => item.id === id);
        cart.push({ ...itemToAdd });
    } else {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) cart.splice(index, 1);
    }

    saveAndRefresh();
};


window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    saveAndRefresh();
};

function saveAndRefresh() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

document.addEventListener('DOMContentLoaded', renderCart);
