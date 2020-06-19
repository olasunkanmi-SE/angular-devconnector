const mongoose = require('mongoose');
const { Schema } = mongoose;



const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    handle: {
        type: String,
        required: true,
        min: 2,
        max: 40
    },
    company: {
        type: String,
        min: 2,
        max: 40
    },
    status: {
        type: String,
        required: true,
        enum: ['employed', 'actively looking', 'not looking']
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
        type: String,
        required: true
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
                required: true,
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
                default: true
            },
            endlastposition: {
                type: Boolean,
                default: false
            },
            startdate: {
                type: Date,
                default: Date.now,
                // required: true
            },
            enddate: {
                type: Date
            },
            updateheadline: {
                type: Boolean,
                default: true
            },
            headline: {
                type: String,
                required: true
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
            startyear: {
                type: Date,
                // required: true
                default: Date.now
            },
            endyear: {
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
