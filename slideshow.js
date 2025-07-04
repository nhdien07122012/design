let CARD_PER_VIEW = window.innerWidth < 600 ? 1 : 3; // Hiển thị 1 thẻ nếu màn nhỏ

let images = [];
let current = 0;
let timer = null;

async function loadImages() {
  const res = await fetch('image.json');
  images = await res.json();
  render();
  startAutoSlide();
}

function render() {
  const cardList = document.getElementById('card-list');
  cardList.innerHTML = '';
  let start = current;
  let cards = [];
  for (let i = 0; i < CARD_PER_VIEW; i++) {
    let idx = (start + i) % images.length;
    let img = images[idx];
    cards.push(`
      <div class="card">
        <div class="card-bg" style="background-image:url('photos/${img}')"></div>
        <img class="card-img" src="photos/${img}" alt="${img}">
        <div class="card-title">${img}</div>
        <div class="card-desc">Ảnh số ${idx+1}</div>
      </div>
    `);
  }
  cardList.innerHTML = cards.join('');

  // Dots
  const dots = document.getElementById('dots');
  dots.innerHTML = '';
  for (let i = 0; i < images.length; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === current ? ' active' : '');
    dot.onclick = () => { current = i; render(); resetAutoSlide(); };
    dots.appendChild(dot);
  }
}

function next() {
  current = (current + 1) % images.length;
  render();
  resetAutoSlide();
}
function prev() {
  current = (current - 1 + images.length) % images.length;
  render();
  resetAutoSlide();
}

function startAutoSlide() {
  timer = setInterval(next, 3500);
}
function resetAutoSlide() {
  clearInterval(timer);
  startAutoSlide();
}

document.querySelector('.next').onclick = next;
document.querySelector('.prev').onclick = prev;

window.addEventListener('resize', () => {
  if (window.innerWidth < 600) {
    CARD_PER_VIEW = 1;
  } else {
    CARD_PER_VIEW = 3;
  }
  render();
});

loadImages();