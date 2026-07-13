// お問い合わせフォーム バリデーション
const form = document.getElementById('contact-form');

if (form) {
  const fields = {
    name: {
      el: document.getElementById('name'),
      errorEl: document.getElementById('error-name'),
      isValid: el => el.value.trim().length > 0,
    },
    email: {
      el: document.getElementById('email'),
      errorEl: document.getElementById('error-email'),
      isValid: el => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()),
    },
    service: {
      el: document.getElementById('service'),
      errorEl: document.getElementById('error-service'),
      isValid: el => el.value.trim().length > 0,
    },
    message: {
      el: document.getElementById('message'),
      errorEl: document.getElementById('error-message'),
      isValid: el => el.value.trim().length > 0,
    },
  };

  function errorClassFor(el) {
    if (el.tagName === 'SELECT') return 'form__select--error';
    if (el.tagName === 'TEXTAREA') return 'form__textarea--error';
    return 'form__input--error';
  }

  function showError(field) {
    field.el.classList.add(errorClassFor(field.el));
    field.errorEl.classList.add('form__error--show');
  }

  function clearError(field) {
    field.el.classList.remove(errorClassFor(field.el));
    field.errorEl.classList.remove('form__error--show');
  }

  function validateAll() {
    let isValid = true;
    Object.values(fields).forEach(field => {
      if (field.isValid(field.el)) {
        clearError(field);
      } else {
        showError(field);
        isValid = false;
      }
    });
    return isValid;
  }

  Object.values(fields).forEach(field => {
    const eventType = field.el.tagName === 'SELECT' ? 'change' : 'input';
    field.el.addEventListener(eventType, () => {
      if (field.isValid(field.el)) clearError(field);
    });
  });

  form.addEventListener('submit', e => {
    if (!validateAll()) {
      e.preventDefault();
      return;
    }

    const confirmed = window.confirm('入力内容を送信します。よろしいですか？');
    if (!confirmed) {
      e.preventDefault();
    }
  });
}
