// Get cart elements
const cartCountElement = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');

// Initialize cart
let cart = [];

// Function to update the cart count
function updateCSartCount() {
  cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to add an item to the cart
function addToCart(product) {
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  // Save cart to localStorage
  saveCartToLocalStorage();

  // Update cart count and display
  updateCartCount();
  displayCartItems();

  // Notify user
  alert(`${product.name} added to the cart!`);
}

// Function to save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart from localStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

// Add event listeners to menu buttons
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const product = {
        id: event.target.getAttribute('data-id'),
        name: event.target.getAttribute('data-name'),
        price: parseFloat(event.target.getAttribute('data-price'))
      };

      addToCart(product);
    });
  });

  // Load the cart from localStorage
  loadCartFromLocalStorage();
});



