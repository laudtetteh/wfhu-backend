'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
 */

module.exports = {
  '*/1 * * * * *': async () => {
    const draftPages = await strapi.services.page.find({
      _publicationState: 'preview',
      publish_at_lt: new Date(),
    });

    draftPages.forEach(page => {
      strapi.services.page.update({id: page.id}, {
        published_at: new Date(),
        publish_at: null
      })
    });
  }
};
