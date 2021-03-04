'use strict';

/**
* Lifecycle callbacks for the `Event` model.
* Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
* to customize this model
* Creating slugs: ttps://strapi.io/documentation/3.0.0-beta.x/guides/slug.html#create-attributes
*/

const slugify = require('slugify');

///-------------Bookshelf 1
// module.exports = {

//     beforeSave: async (model, attrs, options) => {

//         if (options.method === 'insert' && attrs.name) {

//             model.set('slug', slugify(attrs.name.toLowerCase()));
//             model.set('contenttype', 'event');

//         } else if (options.method === 'update' && attrs.name) {

//             attrs.slug = slugify(attrs.name.toLowerCase());
//             attrs.contenttype = 'event';
//         }
//     },
// };

///-------------Bookshelf 2
// module.exports = {
//   /**
//    * Triggered before user creation.
//    */
//   lifecycles: {

//     async beforeCreate(data) {
//       if (data.name) {
//        data.slug = slugify(data.name.toLowerCase());
//       }

//       // Set content type to 'event'
//       data.contenttype = 'event';
//     },

//     async beforeUpdate(params, data) {
//       if (data.name) {
//         data.slug = slugify(data.name.toLowerCase());
//       }

//       // Set content type to 'event'
//       data.contenttype = 'event';
//     },
//   },
// };

///-------------Mongoose
module.exports = {
  lifecycles: {

    beforeCreate: async (data) => {
      // Slugify name field
      if (data.name) {
        data.slug = slugify(data.name.toLowerCase());
      }

      // Set content type to 'event'
      data.contenttype = 'event';
    },

    beforeUpdate: async (params, data) => {
      // Slugify name field
      if (data.name) {
        data.slug = slugify(data.name.toLowerCase());
      }

      // Set content type to 'event'
      data.contenttype = 'event';

      const [previous_] = await strapi.services.event.find(params);
      data.previous_ = previous_;
    },

    afterCreate: async (result, data) => {
      strapi.services.history.create({
        action: 'create',
        contenttype: 'event',
        author: data.author_,
        before: {},
        after: result
      });
    },

    afterUpdate: async (result, params, data) => {
      strapi.services.history.create({
        action: 'update',
        contenttype: 'event',
        author: data.author_,
        before: data.previous_,
        after: result
      });
    }
  },
};




