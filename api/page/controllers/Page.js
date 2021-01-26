module.exports = {
  find: async (ctx) => {
    let pages;

    if (ctx.query._q) {
      pages = await strapi.api.page.services.page.search(ctx.query);
    } else {
      pages = await strapi.api.page.services.page.find(ctx.query);
    }

    return pages;
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    let page = await strapi.api.page.services.page.findOne({ id });

    if (!page) {
      return ctx.notFound();
    }

    return page;
  }
};
