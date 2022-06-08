//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 41;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 1.4;
  const far = 1000;



  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 3, 10);

  const ambient = new THREE.AmbientLight(0x404040, 3);
  scene.add(ambient);



  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //


  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./house/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animate();
  });

  const controls = new THREE.OrbitControls( camera, renderer.domElement, scene );
  controls.addEventListener( 'change', function () {

    renderer.render( scene, camera );

  } );
  camera.position.set( 0, 20, 100 );
  controls.update();
}


function animate() {
  requestAnimationFrame(animate);

  house.rotation.z += 0.005;
  renderer.render(scene, camera);

}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();


  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
