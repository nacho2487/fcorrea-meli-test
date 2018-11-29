import axios from "axios";

const extractData = res => res.data;

const author = {
  name: "Franco",
  lastname: "Correa"
};

const splitPrice = price => {
  const amount = Math.floor(price);
  const decimals = Math.floor((price - amount) * 100);

  return { amount, decimals };
};

const presenters = {
  itemList: input => ({
    author,
    categories: (
      (input.available_filters.find(filter => filter.id === "category") || {})
        .values || []
    ).map(category => category.name),
    items: input.results.map(item => ({
      id: item.id,
      title: item.title,
      price: { ...splitPrice(item.price), currency: item.currency_id },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping
    }))
  }),
  itemDetail: input => ({ author })
};

/**
 * MercadoLibre API base object
 *
 * Usage:
 *  const meli = new MercadoLibreAPI('MLU')
 *  const results = await meli.getSearchResults('iphone x')
 */
class MercadoLibreAPI {
  constructor(site) {
    this.client = axios.create();
    this.site = site;
    this.domain = "api.mercadolibre.com";
  }

  _getBaseUrl() {
    return `https://${this.domain}`;
  }

  _getSiteBaseUrl() {
    return `${this._getBaseUrl()}/sites/${this.site}`;
  }

  /**
   * Builds a URI from a set of strings
   *
   * Example:
   *    For [ 'api', 'v1', 'items', itemId ] with
   *    `itemId` set to 12345678. It will return
   *    'api/v1/items/12345678'.
   * @param  {...string} path
   */
  _buildResource(...path) {
    return path.join("/");
  }

  _handleRequestError(error) {
    console.log({ error });
    return error.response.data;
  }

  /**
   *
   * @param {string} query
   */
  async getSearchResults(query) {
    const resource = this._buildResource(this._getSiteBaseUrl(), "search");

    try {
      return this.client
        .get(resource, { params: { q: query } })
        .then(extractData)
        .then(presenters.itemList);
    } catch (err) {
      return this._handleRequestError(err);
    }
  }

  /**
   *
   * @param {number} id
   */
  async getItem(id) {
    const restResource = resourceName => id =>
      this._buildResource(this._getBaseUrl(), resourceName, id);

    const itemResource = restResource("items");
    const categoryResource = restResource("categories");

    try {
      const item = await this.client
        .get(itemResource(id))
        .then(extractData)
        .then(presenters.itemDetail);

      const category = await this.client
        .get(categoryResource(item.category_id))
        .then(extractData)
        .then(x => console.log({ x }) || x)
        .then(category =>
          category.path_from_root.map(category => category.name)
        );
      item.category = category;

      return item;
    } catch (err) {
      return this._handleRequestError(err);
    }
  }
}

export default MercadoLibreAPI;
