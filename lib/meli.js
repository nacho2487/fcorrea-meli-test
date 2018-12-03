import axios from "axios";

const extractData = res => res.data;

const author = {
  name: "Franco",
  lastname: "Correa"
};

const FieldTransformers = {
  splitPrice: price => {
    const amount = Math.floor(price);
    const decimals = Math.floor((price - amount) * 100);

    return { amount, decimals };
  },
  categoriesFromFilters: filters =>
    ((filters.find(filter => filter.id === "category") || {}).values || [])
      .map(category => category.name)
      .slice(0, 5)
};

const APITransformers = {
  itemList: input => ({
    author,
    categories: FieldTransformers.categoriesFromFilters(
      input.available_filters
    ),
    items: input.results.map(item => ({
      id: item.id,
      title: item.title,
      price: {
        ...FieldTransformers.splitPrice(item.price),
        currency: item.currency_id
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      city_name: item.address.city_name
    }))
  }),
  itemDetail: input => ({
    author,
    item: {
      categories: input.category,
      id: input.id,
      title: input.title,
      price: {
        ...FieldTransformers.splitPrice(input.price),
        currency: input.currency_id
      },
      picture: input.pictures[0].secure_url,
      condition: input.condition,
      sold_quantity: input.sold_quantity,
      free_shipping: input.shipping.free_shipping,
      description: input.description
    }
  })
};

/**
 * MercadoLibre API base object
 *
 * Usage:
 *  const meli = new MercadoLibreAPI('MLU')
 *  const results = await meli.getSearchResults('iphone x')
 */
class MercadoLibreAPI {
  constructor(site, isServer = true) {
    this.client = axios.create();
    this.site = site;
    this.domain = "api.mercadolibre.com";
    this.isServer = true;
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
    return error.response.data;
  }

  /**
   *
   * @param {string} query
   */
  async getSearchResults(q) {
    const resource = this._buildResource(this._getSiteBaseUrl(), "search");
    const limit = 4;

    try {
      return this.client
        .get(resource, { params: { q, limit } })
        .then(extractData)
        .then(APITransformers.itemList);
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
    const descriptionResource = itemId =>
      this._buildResource(itemResource(itemId), "description");

    try {
      const item = await this.client.get(itemResource(id)).then(extractData);

      const category = await this.client
        .get(categoryResource(item.category_id))
        .then(extractData)
        .then(category =>
          category.path_from_root.map(category => category.name)
        );

      item.category = category;

      const description = await this.client(descriptionResource(id))
        .then(extractData)
        .then(descriptionObject => descriptionObject.plain_text);

      item.description = description;

      const response = APITransformers.itemDetail(item);
      ({ response });
      return response;
    } catch (err) {
      return this._handleRequestError(err);
    }
  }
}

export default MercadoLibreAPI;
