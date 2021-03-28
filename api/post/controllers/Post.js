const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    find: async (ctx) => {
        let entities;

        if (ctx.query._q) {
            entities = await strapi.api.post.services.post.search(ctx.query);
        } else {
            entities = await strapi.api.post.services.post.find(ctx.query);
        }

        return entities.map(entity => {
            const post = sanitizeEntity(entity, {
                model: strapi.models.post,
            });

            if( post.previous_ ) {
                delete post.previous_;
            }

            if( post.category && post.category.previous_) {
                delete post.category.previous_;
            }

            return post;
        });
    },

    findOne: async (ctx) => {
        const { id } = ctx.params;
        let entity = await strapi.api.post.services.post.findOne({ id });

        if (!entity) {
            return ctx.notFound();
        }

        const post = sanitizeEntity(entity, {
            model: strapi.models.post,
        });

        if( post.category && post.category.previous_) {
            delete post.category.previous_;
        }

        if(post.previous_ ) {
            delete post.previous_;
        }

        return post;
    }
};
