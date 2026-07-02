import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import Reveal from "./Reveal.astro";

describe("Reveal.astro", () => {
  it("defaults to the base reveal class with no delay style", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Reveal, {
      slots: { default: "Hello" },
    });

    expect(result).toContain('class="reveal"');
    expect(result).not.toContain("style=");
    expect(result).toContain("Hello");
  });

  it('adds the reveal-left class for direction="left"', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Reveal, {
      props: { direction: "left" },
      slots: { default: "Left content" },
    });

    expect(result).toContain('class="reveal reveal-left"');
  });

  it('adds the reveal-right class for direction="right"', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Reveal, {
      props: { direction: "right" },
      slots: { default: "Right content" },
    });

    expect(result).toContain('class="reveal reveal-right"');
  });

  it("renders a --reveal-delay custom property when delay is set", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Reveal, {
      props: { delay: 500 },
      slots: { default: "Delayed" },
    });

    expect(result).toContain("--reveal-delay: 500ms;");
  });

  it("omits the style attribute when delay is 0", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Reveal, {
      props: { delay: 0 },
      slots: { default: "No delay" },
    });

    expect(result).not.toContain("style=");
  });

  it("merges a custom class prop alongside the base reveal class", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Reveal, {
      props: { class: "extra-class" },
      slots: { default: "x" },
    });

    expect(result).toContain('class="reveal extra-class"');
  });
});
