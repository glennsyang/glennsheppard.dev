// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  observedTargets: Element[] = [];
  observe = vi.fn((target: Element) => {
    this.observedTargets.push(target);
  });
  unobserve = vi.fn((target: Element) => {
    this.observedTargets = this.observedTargets.filter((el) => el !== target);
  });
  disconnect = vi.fn();

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }

  trigger(target: Element, isIntersecting: boolean) {
    const entry = { target, isIntersecting } as IntersectionObserverEntry;
    this.callback([entry], this as unknown as IntersectionObserver);
  }
}

function setReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

function setReadyState(state: DocumentReadyState) {
  Object.defineProperty(document, "readyState", { value: state, configurable: true });
}

async function loadRevealScript() {
  await import("./reveal.ts");
}

beforeEach(() => {
  vi.resetModules();
  document.body.innerHTML = "";
  MockIntersectionObserver.instances = [];
  setReadyState("complete");
});

afterEach(() => {
  vi.restoreAllMocks();
  Reflect.deleteProperty(window, "IntersectionObserver");
});

describe("reveal script", () => {
  it("reveals all targets immediately when the user prefers reduced motion", async () => {
    setReducedMotion(true);
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
    document.body.innerHTML = `
      <div class="reveal" id="a"></div>
      <div class="reveal-left" id="b"></div>
    `;

    await loadRevealScript();

    expect(document.getElementById("a")).toHaveProperty("className", "reveal is-visible");
    expect(document.getElementById("b")).toHaveProperty("className", "reveal-left is-visible");
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it("reveals all targets immediately when IntersectionObserver is unsupported", async () => {
    setReducedMotion(false);
    Reflect.deleteProperty(window, "IntersectionObserver");
    document.body.innerHTML = `<div class="reveal-right" id="a"></div>`;

    await loadRevealScript();

    expect(document.getElementById("a")?.classList.contains("is-visible")).toBe(true);
  });

  it("observes reveal targets with the expected options and only reveals on intersection", async () => {
    setReducedMotion(false);
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
    document.body.innerHTML = `
      <div class="reveal" id="a"></div>
      <div class="reveal-right" id="b"></div>
      <div id="c"></div>
    `;

    await loadRevealScript();

    expect(MockIntersectionObserver.instances).toHaveLength(1);
    const observer = MockIntersectionObserver.instances[0];
    expect(observer.options).toEqual({ threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

    const a = document.getElementById("a")!;
    const b = document.getElementById("b")!;
    expect(observer.observedTargets).toEqual([a, b]);

    observer.trigger(a, true);

    expect(a.classList.contains("is-visible")).toBe(true);
    expect(observer.unobserve).toHaveBeenCalledWith(a);
    expect(b.classList.contains("is-visible")).toBe(false);
  });

  it("does not reveal targets on a non-intersecting entry", async () => {
    setReducedMotion(false);
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
    document.body.innerHTML = `<div class="reveal" id="a"></div>`;

    await loadRevealScript();

    const observer = MockIntersectionObserver.instances[0];
    const a = document.getElementById("a")!;
    observer.trigger(a, false);

    expect(a.classList.contains("is-visible")).toBe(false);
    expect(observer.unobserve).not.toHaveBeenCalled();
  });

  it("defers initialization until DOMContentLoaded when the document is still loading", async () => {
    setReducedMotion(true);
    setReadyState("loading");
    document.body.innerHTML = `<div class="reveal" id="a"></div>`;

    await loadRevealScript();

    expect(document.getElementById("a")?.classList.contains("is-visible")).toBe(false);

    document.dispatchEvent(new Event("DOMContentLoaded"));

    expect(document.getElementById("a")?.classList.contains("is-visible")).toBe(true);
  });
});
