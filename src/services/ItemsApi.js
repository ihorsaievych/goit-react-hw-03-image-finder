import axios from 'axios';

export class ItemsApi {
  page = 1;
  value = '';
  pageMax = 0;

  incrementPage() {
    if (this.page < this.pageMax) this.page++;
  }

  resetPage() {
    this.page = 1;
  }

  isLastPage() {
    return this.page >= this.pageMax;
  }

  async fetchItems(string) {
    this.value = string ?? this.value;

    const config = {
      params: {
        key: '30903939-225f3880e246cfaa2c95d8898',
        page: this.page,
        per_page: 12,
        orientation: 'horizontal',
        q: this.value,
        image_type: 'photo',
      },
    };

    return await axios.get(`https://pixabay.com/api/`, config).then(res => {
      this.pageMax = Math.ceil(res.data.totalHits / config.params.per_page);

      if (res.data.totalHits === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      return res;
    });
  }
}
export const itemsApi = new ItemsApi();
