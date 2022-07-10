enum VDOMTagType {
  Button = 'Button',
  Div = 'Div',
}

const getTagType = (tag: HTMLElement) => {
  switch (tag.tagName) {
    case 'BUTTON':
      return VDOMTagType.Button;
    case 'DIV':
      return VDOMTagType.Div;
  }
  return null;
};

class VDOMTag {
  private tag: HTMLElement;
  id: number;
  type: VDOMTagType;

  constructor(tag: HTMLElement, id: number) {
    this.id = id;
    this.type = getTagType(tag);
    this.tag = tag;
    tag.setAttribute('data-id', `${this.id}`);
    this.setActions();
  }

  getTag() {
    return document.querySelector(`[data-id="${this.id}"]`);
  }

  setActions() {
    switch (this.type) {
      case VDOMTagType.Button:
        this.tag.onclick = (event: MouseEvent) => {
          console.log('da!');
        };
        break;
    }
  }
}

export class BaseEngine {
  id: number;
  tags: VDOMTag[];

  constructor() {
    this.id = 0;
    this.tags = [];
  }

  async build() {}

  async run() {
    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', this._run.bind(this));
    } else {
      this._run();
    }
  }

  private async _run() {
    const tags = document.querySelectorAll<HTMLElement>('[data-dyn]');
    tags.forEach((tag) => {
      this.tags.push(new VDOMTag(tag, this.id));
      this.id++;
    });
    debugger;
  }
}
