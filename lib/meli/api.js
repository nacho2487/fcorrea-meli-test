import axios from "axios";

const extractData = res => res.data;

/**
 * MercadoLibre API base object
 *
 * Usage:
 *  const meli = new MercadoLibreAPI('MLU')
 *  const results = await meli.getSearchResults('iphone x')
 */
export default class MercadoLibreAPI {
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
    return err.response.data;
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
        .then(extractData);
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
      const item = await this.client.get(itemResource(id)).then(extractData);

      const category = await this.client
        .get(categoryResource(item.data.category_id))
        .then(extractData);

      item.category = category;

      return item;
    } catch (err) {
      return this._handleRequestError(err);
    }
  }
}
