import { Application, BufferImageSource, Geometry, Mesh, Shader, Sprite, Texture } from "pixi.js";

import * as wasm from '../libs/hello-rust-wasm/pkg';
import vertex from './shader.vert?raw';
import fragment from './shader.frag?raw';
import source from './source.wgsl?raw';

declare let globalThis: any;

(async () => {
  // Create a new application
  const app = new Application();


  globalThis.__PIXI_APP__ = app;
  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window, preference: "webgl" });


  const response = await fetch('/BrushStrokes-q6B5.ttf');
  const fontData = await response.arrayBuffer();



  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  const sdf = wasm.generate_sdf(new Uint8Array(fontData));

  // Create BufferResource for audio texture
  const pixelResource = new BufferImageSource({ resource: sdf.data, width: sdf.width, height: sdf.height, format: "r32float" });
  const audioTexture = new Texture({ source: pixelResource });

  const sprite = app.stage.addChild(new Sprite(audioTexture));
  sprite.scale = 10;


  const geometry = new Geometry({
    attributes: {
      aPosition: [
        -100, -100,
        100, -100,
        100, 100,
        -100, 100
      ],
      aColor: [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
        1, 1, 1
      ],
      aUV: [
        0, 0,
        1, 0,
        1, 1,
        0, 1
      ],
    },
    topology: "triangle-strip",
    indexBuffer: [0, 1, 2, 2, 3, 0]
  });

  const gl = { vertex, fragment };

  const gpu = {
    vertex: {
      entryPoint: 'mainVert',
      source,
    },
    fragment: {
      entryPoint: 'mainFrag',
      source,
    },
  };

  const shader = Shader.from({
    gl,
    gpu,
    resources: {
      uTexture: audioTexture.source,
    },
  });

  const quad = new Mesh({
    geometry,
    shader,
  });


  app.stage.addChild(quad);
  quad.position.x = 500;
  quad.position.y = 500;


})();

