export interface Profile {
  _id: string;
  user: {
    _id: string;
    avatar: string;
    firstname: string;
    lastname: string;
  };
  handle: string;
  company?: string;
  status: string;
  website?: string;
  skills: string;
  location: string;
  bio?: string;
  githubusername?: string;
  experience?: [
    {
      title: string;
      employmenttype: string;
      company?: string;
      location?: string;
      current: Boolean;
      endlastposition: Boolean;
      startdate?: Date;
      enddate?: Date;
      updateheadline: Boolean;
      headline?: string;
      description?: string;
    }
  ];
  education?: [
    {
      school: string;
      degree?: string;
      fieldofstudy?: string;
      startyear: Date;
      endyear: Date;
      grade?: string;
      description?: string;
    }
  ];
  socials?: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  date: Date;
}
