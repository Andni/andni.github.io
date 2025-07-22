import { Application, BufferImageSource, Sprite, Texture } from "pixi.js";

import * as wasm from '../libs/hello-rust-wasm/pkg';


(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });


  const response = await fetch('/BrushStrokes-q6B5.ttf');
  const fontData = await response.arrayBuffer();



  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  // const width = 256;
  // const height = 256;
  const sdf = wasm.generate_sdf(new Uint8Array(fontData));

  console.log(sdf.width, sdf.height, sdf.data);
  // const length = bufferPixels.height * bufferPixels.width;
  // const pixels = Uint8Array.from({ length }, () => Math.floor(Math.random() * 255));
  // const pixels = Float32Array.from(sdf.data.map(val => val));

  // Create BufferResource for audio texture
  const pixelResource = new BufferImageSource({ resource: sdf.data, width: sdf.width, height: sdf.height, format: "r32float" });
  const audioTexture = new Texture({ source: pixelResource });

  const sprite = app.stage.addChild(new Sprite(audioTexture));
  sprite.scale = 10;


  // app.ticker.add(() => {
  //   pixels.forEach((_, i) => {
  //     pixels[i] = Math.floor(Math.random() * 255);
  //   });
  //   pixelResource.update();
  // }); 
  // 6. Add the sprite to the stage
  app.stage.addChild(sprite);

})();