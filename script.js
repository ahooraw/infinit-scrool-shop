const productContainer = document.getElementById('product-container');
const loading = document.getElementById('loading');

let page = 1;
let isLoading = false;


async function fetchProducts(page) {
  const response = await fetch(`https://fakestoreapi.com/products?limit=6&page=${page}`);
  return response.json();
}

function renderProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.image}" alt="${product.title}" width="100">
      <p>${product.price} $</p>
    `;
    productContainer.appendChild(productCard);
  });
}
async function loadProducts() {
  if (isLoading) return;
  isLoading = true;
  loading.classList.remove('hidden');

  const products = await fetchProducts(page);
  renderProducts(products);

  page++;
  isLoading = false;
  loading.classList.add('hidden');
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
    loadProducts();
  }
});

loadProducts();
