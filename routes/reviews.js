const express = require('express');
const router = express.Router({mergeParams: true});
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware')
const reviews = require('../controllers/reviews')
const catchAsync = require('../Utils/catchAsync');




router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.destroyReview));

module.exports = router;