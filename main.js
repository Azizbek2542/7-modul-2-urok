const cartContainer = document.getElementById("cart");
    const totalElement = document.getElementById("total");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateTotal() {
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function renderCart() {
      cartContainer.innerHTML = "";
      const emptyTitle = document.querySelector(".empty-title");
      if (cart.length === 0) {
      emptyTitle.style.display = "flex";
      document.querySelector('.cart-title').style.visibility = 'hidden';
      document.querySelector('.Close-word').style.visibility = 'visible';
      } else {
      emptyTitle.style.display = "none";
      document.querySelector('.cart-title').style.visibility = 'visible';
      }
      cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("shopping-card");
        cartItem.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.price} $</p>
          <button title="delete card" class="delete-btn">🗑️</button>
        `;

        const deleteBtn = cartItem.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
          cart.splice(index, 1);
          saveCart();
          renderCart();
        });

        cartContainer.appendChild(cartItem);
      });
      updateTotal();
    }

    function addToCart(product) {
      cart.push(product);
      saveCart();
      renderCart();
    }

    renderCart();

    fetch("https://fakestoreapi.com/products?limit=10")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("products");

        data.forEach(product => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price} $</p>
            <button class="btn">Buy</button>
          `;

          attachCartMsgEvents()

          const btn = card.querySelector(".btn");
          btn.addEventListener("click", () => {
            addToCart(product);
          });

          container.appendChild(card);
        });
      })
      .catch(err => console.error("Ошибка:", err));

      

document.querySelector('.cart-button').addEventListener("click", () => {
    const cartSidebar = document.querySelector('.cart-container');
    if (cartSidebar.style.display === 'grid') {
        cartSidebar.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.querySelector('.cart-button').style.pointerEvents = 'auto';
    } else {
        cartSidebar.style.display = 'grid';
        document.querySelector('.cart-button').style.pointerEvents = 'none';
    }
});

document.querySelector('.Close-word').addEventListener("click", () => {
    const cartSidebar = document.querySelector('.cart-container');
    cartSidebar.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('.cart-button').style.pointerEvents = 'auto';
});

function attachCartMsgEvents() {
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cartMsg = document.getElementById("cart-msg");
      cartMsg.classList.add("active");
      setTimeout(() => {
        cartMsg.classList.remove("active");
      }, 2200);
    });
  });
}


