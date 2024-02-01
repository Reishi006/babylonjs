import React from "react";
import { Color4, FreeCamera, Vector3, HemisphericLight, MeshBuilder, ArcRotateCamera } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./App.css";

let box;
let box2;
/* let sphere; */

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new ArcRotateCamera("camera1", -Math.PI/2, 1, 10, new Vector3(0, 0, 0), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 0.9, 0), scene);
  //const light2 = new HemisphericLight("light", new Vector3(-1, 1, -1), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 1;
  //light2.intensity = 0.5;

  const faceColors = new Array(6);
  faceColors[4] = new Color4(1, 0, 0, 1);
  faceColors[1] = new Color4(0, 1, 0, 1);

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { size: 0.8, faceColors: faceColors, }, scene);
  box.edgesWidth = 1;
  box.edgesColor = new Color4(0, 0, 0, 1);
  box.enableEdgesRendering();
  let basicBox = box.createInstance('basicBox');
  basicBox.position.x = box.position.x + 0.8;
  /* sphere = MeshBuilder.CreateSphere('sphere', { size: 1 }, scene); */


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
{/* <div className='scene-container-wrapper'>
    
    </div> */}
export default () => (
  
  <div className="scene-container">
    <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
  </div>
);
