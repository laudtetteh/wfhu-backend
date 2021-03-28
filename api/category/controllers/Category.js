const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    find: async (ctx) => {
        let entities;

        if (ctx.query._q) {
            entities = await strapi.api.category.services.category.search(ctx.query);
        } else {
            entities = await strapi.api.category.services.category.find(ctx.query);
        }

        return entities.map(entity => {
            const category = sanitizeEntity(entity, {
                model: strapi.models.category,
            });

            if (category.previous_ ) {
                delete category.previous_;
            }

            if( category.posts ) {
                category.posts.map(post => {
                    if( post.previous_ ) {
                        delete post.previous_;
                    }
                });
            }

            return category;
        });
    },

    findOne: async (ctx) => {
        const { id } = ctx.params;
        let entity = await strapi.api.category.services.category.findOne({ id });

        if (!entity) {
            return ctx.notFound();
        }

        const category = sanitizeEntity(entity, {
            model: strapi.models.category,
        });

        if (category.previous_ ) {
            delete category.previous_;
        }

        if( category.posts ) {
            category.posts.map(post => {
                if( post.previous_ ) {
                    delete post.previous_;
                }
            });
        }

        return category;
    }
};
