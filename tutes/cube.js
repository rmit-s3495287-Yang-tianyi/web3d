/**
 * cube.js 
 * A simple Three.js program which draws a cube
 */

var scene;
var camera;
var renderer;
var upperArm;
var lowerArm;
var shoulder;
var elbow ;
init();
shoulder=new THREE.Object3D;
elbow =new THREE.Object3D;
lowerArm=createCube(0xaadfff);
upperArm=createCube(0xffff00);

shoulder.add(upperArm);
shoulder.add(elbow);
elbow.add(lowerArm);

shoulder.rotation.z= Math.PI /3;
upperArm.position.x=1;
elbow.position.x=2;
lowerArm.position.x=1;
shoulder.add(createAxes(3));
elbow.add(createAxes(3));

scene.add(shoulder);
scene.add(createAxes(5));

light = new THREE.AmbientLight(0xaaf123); 
scene.add(light);

var keys = [0, 2, 4, 5, 6];
var values = [0, 3, 5, 7, 8];
var clock = new THREE.Clock();
clock.start();
console.log(clock.getElapsedTime());

renderer.render(scene, camera); 
var controls = new THREE.TrackballControls(camera);
controls.addEventListener('change', render);
animate();



document.onkeydown = handleKeyDown;

function handleKeyDown(event)
{
    switch (event.keyCode) {
    case 37:
        shoulder.rotation.z += 1 * Math.PI / 180;
        break;
    case 39:
        shoulder.rotation.z -= 1 * Math.PI / 180;
        break;
	case 38:
        elbow.rotation.z += 1 * Math.PI / 180;
        break;
    case 40:
        elbow.rotation.z -= 1 * Math.PI / 180;
        break;
    }
}
	

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); 
	camera.position.z = 2;
	//var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x404040, 1);
	document.body.appendChild(renderer.domElement); 
}
//function createCube(){
//	var geometry = new THREE.Geometry();
//geometry.vertices.push(new THREE.Vector3(-1, -1, 0));
//geometry.vertices.push(new THREE.Vector3(1, -1, 0));
//geometry.vertices.push(new THREE.Vector3(1, 1, 0));
//geometry.vertices.push(new THREE.Vector3(-1, 1, 0));
//geometry.faces.push(new THREE.Face3(0, 1, 2));
//geometry.faces.push(new THREE.Face3(0, 2, 3));
//geometry.computeFaceNormals();
//var material = new THREE.MeshBasicMaterial({color: 0xffff00}); 
//object = new THREE.Mesh(geometry, material); 
//return object;
//}
function createCube(color1){
	
	var geometry = new THREE.BoxGeometry(2, 1, 1); 
	var material = new THREE.MeshPhongMaterial({color:color1,specular:0xffffff});
	//var material = new THREE.MeshBasicMaterial({color:color1}); 
	var obj = new THREE.Mesh(geometry, material); 
	obj.add(createAxes(3));
	return obj;
}
function createAxes(length){
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(length, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, length, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, length));
  geometry.colors.push(new THREE.Color(0xff0000));
  geometry.colors.push(new THREE.Color(0xff0000));
  geometry.colors.push(new THREE.Color(0x00ff00));
  geometry.colors.push(new THREE.Color(0x00ff00));
  geometry.colors.push(new THREE.Color(0x0000ff));
  geometry.colors.push(new THREE.Color(0x0000ff));
  var material = new THREE.LineBasicMaterial();
  material.vertexColors = THREE.VertexColors;
  var axes = new THREE.LineSegments(geometry, material);
  axes.name = "axes";
  return axes;
}
function render() {
    renderer.render(scene, camera); 
}
function animate() {
    render();
    requestAnimationFrame(animate);
    controls.update();
}
//function animate(){
//  renderer.render(scene, camera); 
//  object.rotation.z += 2 * Math.PI / 360;
//  requestAnimationFrame(animate)
//}
