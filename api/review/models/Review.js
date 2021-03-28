'use strict';

/**
* Lifecycle callbacks for the `Post` model.
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
//             model.set('contenttype', 'review');

//         } else if (options.method === 'update' && attrs.name) {

//             attrs.slug = slugify(attrs.name.toLowerCase());
//             attrs.contenttype = 'review';
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

//       // Set content type to 'review'
//       data.contenttype = 'review';
//     },

//     async beforeUpdate(params, data) {
//       if (data.name) {
//         data.slug = slugify(data.name.toLowerCase());
//       }

//       // Set content type to 'review'
//       data.contenttype = 'review';
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
    },

    beforeUpdate: async (params, data) => {
      // Slugify name field
      if (data.name) {
        data.slug = slugify(data.name.toLowerCase());
      }
    },


    afterUpdate: async (result, params, data) => {

    }
  },
};
