import * as THREE from 'three';

console.log("okay...");

import { STLLoader } from '../js/STLLoader.js';
let camera, scene, renderer;

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );

function init() {

camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 500 );
camera.position.z = 12;

var canvas = document.querySelector("canvas");
var renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setClearColor(0xF0F0F0);


scene = new THREE.Scene();
scene.background = new THREE.Color( 0x292929 );
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
        lines.material.transparent = true;

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

document.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'resize', onResize, false );

}

function onMouseMove( event ) {

mouse.x = ( event.clientX - windowHalf.x );
mouse.y = ( event.clientY - windowHalf.x );

}

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

resize();
target.x = ( 1 - mouse.x ) * 0.002;
target.y = ( 1 - mouse.y ) * 0.002;

camera.rotation.x += 0.01 * ( target.y - camera.rotation.x );
camera.rotation.y += 0.01 * ( target.x - camera.rotation.y );

requestAnimationFrame( animate );
renderer.render( scene, camera );

}


init();
animate();