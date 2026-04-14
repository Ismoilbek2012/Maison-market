const input = document.getElementById('input');
const root = document.getElementById('root');

const all = document.getElementById('all');
const mc = document.getElementById('mc');
const jw = document.getElementById('jw');
const el = document.getElementById('el');
const wc = document.getElementById('wc');

const fakeProducts = [
  {
    id: 1,
    title: "Fjallraven Backpack",
    price: 109.95,
    description: "Perfect bag for everyday use.",
    category: "men's clothing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFJc66P8G3P7ecOVcV-Ti1Zgi_gaUZReAy_g&s",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual T-Shirts",
    price: 22.3,
    description: "Slim-fitting casual t-shirts.",
    category: "men's clothing",
    image: "https://cdn-images.farfetch-contents.com/32/32/35/46/32323546_62268819_1000.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Gold Chain Bracelet",
    price: 695,
    description: "Luxury gold bracelet.",
    category: "jewelery",
    image: "https://privilegia.uz/wp-content/uploads/2024/11/1626814-1536x1536.png",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 4,
    title: "Samsung Monitor 24\"",
    price: 199.99,
    description: "Full HD monitor.",
    category: "electronics",
    image: "https://officemax.uz/media/product_images/35157/0_lg.webp",
    rating: { rate: 4.2, count: 140 }
  },
  {
    id: 5,
    title: "Women's Jacket",
    price: 55.99,
    description: "Warm and stylish jacket.",
    category: "women's clothing",
    image: "https://www.mytheresa.com/image/1094/1238/100/ee/P01085873.jpg",
    rating: { rate: 4.5, count: 300 }
  }
];

render(fakeProducts);

function render(products) {
    root.innerHTML = '';

    if (products.length === 0) {
        root.innerHTML = `<div class="empty"><p>No items found.</p></div>`;
        return;
    }

    products.forEach((product, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${i * 60}ms`;

        const stars = 0;
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
    })
}


function filterByCategory(category) {
    if (category === "all") return render(fakeProducts);
    render(fakeProducts.filter(p => p.category === category));
}

all.onclick = () => filterByCategory("all");
mc.onclick = () => filterByCategory("men's clothing");
jw.onclick = () => filterByCategory("jewelery");
el.onclick = () => filterByCategory("electronics");
wc.onclick = () => filterByCategory("women's clothing");



//cart js

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    const product = fakeProducts.find(tovar => tovar.id === id);

    if (cart) {
        cart.push(product);
    } else {
        cart = [product];
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}







