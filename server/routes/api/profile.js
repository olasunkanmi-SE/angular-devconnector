const passport = require('passport');
const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profile');



//Get Current Profile

router.get('/current/user', passport.authenticate('jwt', { session: false }), profileController.getCurrentUser);

//Create and Update Profile

router.post('/', passport.authenticate('jwt', { session: false }), profileController.createOrUpdateUser);

//Get Profile by Handle

router.get('/handle/:handle', profileController.getProfileByHandle);

//Get Profile by Id

router.get('/:id', profileController.getProfileById);

//Get all profiles

router.get('/', profileController.getProfiles);

//Create a new professional experience

router.post('/experience', passport.authenticate('jwt', { session: false }), profileController.createUserExperience);

//Create new Education

router.post('/education', passport.authenticate('jwt', { session: false }), profileController.createUserEducation);

//Delete an experience by ID

router.delete('/experience/:id', passport.authenticate('jwt', { session: false }), profileController.deleteUserExperienceById);

// Delete an Education by ID

router.delete('/education/:id', passport.authenticate('jwt', { session: false }), profileController.deleteUserEducationById)

//Delete a user and profile

router.delete('/', passport.authenticate('jwt', { session: false }), profileController.deleteUserAndProfile)


// router.put('/education', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     try {
//         let profile = await Profile.findOne({ user: req.user.id });
//         if (profile) {
//             const userEducation = {
//                 school: req.body.school,
//                 degree: req.body.degree,
//                 fieldofstudy: req.body.fieldofstudy,
//                 startyear: req.body.startyear,
//                 endyear: req.body.endyear,
//                 grade: req.body.grade,
//                 description: req.body.description

//             }
//             profile = await Profile.findByIdAndUpdate(
//                 { _id: profile._id, education: { $elemMatch: { _id: req.params } } },
//                 { $push: { education: userEducation } },
//                 { new: true }
//             );
//             return res.status(201).send(profile);
//         }

//     } catch (error) {
//         console.log(error);

//     }
// })

module.exports = router;