import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const nonEmptyString = z.string().trim().min(1);
const httpUrl = z
  .url()
  .refine((value) => /^https?:\/\//.test(value), {
    message: "Expected an HTTP(S) URL",
  });

const head = defineCollection({
  loader: glob({ base: "./src/content/head", pattern: "**/*.json" }),
  schema: z.object({
    title: nonEmptyString,
    lang: nonEmptyString,
    description: nonEmptyString,
  }),
});

const hero = defineCollection({
  loader: glob({ base: "./src/content/hero", pattern: "**/*.json" }),
  schema: z.object({
    title: nonEmptyString,
    name: nonEmptyString,
    subtitle: nonEmptyString,
    cta: nonEmptyString,
  }),
});

const about = defineCollection({
  loader: glob({ base: "./src/content/about", pattern: "**/*.json" }),
  schema: ({ image }) =>
    z.object({
      img: image(),
      imgAlt: nonEmptyString,
      paragraphOne: nonEmptyString,
      paragraphTwo: nonEmptyString,
      paragraphThree: nonEmptyString,
      resume: z.union([z.literal(""), httpUrl]),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.json" }),
  schema: ({ image }) =>
    z.object({
      order: z.number().int().positive(),
      img: image(),
      title: nonEmptyString,
      info: nonEmptyString,
      info2: nonEmptyString.optional(),
      url: httpUrl,
      repo: httpUrl.optional(),
    }),
});

const contact = defineCollection({
  loader: glob({ base: "./src/content/contact", pattern: "**/*.json" }),
  schema: z.object({
    cta: nonEmptyString,
    btn: nonEmptyString,
    email: z.email().endsWith("@glennsheppard.dev"),
  }),
});

const footer = defineCollection({
  loader: glob({ base: "./src/content/footer", pattern: "**/*.json" }),
  schema: z.object({
    networks: z.array(
      z.object({
        id: nonEmptyString,
        name: z.enum(["twitter", "linkedin", "github"]),
        url: httpUrl,
      }),
    ),
    githubButtonsEnabled: z.boolean(),
  }),
});

export const collections = { head, hero, about, projects, contact, footer };
