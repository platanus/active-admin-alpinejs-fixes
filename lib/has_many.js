function getAttributeIdx($el) {
  const id = $el.getAttribute('id');
  if (!id) {
    const closestId = $el.parentNode.querySelector('[id]').getAttribute('id');
    if (!closestId) {
      console.error('No id found for element. Try adding a sibling with an id.', $el);

      return null;
    }

    return Number(closestId.replace(/\D/g, ''));
  }

  return Number(id.replace(/\D/g, ''));
}

function init() {
  $(document).on('has_many_add:after', (form, fieldset) => {
    const inputs = fieldset[0].querySelectorAll('li input, li select, li textarea');
    let alreadyAddedValue = false;

    inputs.forEach((input) => {
      const model = input.getAttribute('x-model');
      if (!model) return;

      if (!alreadyAddedValue) {
        const modelName = model.split('.')[0].replace(/\[\d+\]/g, '');
        const lastElementValue = this[modelName][this[modelName].length - 1];
        const resetValue = Object.keys(lastElementValue).reduce((acc, key) => {
          acc[key] = null;

          return acc;
        }, {});
        this[modelName].push({ ...resetValue });
        alreadyAddedValue = true;
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
