module.exports = {
  // Get page note from review's note
  average: page => {
    return strapi
      .query('review')
      .model.query(function(qb) {
        qb.avg('note as note');
        qb.where('page', '=', page);
      })
      .fetch()
      .then(res => res.get('note'));
  },
};
