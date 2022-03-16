const express = require('express')
const router = express.Router()
const {
    getNewPost,
    postNewPost,
    getSingleArticle,
    editArticle,
    getEditArticle,
    deleteArticle
} = require('../controllers/articles')



router.route('/new').get(getNewPost).post(postNewPost)
router.route('/:id').get(getSingleArticle).patch()
router.route("/edit/:id").get(getEditArticle).put(editArticle).delete(deleteArticle);


module.exports = router