const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { Profile } = require('../../models/Profile');
const { User } = require('../../models/User');
const error = require('../../../server/error');


router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (!profile) return res.status(404).json(error.profileError.noprofile);
        res.send(profile);
    } catch (error) {
        console.log(error);

    }

});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
        // Skills Comma seperated values
        if (typeof req.body.skills !== undefined) {
            profileFields.skills = req.body.skills.split(',');
        }
        // Socials
        profileFields.socials = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            await Profile.findByIdAndUpdate(
                { _id: profile._id },
                { $set: profileFields },
                { new: true }
            )
            return res.json(profile);
        } else {
            let profile = await Profile.findOne({ handle: profileFields.handle });
            if (profile) return res.status(400).json(error.profileError.handleExists);
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);

        }

    } catch (error) {
        console.log(error);

    }

})

module.exports = router;