export default {
  init() {
    this.$el.querySelectorAll('select').forEach((el) => {
      const model = el.getAttribute('x-model');
      if (!model) return;

      this[model] = el.value;
      this[`${model}Select2`] = $(el);
      this[`${model}Select2`].on('select2:select', (event) => {
        this[model] = event.target.value;
      });
      this.$watch(model, (value) => {
        this[`${model}Select2`].val(value).trigger('change');
      });
    });
  }
}
