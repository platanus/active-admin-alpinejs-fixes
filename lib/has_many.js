function getAttributeIdx($el) {
  return Number($el.id.replace(/\D/g, ''));
}

function init() {
  $(document).on('has_many_add:after', (form, fieldset) => {
    const inputs = fieldset[0].querySelectorAll('li input');
    inputs.forEach((input, i) => {
      const model = input.getAttribute('x-model');
      if (!model) return;
      if (i === 0) {
        this[model.split('.')[0].replace(/\[\d+\]/g, '')].push({});
      }

      const idx = input.id.replace(/\D/g, '');
      input.setAttribute('x-model', model.replace(/\d+/gi, idx));
    });
  });
}

export default {
  init,
  getAttributeIdx,
};
