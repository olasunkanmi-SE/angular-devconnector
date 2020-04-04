const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Profile } = require('../../models/Profile');
const err = require('../../../server/error');
const validateProfile = require('../../validation/profile');
const validateExperience = require('../../validation/experience');


//Get Current Profile

router.get('/current/user', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        const profile = (await Profile.findOne({ user: req.user._id }));
        await profile.populate('user', ['name', 'avatar']).execPopulate();
        if (!profile) return res.status(404).json(err.profileError.noUserProfile);
        return res.status(201).json(profile);
    } catch (error) {
        return res.status(404).json(error);

    }

});

//Create and Update Profile

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { errors, isValid } = validateProfile(req.body);
        if (!isValid) return res.status(400).json(errors);

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
        if (req.body.youtube) profileFields.socials.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.socials.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.socials.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.socials.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.socials.instagram = req.body.instagram;

        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findByIdAndUpdate(
                { _id: profile._id },
                { $set: profileFields },
                { new: true }
            )
            return res.json(profile);
        } else {
            let profile = await Profile.findOne({ handle: profileFields.handle });
            if (profile) return res.status(400).json(err.profileError.handleExists);
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);

        }

    } catch (error) {
        return res.status(400).json(error)

    }

})

//Get Profile by Handle

router.get('/handle/:handle', async (req, res) => {
    try {
        let profile = await Profile.findOne({ handle: req.params.handle });
        await profile.populate('user', ['name', 'avatar']).execPopulate();
        if (!profile) return res.status.json(err.profileError.noProfile);
        res.json(profile);
    } catch (error) {
        return res.status(400).json(error)

    }

})

//Get Profile by Id

router.get('/:id', async (req, res) => {
    try {
        let profile = await Profile.findById({ _id: req.params.id });
        await profile.populate('user', ['name', 'avatar']).execPopulate();
        if (!profile) return res.status.json(err.profileError.noProfile);
        res.json(profile);
    } catch (error) {
        return res.status(400).json(error)

    }
})

//Get all profiles


router.get('/', (req, res) => {
    Profile.find().populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) return res.status(404).json(err.profileError.noProfiles)
            res.status(201).json(profiles);
        })

})

router.post('/experience', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { errors, isValid } = validateExperience(req.body);
        if (!isValid) return res.status(400).json(errors);

        let profile = await Profile.findOne({ user: req.user.id });
        const userExperience = {
            title: req.body.title,
            employmenttype: req.body.employmenttype,
            company: req.body.company,
            location: req.body.location,
            current: req.body.current,
            endlastposition: req.body.endlastposition,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            updateheadline: req.body.updateheadline,
            headline: req.body.headline,
            description: req.body.description
        }
        //Unshift like push is used to add data to an array but to the beginning of the array
        profile.experience.unshift(userExperience);
        await profile.save();
        return res.status(201).json(profile);
    } catch (err) {
        return res.status(400).json(err)

    }

})

router.post('/education', passport.authenticate('jwt', { session: false }), async (req, res) => {

})

module.exports = router;