function qs(
  selector: string, //
  parent: HTMLElement = document.documentElement
): HTMLElement {
  return parent.querySelector(selector) as HTMLElement;
}

export { qs };
