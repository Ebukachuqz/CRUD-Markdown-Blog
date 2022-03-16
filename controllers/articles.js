const Article = require("../models/articles");
const mongoose = require("mongoose");

const getNewPost = (req, res) => {
  const article = {}
  res.render("articles/new", {article:article});
};

const postNewPost = async (req, res) => {
  const article = await Article.create(req.body);
  res.redirect("/");
};

const getSingleArticle = async (req, res) => {
  // check for cast error
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send(`There is no Article with the id ${req.params.id}`);
  }
  // check db for article
  const article = await Article.findById(req.params.id);
    
  if (!article) {
    return res.status(404).send(`There is no Article with the id ${req.params.id}`)
  }
  res.render("articles/article", { article: article });
};

const deleteArticle = async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
}


const editArticle = async (req, res) => {
  const {title:title, description: description, markdown: markdown} = req.body
  let article = await Article.findById(req.params.id,);
  article.title = title
  article.description = description
  article.markdown = markdown
  article = await article.save()
  res.redirect("/");
}

const getEditArticle = async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render("articles/edit", {article:article})
}

module.exports = {
  getNewPost,
  postNewPost,
  getSingleArticle,
  editArticle,
  getEditArticle,
  deleteArticle,
};
