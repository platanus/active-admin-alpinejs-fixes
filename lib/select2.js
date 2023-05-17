export default {
  init() {
    this.$el.querySelectorAll('select').forEach((el) => {
      const model = el.getAttribute('x-model');
      if (!model) return;
      this[model] = el.value;
      this[`${model}Select2`] = $(el);

      if (el.classList.contains('tags-input')) {
        this[model] = this[model] || [];
        const selectId = el.getAttribute('id');
        const selectedOptionsWrapper = el.parentElement.querySelector(`#${selectId}_selected_values`);
        this[`${model}Select2`].on('select2:select', () => {
          window.setTimeout(() => {
            const selectedValues = [...selectedOptionsWrapper
              .querySelectorAll('input')].map((input) => input.value);
            this[model] = selectedValues;
          });
        });
        this[`${model}Select2`].on('select2:clear', () => {
          window.setTimeout(() => {
            const selectedValues = [...selectedOptionsWrapper
              .querySelectorAll('input')].map((input) => input.value);
            this[model] = selectedValues;
          });
        });
        this.$watch(model, (value) => {
          const firstOption = selectedOptionsWrapper.querySelector('input');
          const selectedOptionName = firstOption.getAttribute('name');
          selectedOptionsWrapper.innerHTML = '';
          const selectedValues = value || [];
          selectedValues.forEach((val) => {
            const idValue = val || 'empty';
            const input = document.createElement('input');
            input.setAttribute('id', `${selectId}_${idValue}`);
            input.setAttribute('name', selectedOptionName);
            input.setAttribute('type', 'hidden');
            input.setAttribute('value', val);
            selectedOptionsWrapper.appendChild(input);
          });
          this[`${model}Select2`].val(value).trigger('change');
        });
      } else {
        this[`${model}Select2`].on('select2:select', (event) => {
          this[model] = event.target.value;
        });
        this[`${model}Select2`].on('select2:clear', (event) => {
          this[model] = undefined;
        });
        this.$watch(model, (value) => {
          this[`${model}Select2`].val(value).trigger('change');
        });
      }
    });
  }
}
