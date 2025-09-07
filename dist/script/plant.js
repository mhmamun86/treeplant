// Get Elementby id
const getEl = id => document.getElementById(id);

// All Element
const categoriesParent = getEl('categories-parent');

// Load categories
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => showCategories(data.categories));
  // { id: 1, category_name: "Fruit Tree", small_description: "Trees that bear edible fruits like mango, guava, and jackfruit." }
};

// Show Categories
const showCategories = data => {
  data.forEach(el => {
    categoriesParent.innerHTML += `
    <li>
        <button class="btn btn-cat hover:bg-[#15803D] hover:text-white px-2.5 py-2 text-black font-medium w-full justify-start">${el.category_name}</button>
    </li>
    `;
  });
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-cat');
    if (e.target.closest('.btn-cat')) {
      const allBtn = document.querySelectorAll('.btn-cat');
      allBtn.forEach(btn => {
        btn.classList.remove('bg-[#15803D]', 'text-white');
      });
      btn.classList.add('bg-[#15803D]', 'text-white');
    }
  });
};

loadCategories();
