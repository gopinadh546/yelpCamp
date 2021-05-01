const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');
const Review = require('../models/review')
const Campground = require('../models/campground');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.craeteReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))



module.exports = router;