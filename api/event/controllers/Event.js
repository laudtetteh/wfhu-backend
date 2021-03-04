module.exports = {
  find: async (ctx) => {
    let events;

    if (ctx.query._q) {
      events = await strapi.api.event.services.event.search(ctx.query);
    } else {
      events = await strapi.api.event.services.event.find(ctx.query);
    }

    return events;
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    let event = await strapi.api.event.services.event.findOne({ id });

    if (!event) {
      return ctx.notFound();
    }

    return event;
  }
};
