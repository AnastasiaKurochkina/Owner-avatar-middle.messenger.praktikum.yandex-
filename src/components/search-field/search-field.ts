import Block from '../../core/Block';

type TSearchField = {};

export class SearchField extends Block<TSearchField> {
  constructor(props: TSearchField) {
    super(props);
  }

  protected render(): string {
    return `
    <div class="search-container">
    <input type="text" class="search-input" />
    <div class="search-input__placeholder">
      <img src="assets/search.svg" alt="" />
      <p class="search-input__title">Поиск</p>
    </div>
  </div>`;
  }
}
