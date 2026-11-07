
// ====================================
// FOOD MENU DATA
// ====================================

const foods = [

    // NORTH INDIAN FOOD

    {
        id: 1,
        name: "Paneer Butter Masala",
        category: "North Indian",
        price: 220,
        rating: "★★★★★",
        description: "Creamy paneer curry with rich Indian spices.",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600"
    },

    {
        id: 2,
        name: "Butter Chicken",
        category: "North Indian",
        price: 280,
        rating: "★★★★★",
        description: "Delicious chicken cooked in buttery tomato gravy.",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600"
    },

    {
        id: 3,
        name: "Veg Biryani",
        category: "North Indian",
        price: 180,
        rating: "★★★★★",
        description: "Aromatic basmati rice with vegetables and spices.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcI-aAcHiQ5OS2GCsTq90ZqQl4W8hqUygWCmz-mCMMdg&s=10"
    },

    {
        id: 4,
        name: "Chole Bhature",
        category: "North Indian",
        price: 140,
        rating: "★★★★★",
        description: "Spicy chickpeas served with fluffy bhature.",
        image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600"
    },

    // SOUTH INDIAN FOOD

    {
        id: 5,
        name: "Masala Dosa",
        category: "South Indian",
        price: 100,
        rating: "★★★★★",
        description: "Crispy dosa stuffed with delicious potato masala.",
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600"
    },

    {
        id: 6,
        name: "Idli Sambar",
        category: "South Indian",
        price: 80,
        rating: "★★★★★",
        description: "Soft steamed idlis served with hot sambar.",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600"
    },

    {
        id: 7,
        name: "Medu Vada",
        category: "South Indian",
        price: 90,
        rating: "★★★★★",
        description: "Crispy golden vadas with coconut chutney.",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600"
    },

    {
        id: 8,
        name: "Uttapam",
        category: "South Indian",
        price: 120,
        rating: "★★★★★",
        description: "Soft rice pancake topped with fresh vegetables.",
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600"
    },

    // STREET FOOD

    {
        id: 9,
        name: "Pav Bhaji",
        category: "Street Food",
        price: 120,
        rating: "★★★★★",
        description: "Mumbai-style spicy bhaji with buttered pav.",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600"
    },

    {
        id: 10,
        name: "Samosa",
        category: "Street Food",
        price: 30,
        rating: "★★★★★",
        description: "Crispy pastry filled with spicy potato.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600"
    },

    // CHATS

    {
        id: 11,
        name: "Pani Puri",
        category: "Chats",
        price: 50,
        rating: "★★★★★",
        description: "Crispy puris filled with tangy flavoured water.",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600"
    },

    {
        id: 12,
        name: "Papdi Chaat",
        category: "Chats",
        price: 80,
        rating: "★★★★★",
        description: "Crunchy papdi with yoghurt and chutneys.",
        image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600"
    }

];


// ====================================
// SELECT HTML ELEMENTS
// ====================================

const foodGrid = document.getElementById("foodGrid");

const filterButtons = document.querySelectorAll(".filter-btn");

const cartBtn = document.getElementById("cartBtn");

const cartModal = document.getElementById("cartModal");

const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


// ====================================
// DISPLAY FOOD ITEMS
// ====================================

function displayFoods(category = "All") {

    foodGrid.innerHTML = "";

    const filteredFoods = category === "All"
        ? foods
        : foods.filter(food => food.category === category);

    filteredFoods.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `

            <div class="food-image">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                    loading="lazy"
                >

                <span class="food-category">
                    ${food.category}
                </span>

            </div>

            <div class="food-details">

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="stars">${food.rating}</div>

                <div class="food-bottom">

                    <span class="food-price">
                        ₹${food.price}
                    </span>

                    <button
                        class="add-cart"
                        data-id="${food.id}"
                    >
                        + Add
                    </button>

                </div>

            </div>

        `;

        foodGrid.appendChild(card);

    });

}


// Show all food when website loads

displayFoods();


// ====================================
// FOOD CATEGORY FILTER
// ====================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        displayFoods(category);

    });

});


// ====================================
// SHOPPING CART
// ====================================

let cart = [];


// Add food to cart

foodGrid.addEventListener("click", function(event) {

    if (!event.target.classList.contains("add-cart")) {
        return;
    }

    const foodId = Number(event.target.dataset.id);

    const selectedFood = foods.find(food => food.id === foodId);

    const existingItem = cart.find(item => item.id === foodId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...selectedFood,
            quantity: 1
        });

    }

    updateCart();

});


// Update cart information

function updateCart() {

    cartItems.innerHTML = "";

    let totalItems = 0;

    let totalPrice = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty!
            </p>
        `;

    }

    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price * item.quantity}</p>
            </div>

            <div class="quantity-controls">

                <button data-action="decrease" data-id="${item.id}">
                    -
                </button>

                <span>${item.quantity}</span>

                <button data-action="increase" data-id="${item.id}">
                    +
                </button>

            </div>

        `;

        cartItems.appendChild(cartItem);

    });

    cartCount.textContent = totalItems;

    cartTotal.textContent = "₹" + totalPrice;

}


// ====================================
// CHANGE CART QUANTITY
// ====================================

cartItems.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) return;

    const foodId = Number(button.dataset.id);

    const action = button.dataset.action;

    const item = cart.find(food => food.id === foodId);

    if (!item) return;

    if (action === "increase") {

        item.quantity++;

    }

    if (action === "decrease") {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(food => food.id !== foodId);

        }

    }

    updateCart();

});


// ====================================
// OPEN AND CLOSE CART
// ====================================

cartBtn.addEventListener("click", () => {

    cartModal.classList.add("show");

});

closeCart.addEventListener("click", () => {

    cartModal.classList.remove("show");

});

cartModal.addEventListener("click", function(event) {

    if (event.target === cartModal) {

        cartModal.classList.remove("show");

    }

});


// ====================================
// CHECKOUT BUTTON
// ====================================

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty! Please add some food.");

        return;

    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Thank you for choosing Spice Garden!\n\n" +
        "Your order total is ₹" + total +
        "\n\nThis is a demo website. Online payment and " +
        "real order processing are not connected."
    );

    cart = [];

    updateCart();

    cartModal.classList.remove("show");

});


// ====================================
// MOBILE NAVIGATION
// ====================================

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuToggle.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";

});


// Close mobile navigation after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});


// ====================================
// RESERVATION FORM
// ====================================

const reservationForm = document.getElementById("reservationForm");

const formMessage = document.getElementById("formMessage");

const bookingDate = document.getElementById("bookingDate");


// Prevent selecting past dates

const today = new Date();

const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

bookingDate.min = localToday;


reservationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value;

    const email = document.getElementById("customerEmail").value;

    const phone = document.getElementById("customerPhone").value;

    const date = bookingDate.value;

    const guests = document.getElementById("guestCount").value;

    if (!name || !email || !phone || !date || !guests) {

        alert("Please fill in all the details.");

        return;

    }

    formMessage.textContent =
        "Thank you " + name +
        "! Your demo reservation request has been received for " +
        date + " (" + guests + " guests).";

    reservationForm.reset();

    bookingDate.min = localToday;

});


// ====================================
// INITIAL CART UPDATE
// ====================================

updateCart();


// ====================================
// CONSOLE MESSAGE
// ====================================

console.log("Welcome to Spice Garden Restaurant!");
console.log("Website loaded successfully.");
