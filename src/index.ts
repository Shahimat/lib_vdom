import { BaseEngine } from './lib/engine';

function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello webpack!';

  return element;
}

document.body.appendChild(component());

(async () => {
  const engine = new BaseEngine();
  await engine.build();
  await engine.run();
})();
