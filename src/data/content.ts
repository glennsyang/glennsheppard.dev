import type { ImageMetadata } from "astro";

import conspacImg from "../assets/conspac.png";
import ecomDiscoverImg from "../assets/ecomdiscover.png";
import timeClockingImg from "../assets/screenshot_.png";
import profilePic from "../assets/profile_pic.jpg";

export interface HeadData {
  title: string;
  lang: string;
  description: string;
}

export interface HeroData {
  title: string;
  name: string;
  subtitle: string;
  cta: string;
}

export interface AboutData {
  img: ImageMetadata;
  imgAlt: string;
  paragraphOne: string;
  paragraphTwo: string;
  paragraphThree: string;
  resume: string;
}

export interface Project {
  id: string;
  img: ImageMetadata;
  title: string;
  info: string;
  info2?: string;
  url: string;
  repo?: string;
}

export interface ContactData {
  cta: string;
  btn: string;
  email: string;
}

export type SocialName = "twitter" | "linkedin" | "github";

export interface SocialLink {
  id: string;
  name: SocialName;
  url: string;
}

export const headData: HeadData = {
  title: "Glenn Sheppard | Developer",
  lang: "en",
  description: "Welcome to my developer portfolio website.",
};

export const heroData: HeroData = {
  title: "Hi, I'm",
  name: "Glenn!",
  subtitle: "Software & Web Developer.",
  cta: "Wanna Know More?",
};

export const aboutData: AboutData = {
  img: profilePic,
  imgAlt: "profile picture",
  paragraphOne:
    "I'm a passionate software developer, with years of experience specializing in C# and the .NET framework, developing several applications for Service Desk automation.",
  paragraphTwo:
    "I've worked in mobile app development as well! Using the Nativescript framework, I developed a cross-platform application in iOS and Android, thereby increasing my Javascript skills.",
  paragraphThree:
    "I also love web development! Which is why I built a few websites along the way. Lately, I've been really interested in React and GatsbyJS which are the basis for my latest project.",
  resume: "",
};

export const projectsData: Project[] = [
  {
    id: "conspac",
    img: conspacImg,
    title: "Conspac Enterprises Ltd.",
    info: "Company that specializes in food and nutritional food supplements for humans and ingredients for fish and animal feed, particularly krill.",
    info2: "Website designed and developed with Gatsby and Bootstrap 4.",
    url: "https://conspac.com/",
    repo: "https://github.com/glennsyang/conspac",
  },
  {
    id: "time-clocking",
    img: timeClockingImg,
    title: "Time-Clocking app",
    info: "Time-Clocking app for event staffing company based in the UK.",
    info2:
      "App developed using the Nativescript framework for cross-platform development in iOS and Android. Events and staff are populated from back-end API. Check-in, clock-in and clock-out staff and see their details. Submit report back to office with staff ratings, notes and client signature.",
    url: "https://eventstaffing.co.uk/",
    repo: "https://gitlab.com/flaireventstaffing/time-clocking-app",
  },
  {
    id: "ecomdiscover",
    img: ecomDiscoverImg,
    title: "EcomDiscover",
    info: "A collection of e-commerce resources. Primarily related to FBA, but also touching on many other aspects of e-commerce software and tools. Crowd-sourced searchable reviews from community.",
    info2:
      "Front-end developed in React with Gatsby and Tailwind CSS. Back-end is a Firebase Cloud Firestore. User authentication through Firebase Authentication. React Hook Form enables users to submit, rate and review e-commerce tools & services.",
    url: "https://ecomdiscover.com",
    repo: "https://github.com/glennsyang/ecomdiscover",
  },
];

export const contactData: ContactData = {
  cta: "Have a project you'd like to discuss?",
  btn: "Let's chat!",
  email: "glenn@glennsheppard.dev",
};

export const footerData: { networks: SocialLink[] } = {
  networks: [
    { id: "twitter", name: "twitter", url: "https://twitter.com/glennsheppard15" },
    {
      id: "linkedin",
      name: "linkedin",
      url: "https://www.linkedin.com/in/glenn-sheppard-a73a6787/",
    },
    { id: "github", name: "github", url: "https://github.com/glennsyang" },
  ],
};

export const githubButtonsEnabled = false;
