'use strict';
/**
* Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
* to customize this controller
*/
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const fetch = require("node-fetch");
const _template = require('../../../utils/email_template');
require('dotenv').config();

module.exports = {

    async create(ctx) {

        let entity;

        if (ctx.is('multipart')) {

            const { data, files } = parseMultipartData(ctx);

            entity = await strapi.services.message.create(data, { files });

        } else {

            entity = await strapi.services.message.create(ctx.request.body);
        }

        entity = sanitizeEntity(entity, { model: strapi.models.message });



        let payload = {};

        payload.first_name = entity.first_name ? entity.first_name : '';
        payload.last_name = entity.last_name ? entity.last_name : '';
        payload.full_name = `${payload.first_name} ${payload.last_name}`;
        payload.email = entity.email ? entity.email : '';
        payload.phone = entity.phone ? entity.phone : '';
        payload.subject = entity.subject ? entity.subject : '';
        payload.body = entity.body ? entity.body : '';

        const siteurl = process.env.SITE_URL;
        const siteOptionsEndpoint = `${siteurl}/site-options`;

        // send an email by using the email plugin
        fetch(siteOptionsEndpoint)
            .then(response => response.text())
            .then(text => {
                try {
                    const siteOptions = JSON.parse(text);
                    // Set up `payload` properties here
                    if( siteOptions.emails.email_header_image && siteOptions.emails.email_header_image.url ) {
                        payload.header_image = `${siteurl}${siteOptions.emails.email_header_image.url}`
                    }

                    if( siteOptions.social ) {
                        payload.social = siteOptions.social;
                    }

                sendMail(payload);

                } catch(err) {
                    // Didn't work. Log error here
                    console.log("Something went wrong. Site options could not be retrieved.");
                    console.log(err);
                }
            });

            async function sendMail(payload) {

                const options = {
                    to: process.env.DEFAULT_TO,
                    from: process.env.DEFAULT_FROM,
                    subject: 'Message from WfHUniv Contact Form',
                    text: _template(payload),
                }

                try {
                    await strapi.plugins['email'].services.email.send(options)
                }
                catch(err) {
                    console.log("Something went wrong. Message could not be sent.");
                    console.log(err);
                }
            }

        return entity;
    },
};
