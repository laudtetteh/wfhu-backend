module.exports = {
  definition: /* GraphQL */ `
    extend type Page {
      note: Float
      noteDetails: [PageNote!]!
    }

    type PageNote {
      note: Int
      count: Int
    }
  `,
};
