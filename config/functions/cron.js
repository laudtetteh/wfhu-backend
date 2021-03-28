'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
 */

module.exports = {
  '*/1 * * * *': async () => {
    // fetch posts to publish
    const draftPostToPublish = await strapi.api.post.services.post.find({
      _publicationState: 'preview',
      publish_at_lt: new Date(),
    });

    const draftEventToPublish = await strapi.api.event.services.event.find({
      _publicationState: 'preview',
      publish_at_lt: new Date(),
    });

    // update published_at of posts
    draftPostToPublish.forEach(async post => {
      await strapi.api.post.services.post.update(
        { id: post.id },
        { published_at: new Date() }
      );
    });

    // update published_at of events
    draftEventToPublish.forEach(async event => {
      await strapi.api.event.services.event.update(
        { id: event.id },
        { published_at: new Date() }
      );
    });
  },
};
