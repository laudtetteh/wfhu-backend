'use strict';

/**
 * Lifecycle callbacks for the `Page` model.
 */

module.exports = {
  lifecycles: {
    afterCreate(result, data) {
      strapi.services.history.create({
        action: 'create',
        contenttype: 'page',
        author: data.author_,
        before: {},
        after: result
      });
    },
    async beforeUpdate(params, data){
      const [previous_] = await strapi.services.page.find(params);
      data.previous_ = previous_;
    },
    afterUpdate(result, params, data){
      strapi.services.history.create({
        action: 'update',
        contenttype: 'page',
        author: data.author_,
        before: data.previous_,
        after: result
      });
    }
  }
};
