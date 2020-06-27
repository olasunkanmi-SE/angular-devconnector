const { Profile } = require('../models/Profile');
const { User } = require('../models/User');
const err = require('../../server/error');
const validateProfile = require('../validation/profile');
const validateExperience = require('../validation/experience');
const validateEducation = require('../validation/education');

//Get Current Profile

module.exports.getCurrentUserProfile = async (req, res, next) => {

    try {
        const profile = (await Profile.findOne({ user: req.user._id }));
        if (profile) {
            await profile.populate('user', ['firstname', 'lastname', 'avatar']).execPopulate();
            return res.status(200).json(profile);
        } else {
            return res.status(404).json(err.profileError.noUserProfile);
        }

    } catch (ex) {
        console.log(ex.message)
        next(ex);
    }
};


//Create and Update Profile

module.exports.createOrUpdateUser = async (req, res, next) => {
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
            return res.status(201).json(profile);
        } else {
            let profile = await Profile.findOne({ handle: profileFields.handle });
            if (profile) return res.status(400).json(err.profileError.handleExists);
            profile = new Profile(profileFields);
            await profile.save();
            res.status(201).json(profile);

        }

    } catch (ex) {
        next(ex);
    }

}

//Get Profile by Handle

module.exports.getProfileByHandle = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ handle: req.params.handle });
        await profile.populate('user', ['firstname', 'lastname', 'avatar']).execPopulate();
        if (!profile) return res.status.json(err.profileError.noProfile);
        res.status(200).json(profile);
    } catch (ex) {
        next(ex);
    }

}

//Get Profile by Id
module.exports.getProfileById = async (req, res, next) => {
    try {
        let profile = await Profile.findById({ _id: req.params.id });
        if (profile) {
            await profile.populate('user', ['firstname', 'lastname', 'handle', 'avatar']).execPopulate();
            if (!profile) return res.status.json(err.profileError.noProfile);
            res.status(200).json(profile);
        } else {
            return res.status(404).json('no profile found');
        }

    } catch (ex) {
        next(ex);
    }
}

//Get all profiles

module.exports.getProfiles = (req, res, next) => {
    try {
        Profile.find().populate('user', ['firstname', 'lastname', 'avatar'])
            .then(profiles => {
                if (!profiles) return res.status(404).json(err.profileError.noProfiles)
                res.status(200).json(profiles);
            })

    } catch (ex) {
        next(ex);
    }
}

//Create a new professional experience

module.exports.createUserExperience = async (req, res, next) => {
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
        await profile.unshift({ message: 'profile created successfully' }).save();
        return res.status(201).json(profile);

    } catch (ex) {
        next(ex);
    }

}

//Create new Education
module.exports.createUserEducation = async (req, res, next) => {
    try {
        const { errors, isValid } = validateEducation(req.body);
        if (!isValid) return res.status(400).json(errors);

        const userEducation = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            startyear: req.body.startyear,
            endyear: req.body.endyear,
            grade: req.body.grade,
            description: req.body.description

        }

        let profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(userEducation);
        await profile.save();
        return res.status(201).json(profile);

    } catch (ex) {
        next(ex);
    }
}

//Delete an experience by ID

module.exports.deleteUserExperienceById = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        const removeProfile = profile.experience.map((items) => items.id).indexOf(req.params.id);
        console.log(removeProfile)
        profile.experience.splice(removeProfile, 1);
        profile.save();
        return res.status(200).json(profile.push());

    } catch (ex) {
        next(ex);
    }
}

// Delete an Education by ID

module.exports.deleteUserEducationById = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        const removeEducation = profile.education.map(items => items.id).indexOf(req.params.id);
        profile.education.splice(removeEducation, 1)
        return res.status(200).json(profile);

    } catch (ex) {
        next(ex);
    }
}

//Delete a user and profile
module.exports.deleteUserAndProfile = async (req, res, next) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        return res.status(200).json({ success: true });

    } catch (ex) {
        next(ex);
    }
}