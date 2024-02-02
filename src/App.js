import React from "react";
import { Color4, StandardMaterial, FreeCamera, Vector3, HemisphericLight, MeshBuilder, ArcRotateCamera } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./App.css";

let box;
let sphere;

let cubeSize = 0.8;
let widthInBlocks = 32;

let seedMultiplier = 100000000;
let seed = 0.6578997*seedMultiplier;
/* let sphere; */

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new ArcRotateCamera("camera1", -Math.PI/2, 1, 40, new Vector3(0, 0, 0), scene);

  let centerCoords = (widthInBlocks*cubeSize)/2 - cubeSize;
  // This targets the camera to scene origin
  camera.setTarget(new Vector3(centerCoords, 0, -centerCoords));

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 0.5, 0), scene);
  const light2 = new HemisphericLight("light", new Vector3(0, -0.5, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 1;
  light2.intensity = 0.3;

  // Our built-in 'box' shape.
  /* box = MeshBuilder.CreateBox("box", { size: cubeSize, faceColors: faceColors, }, scene);
  box.edgesWidth = 1;
  box.edgesColor = new Color4(0, 0, 0, 1);
  box.enableEdgesRendering(); */

  let zRow = 1;
  let xPosition = 0;
  console.log(`xPosition on definition: ${xPosition}`);
  let zPosition = 0;

  let perlinArr = Array(Math.pow(widthInBlocks, 2) * Math.pow(widthInBlocks, 2));

  for (let i = 0; i < Math.pow(widthInBlocks, 2); i++) {
    const faceColors = new Array(6);
    faceColors[4] = new Color4(((seed%255) + 600 - (Math.random()*500))/1000, ((seed%255))/1000, ((seed%255) + 100)/1000, 1);
    faceColors[0] = new Color4(0, ((seed%255) + 500 - (Math.random()*200))/1000, 0, 1);
    faceColors[1] = new Color4(0, ((seed%255) + 800 - (Math.random()*100))/1000, 0, 1);
    faceColors[2] = new Color4(0, ((seed%255) + 500 - (Math.random()*200))/1000, 0, 1);
    faceColors[3] = new Color4(0, ((seed%255) + 500 - (Math.random()*200))/1000, 0, 1);
    faceColors[5] = new Color4(0, ((seed%255) + 100 - (Math.random()*200))/1000, ((seed%255) - (Math.random()*100))/1000, 1);
    box = MeshBuilder.CreateBox(`box${i}`, { size: cubeSize, faceColors: faceColors, }, scene);
    box.edgesWidth = 1;
    //(seed%255)/1000

    box.edgesColor = new Color4(0, 0, 0, 1);
    box.enableEdgesRendering();
    let x = i % widthInBlocks;
    //console.log(x);
    //console.log(`i: ${i}`);
    xPosition = (x - (x*0.2));
    box.position.x = xPosition;
    if (i % widthInBlocks == 0) {
      zRow++;
      zPosition -= cubeSize;
    }
    box.position.z = zPosition;

    perlinArr.push([
      (xPosition - (cubeSize/2)).toFixed(2),
      (xPosition + (cubeSize/2)).toFixed(2),
      (zPosition - (cubeSize/2)).toFixed(2),
      (zPosition + (cubeSize/2)).toFixed(2),
    ]);
  }
  console.log(perlinArr);
  //sphere = MeshBuilder.CreateSphere('sphere', { size: 0.1 }, scene);


  box.edgesShareWithInstances = true;

  // Our built-in 'ground' shape.
  //MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    //box.rotation.y += (rpm / 120) * Math.PI * 2 * (deltaTimeInMillis / 1000);

  }
};
export default () => (
  
  <div className="scene-container">
    <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
  </div>
);
