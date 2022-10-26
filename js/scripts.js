import * as THREE from 'three';

import { STLLoader } from '../js/STLLoader.js';
import { TrackballControls } from '../js/TrackballControls.js';

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 500 );
camera.position.set(8.849704681658944,-7.975324354635025,9.551292802281095);
camera.quaternion.set(0.5975724343883114,-0.06456188236289945, -0.06762232092697967);
camera.up.set(-0.332123346226811, 0.5444934059228567, 0.7702084223102447);
camera.zoom =1;

var canvas = document.querySelector("canvas");

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x292929 );
scene.add(camera);

var renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setClearColor(0xF0F0F0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

const loader = new STLLoader();
loader.load(
    // resource URL
    'assets/room.stl',
    // called when resource is loaded
    function ( object ) {

        const wireframe = new THREE.WireframeGeometry( object );
        const lines = new THREE.LineSegments( wireframe );
        lines.material.color.setHex( 0xf7cd60 );
        lines.material.depthTest = false;
        lines.material.opacity = 0.25;
        lines.material.transparent = false;

        scene.add(lines);

    },
    // called when loading is in progresses
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

        console.log( 'An error happened' );

    }
);

var controls = new TrackballControls( camera, renderer.domElement);
controls.rotateSpeed = 10.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

window.addEventListener( 'resize', resize, false );

function resize() {
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if (width != canvas.width || height != canvas.height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }3

function animate() {

    requestAnimationFrame( animate );
    controls.update();
    console.log(camera);
    renderer.render( scene, camera );
}

animate();