import { getCollection, getEntry } from "astro:content";
import { beforeAll, describe, expect, it } from "vitest";
import { installContentTestData } from "./test-data-store";

const httpUrl = /^https?:\/\//;

beforeAll(installContentTestData);

describe("singleton content entries", () => {
  it("loads every singleton entry with non-empty displayed fields", async () => {
    const [head, hero, about, contact, footer] = await Promise.all([
      getEntry("head", "site"),
      getEntry("hero", "main"),
      getEntry("about", "main"),
      getEntry("contact", "main"),
      getEntry("footer", "main"),
    ]);

    expect(head).toBeDefined();
    expect(hero).toBeDefined();
    expect(about).toBeDefined();
    expect(contact).toBeDefined();
    expect(footer).toBeDefined();

    if (!head || !hero || !about || !contact || !footer) {
      throw new Error("A required singleton content entry is missing");
    }

    for (const value of [head.data.title, head.data.lang, head.data.description]) {
      expect(value.trim()).not.toBe("");
    }

    for (const value of [
      hero.data.title,
      hero.data.name,
      hero.data.subtitle,
      hero.data.cta,
    ]) {
      expect(value.trim()).not.toBe("");
    }

    for (const value of [
      about.data.imgAlt,
      about.data.paragraphOne,
      about.data.paragraphTwo,
      about.data.paragraphThree,
      contact.data.cta,
      contact.data.btn,
    ]) {
      expect(value.trim()).not.toBe("");
    }

    expect(contact.data.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(contact.data.email).toMatch(/@glennsheppard\.dev$/);
  });

  it("resolves the profile image asset", async () => {
    const about = await getEntry("about", "main");

    expect(about).toBeDefined();
    if (!about) {
      throw new Error("Missing about content entry");
    }

    expect(typeof about.data.img.src).toBe("string");
    expect(about.data.img.src.length).toBeGreaterThan(0);
  });
});

describe("projects collection", () => {
  it("is non-empty and has unique, sequential display order", async () => {
    const projects = await getCollection("projects");
    const orders = projects.map((project) => project.data.order);

    expect(projects.length).toBeGreaterThan(0);
    expect(new Set(projects.map((project) => project.id)).size).toBe(
      projects.length,
    );
    expect(new Set(orders).size).toBe(orders.length);
  });

  it("has valid image metadata, copy, and HTTP(S) links", async () => {
    const projects = await getCollection("projects");

    for (const project of projects) {
      expect(typeof project.data.img.src).toBe("string");
      expect(project.data.img.src.length).toBeGreaterThan(0);
      expect(project.data.title.trim()).not.toBe("");
      expect(project.data.info.trim()).not.toBe("");
      expect(project.data.url).toMatch(httpUrl);

      if (project.data.info2 !== undefined) {
        expect(project.data.info2.trim()).not.toBe("");
      }

      if (project.data.repo !== undefined) {
        expect(project.data.repo).toMatch(httpUrl);
      }
    }
  });
});

describe("footer content", () => {
  it("has unique social IDs and names with valid URLs", async () => {
    const footer = await getEntry("footer", "main");

    expect(footer).toBeDefined();
    if (!footer) {
      throw new Error("Missing footer content entry");
    }

    const { networks } = footer.data;
    expect(networks.length).toBeGreaterThan(0);
    expect(new Set(networks.map((network) => network.id)).size).toBe(
      networks.length,
    );
    expect(new Set(networks.map((network) => network.name)).size).toBe(
      networks.length,
    );

    for (const network of networks) {
      expect(network.id).toBe(network.name);
      expect(network.url).toMatch(/^https:\/\//);
    }
  });

  it("keeps the GitHub buttons setting as a boolean", async () => {
    const footer = await getEntry("footer", "main");

    expect(footer).toBeDefined();
    if (!footer) {
      throw new Error("Missing footer content entry");
    }

    expect(typeof footer.data.githubButtonsEnabled).toBe("boolean");
  });
});
