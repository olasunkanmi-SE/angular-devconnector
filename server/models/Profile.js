const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('@hapi/joi');


const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    skills: {
        type: [String],
        required: true,
        trim: true
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            employmenttype: {
                type: String,
                enum: ['Full-time', 'Part-time', 'Self-employed', 'Freelance', 'Contract', 'internship', 'Apprenticeship']
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            },
            startdate: {
                type: Date,
                required: true
            },
            enddate: {
                type: Date
            },
            updateheadline: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,

            }

        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },

            degree: {
                type: String,
            },
            fieldofstudy: {
                type: String
            },
            startdate: {
                type: Date,
                required: true
            },
            enddate: {
                type: Date,
            },
            grade: {
                type: String,
            },

            description: {
                type: String,
            }

        }
    ],
    socials: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }

    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('Profile', profileSchema);



exports.Profile = Profile;
