// ==========================================
// PRODUCT DATA
// ==========================================

const products = [

    {
        id: 1,
        name: "India Gate Basmati Rice",
        category: "rice",
        price: 120,
        emoji: "🍚"
    },

    {
        id: 2,
        name: "Ponni Rice",
        category: "rice",
        price: 75,
        emoji: "🍚"
    },

    {
        id: 3,
        name: "Wheat Flour",
        category: "flour",
        price: 55,
        emoji: "🌾"
    },

    {
        id: 4,
        name: "Maida",
        category: "flour",
        price: 48,
        emoji: "🌾"
    },

    {
        id: 5,
        name: "Turmeric Powder",
        category: "masala",
        price: 40,
        emoji: "🌶️"
    },

    {
        id: 6,
        name: "Chilli Powder",
        category: "masala",
        price: 60,
        emoji: "🌶️"
    },

    {
        id: 7,
        name: "Coconut Oil",
        category: "oil",
        price: 180,
        emoji: "🫗"
    },

    {
        id: 8,
        name: "Sunflower Oil",
        category: "oil",
        price: 140,
        emoji: "🫗"
    },

    {
        id: 9,
        name: "Biscuits",
        category: "snacks",
        price: 30,
        emoji: "🍪"
    },

    {
        id: 10,
        name: "Potato Chips",
        category: "snacks",
        price: 20,
        emoji: "🥔"
    },

    {
        id: 11,
        name: "Coca Cola",
        category: "beverages",
        price: 45,
        emoji: "🥤"
    },

    {
        id: 12,
        name: "Fruit Juice",
        category: "beverages",
        price: 80,
        emoji: "🧃"
    }

];


// ==========================================
// CART
// ==========================================

let cart = [];


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(productList) {

    const productGrid =
        document.getElementById("productGrid");

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        productGrid.innerHTML = `
            <p>No products found.</p>
        `;

        return;
    }

    productList.forEach(product => {

        productGrid.innerHTML += `

            <div class="product-card">

                <div class="product-image">
                    ${product.emoji}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <div class="price">
                    ₹${product.price}
                </div>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;

    });

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    const existing =
        cart.find(item => item.id === productId);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    alert(`${product.name} added to cart!`);
}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    // Cart count

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent = totalQuantity;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    // Cart items

    cartItems.innerHTML = "";


    cart.forEach(item => {

        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ₹${item.price}
                    </p>

                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(
                                ${item.id},
                                -1
                            )"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(
                                ${item.id},
                                1
                            )"
                        >
                            +
                        </button>

                    </div>

                </div>

                <strong>
                    ₹${item.price * item.quantity}
                </strong>

            </div>

        `;

    });


    // Total

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

    cartTotal.textContent =
        `₹${total}`;

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }

    updateCart();

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterCategory(category) {

    if (category === "all") {

        displayProducts(products);

        return;
    }

    const filtered =
        products.filter(
            product =>
                product.category === category
        );

    displayProducts(filtered);

}


// ==========================================
// SEARCH
// ==========================================

function searchProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const filtered =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(search)
        );

    displayProducts(filtered);

}


// Search while typing

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        searchProducts
    );


// ==========================================
// SCROLL TO PRODUCTS
// ==========================================

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// CHECKOUT
// ==========================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    closeCart();

    document
        .getElementById("checkoutModal")
        .classList.add("active");

}


// ==========================================
// CLOSE CHECKOUT
// ==========================================

function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");

}


// ==========================================
// PLACE ORDER
// ==========================================

function placeOrder() {

    const name =
        document
            .getElementById("customerName")
            .value;

    const phone =
        document
            .getElementById("customerPhone")
            .value;

    const address =
        document
            .getElementById("customerAddress")
            .value;


    if (!name || !phone || !address) {

        alert(
            "Please fill all delivery details."
        );

        return;
    }


    alert(
        `Thank you ${name}! 🎉

Your order has been placed successfully.

We will deliver your groceries to:

${address}`
    );


    cart = [];

    updateCart();

    closeCheckout();

}


// ==========================================
// INITIAL LOAD
// ==========================================

displayProducts(products);

updateCart();