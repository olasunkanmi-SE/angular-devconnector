
const passport = require('passport');
const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profile');
const auth = require('../../middleware/auth');




//Get Current Profile

router.get('/current/user', auth, profileController.getCurrentUser);

//Create and Update Profile

router.post('/', auth, profileController.createOrUpdateUser);

//Get Profile by Handle

router.get('/handle/:handle', profileController.getProfileByHandle);

//Get Profile by Id

router.get('/:id', profileController.getProfileById);

//Get all profiles

router.get('/', profileController.getProfiles);

//Create a new professional experience

router.post('/experience', auth, profileController.createUserExperience);

//Create new Education

router.post('/education', auth, profileController.createUserEducation);

//Delete an experience by ID

router.delete('/experience/:id', auth, profileController.deleteUserExperienceById);

// Delete an Education by ID

router.delete('/education/:id', auth, profileController.deleteUserEducationById)

//Delete a user and profile

router.delete('/', auth, profileController.deleteUserAndProfile)


// router.put('/education', auth, async (req, res) => {
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