document.getElementById("monitor").addEventListener('click', function(){
 document.getElementById("monitor").webkitRequestFullscreen();
});

$(function(){
        $(".message2").typed({
            strings: ["welcome to the deimos station maintance facility"],
            typeSpeed: 120
        });
    });

/* ThreeJS */

var container = $("#canvas");
var canvasWidth = container.width();
var canvasHeight = container.height();

console.log(canvasWidth);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, canvasWidth / canvasHeight, 0.1, 1000 );

// this creates a 3d rendering context and
// a canvas
var renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( canvasWidth, canvasHeight );
renderer.setClearColor( 0x000000, 0 );

// the canvas is part of the renderer as a HTML DOM
// element and needs to be appended in the DOM
container.get(0).appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 2, 12, 12 );
var material = new THREE.MeshBasicMaterial({
      color : 0x92ff38,
      wireframe : true,
      wireframeLinewidth: 2
    });
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function render() {
	requestAnimationFrame( render );
  //cube.rotation.x += 0.02;
  cube.rotation.y += 0.008;
	renderer.render( scene, camera );
}
render();