module.exports = {
  find: async (ctx) => {
    let pages;

    if (ctx.query._q) {
      pages = await strapi.api.page.services.page.search(ctx.query);
    } else {
      pages = await strapi.api.page.services.page.find(ctx.query);
    }

    // pages = await Promise.all(
    //   pages.map(async (page) => {
    //     page.note = await strapi.api.review.services.review.average(page.id);

    //     return page;
    //   })
    // );

    return pages;
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    let page = await strapi.api.page.services.page.findOne({ id });

    if (!page) {
      return ctx.notFound();
    }

    // page.note = await strapi.api.review.services.review.average(page.id);

    // let noteDetails = await strapi
    //   .query('review')
    //   .model.query(function (qb) {
    //     qb.where('page', '=', page.id);
    //     qb.groupBy('note');
    //     qb.select('note');
    //     qb.count();
    //   })
    //   .fetchAll()
    //   .then((res) => res.toJSON());

    // page.noteDetails = [];

    // for (let i = 5; i > 0; i--) {
    //   let detail = noteDetails.find((detail) => {
    //     return detail.note === i;
    //   });

    //   if (detail) {
    //     detail = {
    //       note: detail.note,
    //       count: detail['count(*)'],
    //     };
    //   } else {
    //     detail = {
    //       note: i,
    //       count: 0,
    //     };
    //   }

    //   page.noteDetails.push(detail);
    // }

    return page;
  }
};
