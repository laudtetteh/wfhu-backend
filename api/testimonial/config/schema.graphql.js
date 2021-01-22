module.exports = {
  definition: /* GraphQL */ `
    extend type Testimonial {
      note: Float
      noteDetails: [TestimonialNote!]!
    }

    type TestimonialNote {
      note: Int
      count: Int
    }
  `,
};
