export class Section {
  constructor({ items, renderer }, cardContainer) {
    this._container = document.querySelector('.places__gallery')
    this._items = items
    this._renderer = renderer
  }

  renderItems() {
    this._items.forEach(data => {
      this._renderer(data, this._container)
    })
  }

  addItem(element) {
    this._container.prepend(element)
  }
}
