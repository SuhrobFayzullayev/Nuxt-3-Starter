import type { Directive } from "vue";
import masker from "./masker";
import tokens from "./tokens";

interface Config {
  mask: string;
  tokens: typeof tokens;
}

const event = (name: string) => {
  return new Event(name, { bubbles: true, cancelable: true });
};

const getElementAndConfig = (
  el: HTMLElement,
  value: string | false
): { element: HTMLInputElement; config: Config } => {
  const config = { mask: "", tokens };
  if (typeof value === "string") {
    config.mask = value;
  }

  if (el.tagName.toLocaleLowerCase() !== "input") {
    const inputs = el.getElementsByTagName("input");
    if (inputs.length !== 1) {
      throw new Error("v-mask directive requires 1 input");
    } else {
      el = inputs[0];
    }
  }
  const element = el as unknown as HTMLInputElement;
  return { element, config };
};

const handleInput = (e: Event, config: Config) => {
  if (!e.isTrusted) return;
  const el = e.target as HTMLInputElement;
  let position = el.selectionEnd;
  if (!position) return;
  const digit = el.value[position - 1];
  el.value = masker(el.value, config.mask, true, config.tokens);
  while (
    position < el.value.length &&
    el.value.charAt(position - 1) !== digit
  ) {
    position++;
  }
  if (el === document.activeElement) {
    el.setSelectionRange(position, position);
    setTimeout(function () {
      el.setSelectionRange(position, position);
    }, 0);
  }
  el.dispatchEvent(event("input"));
};

const init = (el: HTMLElement, value: string | false) => {
  const { element, config } = getElementAndConfig(el, value);
  if (config.mask) {
    element.addEventListener("input", (e) => handleInput(e, config));
    const newDisplay = masker(element.value, config.mask, true, config.tokens);
    if (element.value !== newDisplay) {
      element.value = newDisplay;
      element.dispatchEvent(event("input"));
    }
  }
};

const mask: Directive<HTMLElement, string | false> = {
  beforeMount: (el, binding) => init(el, binding.value),
  beforeUpdate: (el, binding) => init(el, binding.value),
  beforeUnmount(el, binding) {
    const { element, config } = getElementAndConfig(el, binding.value);
    if (config.mask) {
      element.removeEventListener("input", (e) => handleInput(e, config));
    }
  },
};

export default mask;
