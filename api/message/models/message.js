'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

///-------------Mongoose
module.exports = {
  lifecycles: {

    beforeCreate: async (data) => {
        // console.log(data);
        // Set name field
        data.name = data.first_name + " " + data.last_name;
        // Set content type to 'message'
        data.contenttype = 'message';
    },

    beforeUpdate: async (params, data) => {
      // Set name field
        data.name = data.first_name + " " + data.last_name;
        // Set content type to 'message'
        data.contenttype = 'message';

      // const [previous_] = await strapi.services.message.find(params);
      // data.previous_ = previous_;
    },

    // afterCreate: async (result, data) => {
    //   strapi.services.history.create({
    //     action: 'create',
    //     contenttype: 'message',
    //     author: data.author_,
    //     before: {},
    //     after: result
    //   });
    // },

    // afterUpdate: async (result, params, data) => {
    //   strapi.services.history.create({
    //     action: 'update',
    //     contenttype: 'message',
    //     author: data.author_,
    //     before: data.previous_,
    //     after: result
    //   });
    // }
  },
};





