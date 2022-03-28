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
        const modelName = model.split('.')[0].replace(/\[\d+\]/g, '');
        const lastElementValue = this[modelName][this[modelName].length - 1];
        const resetValue = Object.keys(lastElementValue).reduce((acc, key) => {
          acc[key] = null;

          return acc;
        }, {});
        this[modelName].push({ ...resetValue });
      }

      const idx = input.id.replace(/\D/g, '');
      const newModel = model.replace(/\d+/gi, idx);
      input.setAttribute('x-model', newModel);
    });
  });
}

export default {
  init,
  getAttributeIdx,
};
