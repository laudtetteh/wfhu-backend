const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    find: async (ctx) => {
        let entities;

        if (ctx.query._q) {
            entities = await strapi.services.post.search(ctx.query);
        } else {
            entities = await strapi.services.post.find(ctx.query);
        }

        return entities;
    },

    findOne: async (ctx) => {
        const { id } = ctx.params;
        let entity = await strapi.services.post.findOne({ id });

        if (!entity) {
            return ctx.notFound();
        }

        return entity;
    }
};
