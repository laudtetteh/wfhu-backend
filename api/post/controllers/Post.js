module.exports = {
  find: async (ctx) => {
    let posts;

    if (ctx.query._q) {
      posts = await strapi.api.post.services.post.search(ctx.query);
    } else {
      posts = await strapi.api.post.services.post.find(ctx.query);
    }

    return posts;
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    let post = await strapi.api.post.services.post.findOne({ id });

    if (!post) {
      return ctx.notFound();
    }

    return post;
  }
};
