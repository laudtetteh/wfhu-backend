module.exports = {
  definition: /* GraphQL */ `
    extend type Review {
      note: Float
      noteDetails: [ReviewNote!]!
    }

    type ReviewNote {
      note: Int
      count: Int
    }
  `,
};
