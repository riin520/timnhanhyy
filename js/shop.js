let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ========================
// DANH SÁCH SẢN PHẨM
// ========================
const products = {
  coffee: [
    { name: "Cà phê sữa", price: 25000, img: "images/coffee1.jpg" },
    { name: "Cà phê đen", price: 20000, img: "images/coffee2.jpg" },
  ],
  tea: [
    { name: "Trà đào cam sả", price: 30000, img: "images/tea1.jpg" },
    { name: "Trà sữa trân châu", price: 28000, img: "images/tea2.jpg" },
  ],
  cake: [
    { name: "Bánh tiramisu", price: 35000, img: "images/cake1.jpg" },
    { name: "Bánh cheesecake", price: 32000, img: "images/cake2.jpg" },
  ],
};

// ========================
// HIỂN THỊ MENU (dành cho trang menu.html)
// ========================
function renderMenu(category = "coffee") {
  const container = document.getElementById("menu-container");
  if (!container) return; // nếu không phải trang menu thì bỏ qua

  container.innerHTML = "";

  products[category].forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price.toLocaleString()} VNĐ</p>
      <button class="add-to-cart" data-name="${product.name}" data-price="${
      product.price
    }">
        Thêm vào giỏ
      </button>
    `;
    container.appendChild(div);
  });

  // Gắn sự kiện cho nút Thêm vào giỏ
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);
      addToCart({ name, price, qty: 1 });
    });
  });
}

// ========================
// THÊM VÀO GIỎ HÀNG
// ========================
function addToCart(product) {
  const existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification(`${product.name} đã được thêm vào giỏ hàng!`);
  updateCart();
}

// ========================
// HIỂN THỊ GIỎ HÀNG (dành cho trang cart.html)
// ========================
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // nếu không phải trang cart thì bỏ qua
  if (!cartItemsContainer || !cartTotal) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    if (!item.qty) item.qty = 1;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-qty">
        <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
      </div>
      <div class="cart-item-price">${(
        item.price * item.qty
      ).toLocaleString()} VNĐ</div>
      <button class="remove-btn" data-index="${index}">❌</button>
    `;

    cartItemsContainer.appendChild(div);
    total += item.price * item.qty;
  });

  cartTotal.textContent = total.toLocaleString();

  // Sự kiện tăng/giảm số lượng
  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const action = e.target.dataset.action;

      if (action === "increase") cart[index].qty++;
      if (action === "decrease" && cart[index].qty > 1) cart[index].qty--;

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    });
  });

  // Sự kiện xoá sản phẩm
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    });
  });
}

// ========================
// THANH TOÁN (dành cho trang cart.html)
// ========================
document.addEventListener("DOMContentLoaded", () => {
  updateCart();

  // Thanh toán
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showNotification("Giỏ hàng đang trống!");
        return;
      }

      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();

      showNotification(
        "Thanh toán thành công! 💖 Cảm ơn bạn đã ủng hộ TIỆM NHÀ NHYY"
      );
    });
  }

  // Toggle hiển thị thông tin ngân hàng
  const bankInfo = document.getElementById("bank-info");
  const paymentRadios = document.querySelectorAll("input[name='payment']");

  if (paymentRadios && bankInfo) {
    paymentRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio.value === "bank" && radio.checked) {
          bankInfo.classList.remove("hidden");
        } else {
          bankInfo.classList.add("hidden");
        }
      });
    });
  }
});

// ========================
// POPUP THÔNG BÁO
// ========================
function showNotification(message) {
  const notification = document.getElementById("notification");
  const messageBox = document.getElementById("notification-message");

  if (!notification || !messageBox) return;

  messageBox.textContent = message;
  notification.classList.add("show");

  // Tự động ẩn sau 5 giây
  setTimeout(() => {
    notification.classList.remove("show");
  }, 5000);

  // Cho phép click ra ngoài để tắt ngay
  setTimeout(() => {
    document.addEventListener("click", hideNotification, { once: true });
  }, 100);
}

function hideNotification(e) {
  const notification = document.getElementById("notification");
  if (!notification.contains(e.target)) {
    notification.classList.remove("show");
  }
}

// ========================
// SỰ KIỆN TAB MENU (chỉ chạy ở trang menu.html)
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  if (tabs.length > 0) {
    renderMenu("coffee"); // mặc định hiển thị Coffee
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((btn) => btn.classList.remove("active"));
        tab.classList.add("active");
        renderMenu(tab.dataset.category);
      });
    });
  }

  updateCart();
});
