import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function begin(floatArray) {
  console.log("begin");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  const geometry = new THREE.BoxGeometry(2, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 55;
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  function animate() {
    cube.position.x += floatArray[3] / 1000 || 0;
    cube.position.y += floatArray[4] / 1000 || 0;
    // cube.position.z += floatArray[2] / 1000 || 0;

    // cube.rotation.x += floatArray[0] / 1000 || 0;
    // cube.rotation.y += floatArray[1] / 1000 || 0;
    // cube.rotation.z += floatArray[2] / 1000 || 0;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
