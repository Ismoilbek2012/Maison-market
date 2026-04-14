const input = document.getElementById('input');
const root = document.getElementById('root');

const all = document.getElementById("all");
const mc = document.getElementById("mc");
const jw = document.getElementById("jw");
const el = document.getElementById("el");
const wc = document.getElementById("wc");

const urls = `https://fakestoreapi.com/products`;

async function fetchProducts(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Information qaytamadi')
        }
        const tovarlar = await response.json();
         console.log(tovarlar);

        return tovarlar;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

fetchProducts(urls)
    .then(response => {render(response)});

function render(products) {
    root.innerHTML = '';

    if (products.length === 0) {
        root.innerHTML = `<div class="empty"><p>No items found.</p></div>`;
        return;
    }

    function renderStars(rate) {
        const full  = Math.round(rate);
        return '★'.repeat(full) + '☆'.repeat(5 - full);
    }

    products.forEach((product, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${i * 60}ms`;

        const stars = renderStars(product.rating?.rate || 0);
        const ratingCount = product.rating?.count || 0;

        card.innerHTML = `
            <div class="card-image-wrap">
                <img class="img" src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="card-body">
                <p class="category">${product.category}</p>
                <h2 class="nomi">${product.title}</h2>
                <div class="card-footer">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <div class="rating">
                        <span class="stars">${stars}</span>
                        <span>${ratingCount}</span>
                    </div>
                </div>
            </div>
            <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        root.appendChild(card);
    });
}

all.addEventListener('click', ()=>{
    fetchProducts(urls)
        .then(response => {render(response)});
});

mc.addEventListener('click', ()=>{
    fetchProducts(urls)
        .then(response => {render(response.filter(tovar => tovar.category === "men's clothing"))});
})

jw.addEventListener('click', ()=>{
    fetchProducts(urls)
        .then(response => {render(response.filter(tovar => tovar.category === "jewelery"))});
})

el.addEventListener('click', ()=>{
    fetchProducts(urls)
        .then(response => {render(response.filter(tovar => tovar.category === "electronics"))});
})

wc.addEventListener('click', ()=>{
    fetchProducts(urls)
        .then(response => {render(response.filter(tovar => tovar.category === "women's clothing"))});
})

//cart js

let allProducts = [];

fetchProducts(urls)
    .then(response => {
        allProducts = response;
        render(response);
    });

function addToCart(id) {
    console.log(id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const product = allProducts.find(tovar => tovar.id === id);

    if (product) {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}
