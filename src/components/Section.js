import { cardContainer } from '../utils/constants.js';
import { renderCards } from '../pages/index.js'

export class Section {
  constructor({ renderCards }, cardContainer) {
    this._renderCards = renderCards
    this._container = document.querySelector(cardContainer)
  }

  renderItems(items) {
    items.forEach((item) => {
      return this._renderCards(item)
    });
  }

  addItem = (item) => {
    this._container.prepend(item)
  }
}
