// Список товарів
const products = [
    {
        id: "1",
        name: "iPhone 15 Pro Max 256GB",
        price: 54999,
        image: "https://images.unsplash.com/photo-1758348844311-30248208fa02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbWFydHBob25lJTIwZGV2aWNlfGVufDF8fHx8MTc1ODM1NTU2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Найновіший флагманський смартфон від Apple з потужним процесором A17 Pro"
    },
    {
        id: "2",
        name: "Sony WH-1000XM5 Навушники",
        price: 12999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzU4MzM2NzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Бездротові навушники з активним шумоподавленням та неперевершеною якістю звуку"
    },
    {
        id: "3",
        name: "MacBook Pro 14\" M3 512GB",
        price: 89999,
        image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NTgyODcxMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Професійний ноутбук для творчих завдань з чіпом M3 та Retina дисплеєм"
    },
    {
        id: "4",
        name: "Apple Watch Series 9 GPS",
        price: 15999,
        image: "https://images.unsplash.com/photo-1716234479503-c460b87bdf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd2VhcmFibGV8ZW58MXx8fHwxNzU4Mjk2ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Розумний годинник з функціями здоров'я та фітнесу, Always-On Retina дисплей"
    },
    {
        id: "5",
        name: "Canon EOS R6 Mark II",
        price: 89999,
        image: "https://images.unsplash.com/photo-1740265556009-796449091cf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NTgyNzEwOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Професійна бездзеркальна камера з 24.2 МП сенсором та 4K відео"
    },
    {
        id: "6",
        name: "iPad Pro 12.9\" M2 256GB",
        price: 47999,
        image: "https://images.unsplash.com/photo-1672239069328-dd1535c0d78a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2V8ZW58MXx8fHwxNzU4MzMxMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Потужний планшет з чіпом M2 та Liquid Retina XDR дисплеєм для професійної роботи"
    }
];

// Глобальні змінні
let cartItems = [];

// DOM елементи
const productsGrid = document.getElementById('products-grid');
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCart = document.getElementById('empty-cart');
const cartSummary = document.getElementById('cart-summary');
const cartTotalPrice = document.getElementById('cart-total-price');

// Функція для форматування ціни
function formatPrice(price) {
    return price.toLocaleString('uk-UA') + ' ₴';
}

// Функція для створення картки товару
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-to-cart-button" onclick="addToCart('${product.id}')">
                        До кошика
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Функція для відображення товарів
function renderProducts() {
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Функція для знаходження товару за ID
function findProductById(id) {
    return products.find(product => product.id === id);
}

// Функція додавання товару до кошика
function addToCart(productId) {
    const product = findProductById(productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.product.id === productId);
    
    if (existingItem) {
        // Якщо товар вже є в кошику, збільшуємо кількість
        existingItem.quantity += 1;
    } else {
        // Якщо товара немає, додаємо новий
        cartItems.push({ product, quantity: 1 });
    }
    
    updateCartUI();
}

// Функція оновлення кількості товару
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cartItems.find(item => item.product.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
    }
}

// Функція видалення товару з кошика
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.product.id !== productId);
    updateCartUI();
}

// Функція підрахунку загальної кількості товарів
function getTotalItems() {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

// Функція підрахунку загальної суми
function getTotalPrice() {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
}

// Функція для створення елемента товару в кошику
function createCartItem(item) {
    return `
        <div class="cart-item">
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.product.name}</h4>
                <p class="cart-item-price">${formatPrice(item.product.price)}</p>
                <div class="cart-item-controls">
                    <button class="quantity-button" onclick="updateQuantity('${item.product.id}', ${item.quantity - 1})">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-button" onclick="updateQuantity('${item.product.id}', ${item.quantity + 1})">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                    <button class="remove-button" onclick="removeFromCart('${item.product.id}')">
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Функція оновлення UI кошика
function updateCartUI() {
    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();
    
    // Оновлення лічильника в кнопці кошика
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }
    
    // Оновлення вмісту кошика
    if (cartItems.length === 0) {
        emptyCart.classList.remove('hidden');
        cartSummary.classList.add('hidden');
        cartItemsContainer.innerHTML = '';
    } else {
        emptyCart.classList.add('hidden');
        cartSummary.classList.remove('hidden');
        cartItemsContainer.innerHTML = cartItems.map(item => createCartItem(item)).join('');
        cartTotalPrice.textContent = formatPrice(totalPrice);
    }
}

// Функція відкриття кошика
function openCart() {
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Функція закриття кошика
function closeCart() {
    cartModal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Обробники подій
cartButton.addEventListener('click', openCart);
closeCartButton.addEventListener('click', closeCart);

// Закриття кошика при кліку на фон
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCart();
    }
});

// Закриття кошика за клавішею Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !cartModal.classList.contains('hidden')) {
        closeCart();
    }
});

// Ініціалізація додатку
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// Функція для демонстрації замовлення
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkout-button')) {
        alert('Дякуємо за замовлення!Наші оператори звяжуться з вами.');
    }
});
