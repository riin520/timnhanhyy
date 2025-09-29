let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ========================
// DANH SÁCH SẢN PHẨM
// ========================
const products = {
  coffee: [
    { name: "Cà phê sữa", price: 15000, img: "img/1.png" },
    { name: "Cà phê đen", price: 10000, img: "img/2.png" },
    { name: "Cà phê muối", price: 18000, img: "img/cafemuoi.png" },
    { name: "Bạc xỉu", price: 15000, img: "img/bacxiu.png" },
    { name: "Cà phê sữa tươi", price: 18000, img: "img/cafesuatuoi.png" },
    { name: "Cà phê hạnh nhân", price: 25000, img: "img/cafehanhnhan.png" },
    {
      name: "Cà phê caramel kem muối",
      price: 25000,
      img: "img/cafekemmuoi.png",
    },
    {
      name: "Cà phê bơ đậu phộng",
      price: 25000,
      img: "img/cafebodauphong.png",
    },
    { name: "Cà phê kem dẻo buôn mê", price: 25000, img: "img/cafebuonme.png" },
  ],
  tea: [
    { name: "Trà đào cam sả", price: 30000, img: "img/tradaocamsa.png" },
    { name: "Trà chanh", price: 10000, img: "img/trachanh.png" },
    { name: "Trà tắc", price: 20000, img: "img/tratac.png" },
    { name: "Trà tắc cam xoài", price: 15000, img: "img/trataccamxoai.png" },
    { name: "Trà đào", price: 20000, img: "img/tradao.png" },
    { name: "Trà vải", price: 20000, img: "img/travai.png" },
    { name: "Trà dâu", price: 20000, img: "img/tradau.png" },
    { name: "Trà sữa trân châu", price: 28000, img: "img/trasua.png" },
  ],
  matcha: [
    { name: "Matcha Latte", price: 20000, img: "img/matchalatte.png" },
    { name: "Matcha kem muối", price: 25000, img: "img/matchakemmuoi.png" },
    { name: "Matcha sữa gấu", price: 25000, img: "img/matchasuagau.png" },
    { name: "Matcha caramel", price: 25000, img: "img/matchacaramel.png" },
    { name: "Coco Matcha", price: 25000, img: "img/cocomatcha.png" },
    { name: "Dâu Matcha latte", price: 25000, img: "img/daumatchalatte.png" },
  ],
  cacao: [
    { name: "Cacao sữa", price: 20000, img: "img/cacaosua.png" },
    {
      name: "Cacao sữa yến mạch",
      price: 23000,
      img: "img/cacaosuayenmach.png",
    },
    { name: "Cacao kem muối", price: 22000, img: "img/cacaokemmuoi.png" },
    { name: "Cacao kem trứng", price: 25000, img: "img/cacaokemtrung.png" },
    { name: "Cacao oreo", price: 25000, img: "img/cacaooreo.png" },
  ],
  yaourt: [
    { name: "Yaourt việt quất ", price: 20000, img: "img/yaourtvietquat.png" },
    { name: "Yaourt chuối", price: 23000, img: "img/yaourtchuoi.png" },
    { name: "Yaourt xoài", price: 22000, img: "img/yaourtxoai.png" },
    { name: "Yaourt Dâu", price: 25000, img: "img/yaourtdau.png" },
    { name: "Yaourt oreo", price: 25000, img: "img/yaourtoreo.png" },
  ],
  nuocep: [
    { name: "Nước ép cam", price: 15000, img: "img/cam.png" },
    { name: "Nước ép dưa hấu", price: 18000, img: "img/duahau.png" },
    { name: "Nước ép dứa", price: 18000, img: "img/dua.png" },
    { name: "Nước ép táo", price: 20000, img: "img/tao.png" },
    { name: "Nước ép dừa tươi", price: 15000, img: "img/duatuoi.png" },
  ],
  cake: [
    { name: "Bánh tiramisu", price: 35000, img: "img/tiramisu.png" },
    { name: "Bánh cheesecake", price: 32000, img: "img/cheesecake.png" },
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
        'Thanh toán thành công!\nCảm ơn bạn đã ủng hộ "TIỆM NHÀ NHYY" 💖'
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
// ========================
// NAV TOGGLE (menu.html, cart.html)
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }
});
