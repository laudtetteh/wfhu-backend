'use strict';

/**
* Lifecycle callbacks for the `Page` model.
* Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
* to customize this model
* Creating slugs: ttps://strapi.io/documentation/3.0.0-beta.x/guides/slug.html#create-attributes
*/

const slugify = require('slugify');

///-------------Bookshelf 1
// module.exports = {

//     beforeSave: async (model, attrs, options) => {

//         if (options.method === 'insert' && attrs.title) {

//             model.set('slug', slugify(attrs.title.toLowerCase()));

//         } else if (options.method === 'update' && attrs.title) {

//             attrs.slug = slugify(attrs.title.toLowerCase());
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
//       if (data.title) {
//        data.slug = slugify(data.title.toLowerCase());
//       }
//     },
//     async beforeUpdate(params, data) {
//       if (data.title) {
//         data.slug = slugify(data.title.toLowerCase());
//       }
//     },
//   },
// };

///-------------Mongoose
module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
    // Slugify slug field
      if (data.title) {
        data.slug = slugify(data.title.toLowerCase());
      }
      // Slugify template field
      if (data.template) {
        data.template = slugify(data.template.toLowerCase());
      }
    },
    beforeUpdate: async (params, data) => {
    // Slugify slug field
      if (data.title) {
        data.slug = slugify(data.title.toLowerCase());
      }

      // Slugify template field
      if (data.template) {
        data.template = slugify(data.template.toLowerCase());
      }
    },





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
  },
};




