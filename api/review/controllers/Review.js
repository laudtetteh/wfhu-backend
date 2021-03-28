const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    find: async (ctx) => {
        let entities;

        if (ctx.query._q) {
            entities = await strapi.api.review.services.review.search(ctx.query);
        } else {
            entities = await strapi.api.review.services.review.find(ctx.query);
        }

        return entities.map(entity => {
            const review = sanitizeEntity(entity, {
                model: strapi.models.review,
            });

            if (review.previous_ ) {
                delete review.previous_;
            }
            return review;
        });
    },

    findOne: async (ctx) => {
        const { id } = ctx.params;
        let entity = await strapi.api.review.services.review.findOne({ id });

        if (!entity) {
            return ctx.notFound();
        }

        const review = sanitizeEntity(entity, {
            model: strapi.models.review,
        });

        if (review.previous_ ) {
            delete review.previous_;
        }

        return review;
    }
};
