import { ImmutableDataStore } from "../../node_modules/astro/dist/content/data-store.js";
// @ts-expect-error Astro's test-only runtime singleton is not part of its public types.
import { globalDataStore } from "../../node_modules/astro/dist/content/data-store.js";
import about from "./about/main.json";
import contact from "./contact/main.json";
import footer from "./footer/main.json";
import head from "./head/site.json";
import hero from "./hero/main.json";
import conspac from "./projects/conspac.json";
import ecomdiscover from "./projects/ecomdiscover.json";
import timeClocking from "./projects/time-clocking.json";

type ImageFormat = "jpg" | "png";

function imageMetadata(src: string, format: ImageFormat) {
  return { src, width: 1, height: 1, format };
}

function entry(id: string, data: Record<string, unknown>, filePath: string) {
  return { id, data, filePath };
}

/**
 * Vitest does not start Astro's Vite content layer, so seed its runtime store
 * with the JSON entries before exercising the public content API in tests.
 */
export async function installContentTestData() {
  const store = new Map([
    ["head", new Map([["site", entry("site", head, "src/content/head/site.json")]])],
    ["hero", new Map([["main", entry("main", hero, "src/content/hero/main.json")]])],
    [
      "about",
      new Map([
        [
          "main",
          entry(
            "main",
            {
              ...about,
              img: imageMetadata("/src/assets/profile_pic.jpg", "jpg"),
            },
            "src/content/about/main.json",
          ),
        ],
      ]),
    ],
    [
      "projects",
      new Map([
        [
          "conspac",
          entry(
            "conspac",
            { ...conspac, img: imageMetadata("/src/assets/conspac.png", "png") },
            "src/content/projects/conspac.json",
          ),
        ],
        [
          "time-clocking",
          entry(
            "time-clocking",
            {
              ...timeClocking,
              img: imageMetadata("/src/assets/screenshot_.png", "png"),
            },
            "src/content/projects/time-clocking.json",
          ),
        ],
        [
          "ecomdiscover",
          entry(
            "ecomdiscover",
            {
              ...ecomdiscover,
              img: imageMetadata("/src/assets/ecomdiscover.png", "png"),
            },
            "src/content/projects/ecomdiscover.json",
          ),
        ],
      ]),
    ],
    ["contact", new Map([["main", entry("main", contact, "src/content/contact/main.json")]])],
    ["footer", new Map([["main", entry("main", footer, "src/content/footer/main.json")]])],
  ]);

  globalDataStore.set(await ImmutableDataStore.fromMap(store));
}
