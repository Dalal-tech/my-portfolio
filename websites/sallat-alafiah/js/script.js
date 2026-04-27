const addButtons = document.querySelectorAll(".add-btn");
const cartItemsList = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const STORAGE_KEY = "sallat_alafiah_cart";

const cart = loadCart();

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [];
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function renderCart() {
  cartItemsList.innerHTML = "";

  if (cart.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty";
    emptyItem.textContent = "السلة فارغة حالياً.";
    cartItemsList.appendChild(emptyItem);
    cartCount.textContent = "0";
    cartTotal.textContent = "0 ريال";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "cart-item-row";

    const itemText = document.createElement("span");
    itemText.textContent = `${item.name} - ${item.price} ريال`;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "حذف";
    removeBtn.addEventListener("click", () => removeItem(index));

    li.appendChild(itemText);
    li.appendChild(removeBtn);
    cartItemsList.appendChild(li);
  });

  cartCount.textContent = String(cart.length);
  cartTotal.textContent = `${total} ريال`;
}

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    cart.push({ name, price });
    saveCart();
    renderCart();
  });
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("السلة فارغة. أضف منتجات أولاً.");
    return;
  }

  alert("شكراً لتسوقك من سلة العافية");
  cart.length = 0;
  saveCart();
  renderCart();
});

renderCart();
