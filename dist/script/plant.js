// Get Elementby id
const getEl = id => document.getElementById(id);

// All Element
let categoriesParent = getEl('categories-parent');
let cardParent = getEl('card-parent');
let cartParentDesktop = getEl('cart-parent-desktop');
let cartParentMobile = getEl('cart-parent-mobile');
let totalAmount = getEl('total-amount');
let totalAmountMobile = getEl('total-amount-mobile');
const getModal = getEl('modal');
const modalParent = getEl('modal-parent');

// Load categories
const loadCategories = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/categories'
  );
  const data = await res.json();
  showCategories(data.categories);
};

// Show Categories
const showCategories = data => {
  // { id: 1, category_name: "Fruit Tree", small_description: "Trees that bear edible fruits like mango, guava, and jackfruit." }
  data.forEach(el => {
    categoriesParent.innerHTML += `
    <li>
        <button id="cat-${el.id}" onclick="loadProduct('${el.id}')" class="btn btn-cat hover:bg-[#15803D] hover:text-white px-2.5 py-2 text-black font-medium w-full justify-start">${el.category_name}</button>
    </li>
    `;
  });

  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-cat');
    if (e.target.closest('.btn-cat')) {
      spinner();
      const allBtn = document.querySelectorAll('.btn-cat');
      allBtn.forEach(btn => {
        btn.classList.remove('bg-[#15803D]', 'text-white');
      });
      btn.classList.add('bg-[#15803D]', 'text-white');
    }
  });
  loadAllProduct();
};

// Load Trees
const loadProduct = async id => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${id}`
  );
  const data = await res.json();
  displayProduct(data.plants);
};

const loadAllProduct = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/plants`);
  const data = await res.json();
  displayProduct(data.plants);
};

//Display product
const displayProduct = product => {
  cardParent.innerHTML = '';
  product.forEach(each => {
    cardParent.innerHTML += `
    <div class="card bg-white p-4 rounded-lg product-card">
            <figure class="aspect-[4/3]">
              <img class="rounded-lg w-full h-full object-cover" src="${
                each.image
              }" />
            </figure>
            <div class="card-body p-0 mt-3">
              <h2 class="font-semibold text-sm mb-1 title-click " data-name="${
                each.id
              }">
                ${each.name ? each.name : 'Name missing'} 
              </h2>
              <div class="w-full">
                <p class="opacity-80 text-[0.75rem] line-clamp-2">
                  ${each.description}
                </p>
              </div>
              <div class="card-actions justify-between">
                <div class="badge bg-[#DCFCE7] rounded-[400px] font-medium text-sm font-geist text-[#15803D]">
                 ${each.category}</div>
                <h2 class="font-semibold text-sm"> ট <span>${
                  each.price
                }<span /></h2>
              </div>
              <button class="btn bg-[#15803D] px-5 py-3 mt-3 text-white font-medium w-full rounded-[999px] btn-cart" data-id="${
                each.id
              }">Add
                Cart</button>
            </div>
          </div>
    `;
  });
};

const spinner = () => {
  cardParent.innerHTML = `<div class="col-span-full flex justify-center items-center min-h-[200px]">
            <span class="loading loading-dots loading-xl"></span>
          </div>`;
};

// cart function
let cart = [];
document.querySelector('#card-parent').addEventListener('click', e => {
  const btnCart = e.target.closest('.btn-cart');
  const titleClick = e.target.closest('.title-click');
  if (btnCart) {
    const title = btnCart.parentNode.children[0].innerText;
    const price =
      btnCart.parentNode.children[2].children[1].children[0].innerText;
    const id = btnCart.dataset.id;
    const allDetails = {
      id: id,
      name: title,
      price: price,
    };
    addToCart(allDetails);
  }
  if (titleClick) {
    const id = titleClick.dataset.name;
    loadPlantDetails(id);
  }
});

// show plant details by clicking cart plant title
document.querySelectorAll('.cart-click-parent').forEach(parent => {
  parent.addEventListener('click', e => {
    const nameClick = e.target.closest('.cart-name');
    if (nameClick) {
      const id = nameClick.dataset.id;
      loadPlantDetails(id);
    }
  });
});

// load single plant
const loadPlantDetails = async id => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${id}`
  );
  const data = await res.json();
  const details = data.plants;
  modalParent.innerHTML = `
    <h1 class="font-semibold text-2xl">${details.name}</h1>
        <figure class="aspect-[4/3]">
          <img class="rounded-lg w-full h-full object-cover" src="${details.image}" />
        </figure>
        <h2 class="font-medium ">Category: <span>${details.category}</span></h2>
        <h2 class="font-medium">Price: <span>ট</span> <span>${details.price}</span></h2>
        <p class="opacity-80">Description: <span>${details.description}</span></p>
    `;
  getModal.showModal();
};

// add to cart
const addToCart = data => {
  const exist = cart.find(each => each.id === data.id);
  if (exist) {
    exist.quantity += 1;
    showAlert(`${data.name} quantity updated`);
  } else {
    cart.push({ ...data, quantity: 1 });
    showAlert(`${data.name} added to cart`);
  }
  showCart(cartParentDesktop, totalAmount);
  showCart(cartParentMobile, totalAmountMobile);
};

// cart display
const showCart = (container, totalEl) => {
  container.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    // { id: "2", name: "Guava Tree", price: "350", quantity: 1 }
    container.innerHTML += `
    <li class=" p-2 bg-[#F0FDF4]">
            <div class="flex justify-between">
              <div>
                <div class="list flex flex-col">
                  <h2 class="font-semibold text-sm mb-2 cart-name" data-id="${item.id}">${item.name}</h2>
                  <div class=" font-semibold opacity-70">${item.price}</span><i class="fa-solid fa-xmark"></i><span>${item.quantity}</span>
                </div>
                </div>
              </div>
              <div>
                <button onclick="updateCart('${item.id}')" class="btn btn-square btn-ghost ">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </li>
    `;
  });
  totalEl.innerHTML = total;
};

// Update cart
const updateCart = id => {
  const product = cart.find(item => item.id === id);
  cart = cart.filter(item => item.id !== id);
  showCart(cartParentDesktop, totalAmount);
  showCart(cartParentMobile, totalAmountMobile);
  if (product) {
    showAlert(`${product.name} removed from cart`);
  }
};

// show alert
const showAlert = message => {
  const container = document.getElementById('alert-container');
  const alert = document.createElement('div');
  alert.innerHTML = `<div class="bg-green-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
        <i class="fa-regular fa-circle-check "></i>
        <span class="text-green-800"> ${message}</span>
    </div`;
  container.append(alert);
  setTimeout(() => {
    alert.classList.add('opacity-10', 'scale-90');
    setTimeout(() => alert.remove(), 500);
  }, 2000);
};

loadCategories();
