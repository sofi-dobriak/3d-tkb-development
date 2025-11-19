export const themeFactory = ref => ({
  element: ref,
  open() {
    this.element.classList.add('dark-theme');
  },
  close() {
    this.element.classList.remove('dark-theme');
  },
  toggle() {
    this.element.classList.toggle('dark-theme');
  },
});
