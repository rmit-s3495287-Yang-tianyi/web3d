var scene;
var camera;
var renderer;
var body;
init();

body=createbody();


var head=createOctahedron();
var neck = new THREE.Object3D();
body.add(head);
body.position.y=1;
scene.add(body);
scene.add(head);
scene.add(createAxes(5));


renderer.render(scene, camera); 
var controls = new THREE.TrackballControls(camera);
controls.addEventListener('change', render);
animate();
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
function render() {
    renderer.render(scene, camera); 
}
function animate() {
    render();
    requestAnimationFrame(animate);
    controls.update();
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
function createbody(){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0,0.5,0));
	geometry.vertices.push(new THREE.Vector3(0.8,0,-0.58));
	geometry.vertices.push(new THREE.Vector3(0.8,0,0.58));
	geometry.vertices.push(new THREE.Vector3(-0.3,0,0.95));
	geometry.vertices.push(new THREE.Vector3(-1,0,0));
	geometry.vertices.push(new THREE.Vector3(-0.3,0,-0.95));
	geometry.vertices.push(new THREE.Vector3(0,-0.5,0));
	geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.faces.push(new THREE.Face3(0,2,3));
	geometry.faces.push(new THREE.Face3(0,3,4));
	geometry.faces.push(new THREE.Face3(0,4,5));
	geometry.faces.push(new THREE.Face3(0,5,1));
	geometry.faces.push(new THREE.Face3(6, 1, 2));
	geometry.faces.push(new THREE.Face3(6,2,3));
	geometry.faces.push(new THREE.Face3(6,3,4));
	geometry.faces.push(new THREE.Face3(6,4,5));
	geometry.faces.push(new THREE.Face3(6,5,1));
	var material = new THREE.MeshBasicMaterial({wireframe : true}); 
	var object = new THREE.Mesh(geometry, material); 
	return object;
}

function createOctahedron(){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0.5 ,0.25 ,0));
	geometry.vertices.push(new THREE.Vector3(0.5, 0 ,-0.25));
	geometry.vertices.push(new THREE.Vector3(1 ,0 ,0));
	geometry.vertices.push(new THREE.Vector3( 0.5 ,0 ,0.25));
	geometry.vertices.push(new THREE.Vector3( 0 ,0, 0));

    geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.faces.push(new THREE.Face3(0, 2,3));
	geometry.faces.push(new THREE.Face3(0, 3,4));
	geometry.faces.push(new THREE.Face3(0, 4,1));

	var material = new THREE.MeshBasicMaterial({wireframe : true}); 
	var object = new THREE.Mesh(geometry, material); 
	return object;
       
       
}