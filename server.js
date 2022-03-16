require('dotenv').config()
const express = require("express");
const methodOverride = require("method-override")
const app = express();
const articlesRouter = require("./routes/articles");
const connectDB = require('./db/connect');
const { urlencoded } = require('express');
const Article = require('./models/articles')


app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"));
app.use("/articles", articlesRouter);

app.get('/', async (req, res) => {
  const articles = await Article.find({}).sort('-createdAt')
  res.render("articles/index", { articles: articles });
});



const port = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(port, console.log(`App is listening on ${port}`));
}

start()
