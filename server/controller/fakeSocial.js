// Create and Read 
    // Posts, Page, User, Profile

const User = require('../model/users');
const Post = require('../model/posts');
const Profile = require('../model/profile');
const Page = require('../model/pages');

const userCreateController = async (req, res) => {
    /* 
        First off to create Relationship Data, we need atleast an instance of one of the models to work fine.
        Creating an instance of a user, means a user id, empty posts(since we haven't related any), no
        page being followed , and no page and profile of our own.
    */
    try{
        const userData = req.body;
        let user = User(userData)
        user.createdAt = Date.now();
        user = await user.save();
        res.json({
            message:'SuccessFully Created',
            user : user
        })
    }
    catch(err){
        console.log(err);
        res.json(err.message);
    }
}

const usersController = async (req, res) => {
    /*
        This simply helps to fetch all the users in the DB
    */
    try{
        const user = await User.find({});
        res.json({
            user : user
        })
    }
    catch(err){
        console.log(err);
        res.json(err.message);
    }
}


const userSingleController = async (req, res) => {
    /*
        Gets a single user based on an id, and this controller doesnt matter if we havent related other models,
        or not. And observed, we are using the populate method which shows in details other related Data from 
        other models, we populate with 'posts' coz this is the field name in the User Model
    */
    try{
        const id = req.params.id
        const user = await User.findById(id).populate('posts profile')
        return res.json(user)
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message);
    }
}

const postCreateController = async (req, res) => {
    /*
        Creating a Post, and remember we already had created a user, now imagine facebook.
        To create a Post in Facebook we have to be logged in because they will want to use your user id,
        to reference a Post id, and having successfuly created a Post , offcourse creating an Instance,
        of it will give us an id hence we update the User Model, which is still related to this Post model.
        Having a route of 'api/..../id' where id will be user id
    */
    try{
        const id = req.params.id;
        const { title, content } = req.body;
        let date = Date.now()
        const post = Post({
            title,
            content,
            date,
            user:id
        })
        const postSaved = await post.save()

        // Update my user model profile with this saved post.
        await User.findByIdAndUpdate(id, { $push: { posts: postSaved }})
        return res.json(
            {
                message:'succesfull',
                postData: postSaved
            }
        )
    }
    catch(err){
        console.log(err.message)
    }
}


const postsController = async (req, res) => {
    // Getting all the user but attaching the posts as well to it.
    try{
        const id = req.params.id;
        const posts = await User.findById(id).populate('posts');
        res.json(
            {
                message:'successful',
                data:posts
            }
        )
    }
    catch(err) {
        console.log(err.message)
    }
}


const profileCreateController = async (req, res) => {
    /* same thing with this controller having a one to one relationship, we create the profile first,
    fill the schema where neccessary and update our other model associated with this, which will be
    user model offcourse.
    */
    try{
        const userId = req.params.id;
        const { bio } = req.body;
        const profileData = Profile({
            bio,
            createdAt: Date.now(),
            user:userId
        })
        const savedProfile = await profileData.save();
    
        // Update User
        await User.findByIdAndUpdate(userId, { $set: { profile: savedProfile }})
    
        return res.json({
            message: 'profile saved successfully',
            data: savedProfile
        })
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message);
    }
}

const pageFollowController = async (req, res) => {
    /* 
    we do the same thing, but here we will be updating 2 lists, coz its a many to many.
    And also i used the route as 
    'api/...../userId/PageId' or 'api/.../PageId/UserId' (it doesnt matter the arrangement).
    Since we are not creating it, but following this means we already have the instances of the Models which have 
    their respective ids, hence we just filter them out and do what we want.
    */
    try{
        const userFollowingId = req.params.userId;
        const pageId = req.params.pageId;
        const { pageOwner, nameOfPage } = await Page.findById(pageId);

        if(pageOwner != userFollowingId ){
            const page = await Page.findByIdAndUpdate(pageId, {
                $push:{
                    users: userFollowingId
                },
                $inc:{
                    followers: 1
                    /* Note:: This is not a good way to do it, coz if a user have  failed network or some issue
                    it will have to increment the number of followers , hence making it a bad bug.
                    The best way will be to count the number of users following from the array, but na stress.
                    */
                }
            })

            const user = await User.findByIdAndUpdate(userFollowingId, {
                $push:{
                    pagesFollowed: pageId
                }
            })
            return res.json({
                message: `Now following ${nameOfPage}`,
                pageResponse: page
            })
        }else{
            return res.json({messaage: 'can not follow this page coz you created it'})
        }

    }
    catch(err) {
        console.log(err.message);
        res.json(err.message);
    }
}

const pageCreateController = async (req, res) => {
    try{
        // We are using the same post on our timeline, if we want different post, we can create new Model for it
        const ownerId = req.params.id;
        const { nameOfPage } = req.body;
        const page = Page({
            nameOfPage,
            dateCreated: Date.now(),
            pageOwner:ownerId
        })
        const pageData = await page.save();
        res.json({
            message:'successful',
            data: pageData
        })
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message);
    }
}


const pageGetSingleController = async (req, res) => {
    try{
        const pageId = req.params.id;
        const page = await Page.findById(pageId)
        res.json(
            {data: page}
        )
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message);
    }
}

module.exports = {
    userSingleController,

    userCreateController,
    usersController,

    postCreateController,
    postsController,

    profileCreateController,

    pageFollowController,
    pageCreateController,
    pageGetSingleController
}