export default {
  init() {
    this.$el.querySelectorAll('[data-select2-prop]').forEach((el) => {
      this[el.dataset.select2Prop] = el.value;
      this[`${el.dataset.select2Prop}Select2`] = $(el);
      this[`${el.dataset.select2Prop}Select2`].on('select2:select', (event) => {
        this[el.dataset.select2Prop] = event.target.value;
      });
      this.$watch(el.dataset.select2Prop, (value) => {
        this[`${el.dataset.select2Prop}Select2`].val(value).trigger('change');
      });
    });
  }
}
