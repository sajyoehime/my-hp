// 流れセクション タブ切り替え
const tabs = document.querySelectorAll('.flow__tab');
const contents = {
  make: document.getElementById('flow-make'),
  coach: document.getElementById('flow-coach'),
};

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('flow__tab--active'));
    tab.classList.add('flow__tab--active');

    const target = tab.dataset.tab;
    Object.keys(contents).forEach(key => {
      contents[key].classList.toggle('flow__content--hidden', key !== target);
    });
  });
});

// ヘッダーナビ スムーズスクロール（念のため補完）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
