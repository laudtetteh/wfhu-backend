module.exports = {
  find: async (ctx) => {
    let events;

    if (ctx.query._q) {

        // events = await strapi.api.event.services.event.search(ctx.query);
        events = await strapi.api.event.services.event.search({})
        .select({
            id: 1,
            name: 1,
            slug: 1,
            description: 1,
            event_details: 1,
            event_start: 1,
            event_end: 1,
            event_timezone: 1,
            event_ended: 1,
            keep_on_homepage: 1,
            image: 1,
            published_at: 1,
        });

    } else {

        // events = await strapi.api.event.services.event.find(ctx.query);
        events = await strapi.query('event').model.find({})
        .select({
            id: 1,
            name: 1,
            slug: 1,
            description: 1,
            event_details: 1,
            event_start: 1,
            event_end: 1,
            event_timezone: 1,
            event_ended: 1,
            keep_on_homepage: 1,
            image: 1,
            published_at: 1,
        });
    }

    return events;
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    // let event = await strapi.api.event.services.event.findOne({ id });

    let event = await strapi.query('event').model.findOne({ id })
        .select({
            id: 1,
            name: 1,
            slug: 1,
            description: 1,
            event_details: 1,
            event_start: 1,
            event_end: 1,
            event_timezone: 1,
            event_ended: 1,
            keep_on_homepage: 1,
            image: 1,
            published_at: 1,
        });

    if (!event) {
      return ctx.notFound();
    }

    return event;
  }
};
