const mongoose = require("mongoose");
const { marked } = require("marked");
const createDOMpurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDOMpurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  sanitizedHTML: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

articleSchema.pre("validate", function (next) {
  if (this.markdown) {
    this.sanitizedHTML = dompurify.sanitize(marked(this.markdown));
  }
  next()
});

module.exports = mongoose.model("Article", articleSchema);
