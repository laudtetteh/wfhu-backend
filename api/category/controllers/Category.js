module.exports = {
  find: async (ctx) => {
    let categories;

    if (ctx.query._q) {

        // categories = await strapi.api.category.services.category.search(ctx.query);
        categories = await strapi.api.category.services.category.search({})
            .select({
            id: 1,
            name: 1,
            slug: 1,
        })
        .populate('post', [
            'id',
            'name',
            'slug',
            'excerpt',
            'description',
            'image',
            'category'
        ]); //populate 'category' relation and populate its 'id', 'name', 'slug' fields

    } else {

      // categories = await strapi.api.category.services.category.find(ctx.query);
      categories = await strapi.query('category').model.find({})
      .select({
            id: 1,
            name: 1,
            slug: 1,
        })
        .populate('post', [
            'id',
            'name',
            'slug',
            'excerpt',
            'description',
            'image',
            'category'
        ]);
    }

    return categories;
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    // let category = await strapi.api.category.services.category.findOne({ id });

    let category = await strapi.query('category').model.findOne({ id })
    .select({
        id: 1,
        name: 1,
        slug: 1,
    })
    .populate('post', [
        'id',
        'name',
        'slug',
        'excerpt',
        'description',
        'image',
        'category'
    ]);

    if (!category) {
      return ctx.notFound();
    }

    return category;
  }
};
