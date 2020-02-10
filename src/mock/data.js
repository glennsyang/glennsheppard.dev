import uuidv1 from 'uuid/v1';

// HEAD DATA
export const headData = {
  title: 'Glenn Sheppard | Developer', // e.g: 'Name | Developer'
  lang: 'en', // e.g: en, es, fr, jp
  description: 'Welcome to my developer portfolio website.', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: 'Hi, my name is',
  name: 'Glenn!',
  subtitle: "I'm a Software & Web Developer.",
  cta: 'Wanna Know More?',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile_pic.jpg',
  paragraphOne:
    "I'm a passionate software developer, with years of experience specializing in C# and the .NET framework, developing several applications for Service Desk automation.",
  paragraphTwo:
    "I've worked in mobile app development as well! Using the Nativescript framework, I developed a cross-platform application in iOS and Android, thereby increasing my Javascript skills.",
  paragraphThree:
    "I also love web development! Which is why I built a few websites along the way. Lately, I've been really interested in React and GatsbyJS which are the basis for my latest project.",
  resume: '', // if no resume, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: uuidv1(),
    img: 'conspac.png',
    title: 'Conspac Enterprises Ltd.',
    info:
      'Company that specializes in food and nutritional food supplements for humans and ingredients for fish and animal feed, particularly krill.',
    info2: 'Website designed and developed with Gatsby and Bootstrap 4.',
    url: 'https://conspac.com/',
    repo: 'https://gitlab.com/gsheppard.yang/conspac', // if no repo, the button will not show up
  },
  {
    id: uuidv1(),
    img: 'screenshot_.png',
    title: 'Time-Clocking app',
    info: 'Time-Clocking app for event staffing company based in the UK.',
    info2:
      'App developed using the Nativescript framework for cross-platform development in iOS and Android. Events and staff are populated from back-end API. Check-in, clock-in and clock-out staff and see their details. Submit report back to office with staff ratings, notes and client signature.',
    url: 'https://eventstaffing.co.uk/',
    repo: 'https://gitlab.com/flaireventstaffing/time-clocking-app', // if no repo, the button will not show up
  },
  {
    id: uuidv1(),
    img: 'job-search.png',
    title: 'Entry Level Software Jobs',
    info: 'Listing of entry level software jobs from Github Jobs and Remote OK.',
    info2:
      'Front-end developed in React. Back-end API uses Express. Pulls from Github Jobs and RemoteOK public APIs. Clicking on the job listing opens modal window where you can apply directly to the job. Ability to filter the job listings by Location.',
    url: 'https://glennsheppard.dev',
    repo: 'https://gitlab.com/gsheppard.yang/job-search-app', // if no repo, the button will not show up
  },
];

// CONTACT DATA
export const contactData = {
  cta: "Have a project you'd like to discuss?",
  btn: "Let's chat!",
  email: 'glenn@glennsheppard.dev',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: uuidv1(),
      name: 'twitter',
      url: 'https://twitter.com/glennsheppard15',
    },
    {
      id: uuidv1(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/glenn-sheppard-a73a6787/',
    },
    {
      id: uuidv1(),
      name: 'gitlab',
      url: 'https://gitlab.com/gsheppard.yang',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: false, // set to false to disable the GitHub stars/fork buttons
};
