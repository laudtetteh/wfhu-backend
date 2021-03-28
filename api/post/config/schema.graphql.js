module.exports = {
  definition: /* GraphQL */ `
    extend type Post {
      note: Float
      noteDetails: [PostNote!]!
    }

    type PostNote {
      note: Int
      count: Int
    }
  `,
};


module.exports = {};
