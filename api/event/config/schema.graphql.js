module.exports = {
  definition: /* GraphQL */ `
    extend type Event {
      note: Float
      noteDetails: [EventNote!]!
    }

    type EventNote {
      note: Int
      count: Int
    }
  `,
};
