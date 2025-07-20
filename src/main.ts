import { Application, Buffer, BufferImageSource, BufferResource, BufferUsage, Sprite, Texture } from "pixi.js";

import * as wasm from '../libs/hello-rust-wasm/pkg';

// ...

// export function greet() {
wasm.greet();
// }


(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  const width = 256;
  const height = 256;
  const length = width * height * 4;
  const pixels = Uint8Array.from({ length }, () => Math.floor(Math.random() * 255));

  // Create BufferResource for audio texture
  const pixelResource = new BufferImageSource({ resource: pixels, width, height });
  const audioTexture = new Texture({ source: pixelResource });

  const sprite = app.stage.addChild(new Sprite(audioTexture));


  app.ticker.add(() => {
    pixels.forEach((_, i) => {
      pixels[i] = Math.floor(Math.random() * 255);
    });
    pixelResource.update();
  });

  // 6. Add the sprite to the stage
  app.stage.addChild(sprite);

})();
