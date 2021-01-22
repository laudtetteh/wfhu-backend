module.exports = {
  // Get post note from review's note
  average: post => {
    return strapi
      .query('review')
      .model.query(function(qb) {
        qb.avg('note as note');
        qb.where('post', '=', post);
      })
      .fetch()
      .then(res => res.get('note'));
  },
};
