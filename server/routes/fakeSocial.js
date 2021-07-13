
const express = require('express');
const router = express.Router();

const {
    userSingleController,
    userCreateController,
    usersController,
    postCreateController,
    postsController,
    profileCreateController,
    pageFollowController,
    pageCreateController,
    pageGetSingleController
} = require('../controller/fakeSocial');

// Create and Read
    // Users, Posts, Page, Profile.


// router.get('users', userCreateController());
router.get('/users/:id', userSingleController)


router.post('/users', userCreateController)
router.get('/users', usersController)


router.post('/users/post/:id', postCreateController)
router.get('/users/post/:id', postsController)

router.post('/user/profile/:id', profileCreateController)

router.post('/user/page/follow/:pageId/:userId', pageFollowController)
router.post('/user/page/create/:id', pageCreateController)
router.get('/page/:id', pageGetSingleController)

module.exports = router;