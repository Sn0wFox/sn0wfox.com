declare module "typed.js" {
  namespace Typed {
    interface Options {
      strings?: string[],
      typeSpeed?: number,
      startDelay?: number,
      backSpeed?: number,
      smartBackspace?: boolean,
      shuffle?: boolean,
      backDelay?: number,
      fadeOut?: boolean,
      fadeOutClass?: string,
      fadeOutDelay?: number,
      loop?: boolean,
      loopCount?: number,
      showCursor?: boolean,
      cursorChar?: string,
      autoInsertCss?: boolean,
      attr?: string,
      bindInputFocusEvents?: boolean,
      contentType?: string,
      onComplete?: (self?: Typed) => void,
      preStringTyped?: (pos?: number, self?: Typed) => void,
      onStringTyped?: (pos?: number, self?: Typed) => void,
      onLastStringBackspaced?: (self?: Typed) => void,
      onTypingPaused?: (pos?: number, self?: Typed) => void,
      onTypingResumed?: (pos?: number, self?: Typed) => void,
      onReset?: (self?: Typed) => void,
      onStop?: (pos?: number, self?: Typed) => void,
      onStart?: (pos?: number, self?: Typed) => void,
      onDestroy?: (self?: Typed) => void
    }
  }

  class Typed {
    constructor(elementId: string, options: Typed.Options);

    toggle(event: string): void;
    start(): void;
    stop(): void;
    destroy(): void;
    reset(restart?: boolean): void;
  }

  export = Typed;
}