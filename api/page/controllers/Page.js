const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    find: async (ctx) => {
        let entities;

        if (ctx.query._q) {
            entities = await strapi.api.page.services.page.search(ctx.query);
        } else {
            entities = await strapi.api.page.services.page.find(ctx.query);
        }

        return entities;

        // return entities.map(entity => {
        //     const page = sanitizeEntity(entity, {
        //         model: strapi.models.page,
        //     });

        //     if (page.previous_ ) {
        //         delete page.previous_;
        //     }
        //     return page;
        // });
    },

    findOne: async (ctx) => {
        const { id } = ctx.params;
        let entity = await strapi.api.page.services.page.findOne({ id });

        if (!entity) {
            return ctx.notFound();
        }

        return entity;

        // const page = sanitizeEntity(entity, {
        //     model: strapi.models.page,
        // });

        // if (page.previous_ ) {
        //     delete page.previous_;
        // }

        return page;
    }
};
