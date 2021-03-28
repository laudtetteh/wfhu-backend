const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    find: async (ctx) => {
        let entities;

        if (ctx.query._q) {
            entities = await strapi.api.event.services.event.search(ctx.query);
        } else {
            entities = await strapi.api.event.services.event.find(ctx.query);
        }

        return entities.map(entity => {
            const event = sanitizeEntity(entity, {
                model: strapi.models.event,
            });

            if (event.previous_ ) {
                delete event.previous_;
            }
            return event;
        });
    },

    findOne: async (ctx) => {
        const { id } = ctx.params;
        let entity = await strapi.api.event.services.event.findOne({ id });

        if (!entity) {
            return ctx.notFound();
        }

        const event = sanitizeEntity(entity, {
            model: strapi.models.event,
        });

        if (event.previous_ ) {
            delete event.previous_;
        }

        return event;
    }
};
