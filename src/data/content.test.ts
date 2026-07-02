import { describe, expect, it } from "vitest";

import {
  aboutData,
  contactData,
  footerData,
  githubButtonsEnabled,
  headData,
  heroData,
  projectsData,
} from "./content";

const httpUrl = /^https?:\/\//;

describe("headData", () => {
  it("has non-empty title, lang and description", () => {
    expect(headData.title.trim()).not.toBe("");
    expect(headData.lang.trim()).not.toBe("");
    expect(headData.description.trim()).not.toBe("");
  });
});

describe("heroData", () => {
  it("has non-empty copy for every field", () => {
    expect(heroData.title.trim()).not.toBe("");
    expect(heroData.name.trim()).not.toBe("");
    expect(heroData.subtitle.trim()).not.toBe("");
    expect(heroData.cta.trim()).not.toBe("");
  });
});

describe("aboutData", () => {
  it("has non-empty paragraphs and alt text", () => {
    expect(aboutData.paragraphOne.trim()).not.toBe("");
    expect(aboutData.paragraphTwo.trim()).not.toBe("");
    expect(aboutData.paragraphThree.trim()).not.toBe("");
    expect(aboutData.imgAlt.trim()).not.toBe("");
  });

  it("resolves the profile image asset", () => {
    expect(aboutData.img).toBeDefined();
    expect(typeof aboutData.img.src).toBe("string");
    expect(aboutData.img.src.length).toBeGreaterThan(0);
  });
});

describe("projectsData", () => {
  it("is a non-empty list", () => {
    expect(projectsData.length).toBeGreaterThan(0);
  });

  it("has unique, non-empty ids", () => {
    const ids = projectsData.map((project) => project.id);
    expect(ids.every((id) => id.trim() !== "")).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has a resolved image, title, info and a valid live url for every project", () => {
    for (const project of projectsData) {
      expect(project.img).toBeDefined();
      expect(typeof project.img.src).toBe("string");
      expect(project.title.trim()).not.toBe("");
      expect(project.info.trim()).not.toBe("");
      expect(project.url).toMatch(httpUrl);
    }
  });

  it("has a valid repo url whenever repo is set", () => {
    for (const project of projectsData) {
      if (project.repo !== undefined) {
        expect(project.repo).toMatch(httpUrl);
      }
    }
  });
});

describe("contactData", () => {
  it("has non-empty call-to-action copy", () => {
    expect(contactData.cta.trim()).not.toBe("");
    expect(contactData.btn.trim()).not.toBe("");
  });

  it("has a valid contact email on the site domain", () => {
    expect(contactData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(contactData.email).toMatch(/@glennsheppard\.dev$/);
  });
});

describe("footerData", () => {
  it("has a non-empty list of social networks", () => {
    expect(footerData.networks.length).toBeGreaterThan(0);
  });

  it("has matching id/name pairs and valid https urls", () => {
    for (const network of footerData.networks) {
      expect(network.id).toBe(network.name);
      expect(network.url).toMatch(/^https:\/\//);
    }
  });

  it("has unique network ids", () => {
    const ids = footerData.networks.map((network) => network.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("githubButtonsEnabled", () => {
  it("is a boolean flag", () => {
    expect(typeof githubButtonsEnabled).toBe("boolean");
  });
});
