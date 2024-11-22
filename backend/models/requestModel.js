const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    receivedRequests: {
      type: Array,
      default: [],
    },
    sendRequests: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Requests", requestSchema);
