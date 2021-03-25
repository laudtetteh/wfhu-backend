module.exports = {
  find: async (ctx) => {
    let posts;

    if (ctx.query._q) {

      // posts = await strapi.api.post.services.post.search(ctx.query);
      posts = await strapi.api.post.services.post.search({}).select({
        id: 1,
        name: 1,
        slug: 1,
        excerpt: 1,
        description: 1,
        image: 1,
        published_at: 1
      }).populate('category', ['id', 'name', 'slug']); //populate 'category' relation and populate its 'id', 'name', 'slug' fields

    } else {

      // posts = await strapi.api.post.services.post.find(ctx.query);
      posts = await strapi.query('post').model.find({}).select({
        id: 1,
        name: 1,
        slug: 1,
        excerpt: 1,
        description: 1,
        image: 1,
        published_at: 1
      }).populate('category', ['id', 'name', 'slug']);
    }

    return posts;
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    // let post = await strapi.api.post.services.post.findOne({ id });

    let post = await strapi.query('post').model.findOne({ id }).select({
        id: 1,
        name: 1,
        slug: 1,
        excerpt: 1,
        description: 1,
        image: 1,
        published_at: 1
      }).populate('category', ['id', 'name', 'slug']);

    if (!post) {
      return ctx.notFound();
    }

    return post;
  }
};
