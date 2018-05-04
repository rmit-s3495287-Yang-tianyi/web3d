var scene;
var camera;
var renderer;
var upperArm;
var lowerArm;
var shoulder;
var elbow ;
init();
var light  = new THREE.DirectionalLight(0xffffff);

light.position.set(0, 1, 0);
var evlight  = new THREE.AmbientLight(0x404040);
scene.add(evlight);
scene.add(light);
scene.add(createPentagonalBipyramid(0x00ff00));
scene.add(createAxes(5));



renderer.render(scene, camera); 
var controls = new THREE.TrackballControls(camera);
controls.addEventListener('change', render);
animate();



document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
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
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x404040, 1);
	document.body.appendChild(renderer.domElement); 
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

  // returns square bipyramid (octahedron) object
  function createSquareBipyramid(size, colors){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0.5, 0, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0.25, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, 0.25));
	
	geometry.vertices.push(new THREE.Vector3(-0.5, 0, 0));
	geometry.vertices.push(new THREE.Vector3(0, -0.25, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, -0.25));
	
	geometry.faces.push(new THREE.Face3(0, 1, 2));
	
	geometry.faces.push(new THREE.Face3(3, 2, 1));
	
	geometry.faces.push(new THREE.Face3(0, 5, 1));
	
	geometry.faces.push(new THREE.Face3(3, 1, 5));
	geometry.faces.push(new THREE.Face3(0, 2, 4));
	
	geometry.faces.push(new THREE.Face3(3, 4, 2));
	geometry.faces.push(new THREE.Face3(0, 4, 5));
	geometry.faces.push(new THREE.Face3(3, 5, 4));
	
	
	geometry.computeFaceNormals();
	var material = new THREE.MeshLambertMaterial({color: colors});
	var object = new THREE.Mesh(geometry, material); 
	object.add(createAxes(3));
	return object;
	  
  }

  // returns pentagonal bipyramid (decahedron) object
  function createPentagonalBipyramid(colors){
	  
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0,0.5,0));
	geometry.vertices.push(new THREE.Vector3(0.8,0,-0.58));
	geometry.vertices.push(new THREE.Vector3(0.8,0,0.58));
	geometry.vertices.push(new THREE.Vector3(-0.3,0,0.95));
	geometry.vertices.push(new THREE.Vector3(-1,0,0));
	geometry.vertices.push(new THREE.Vector3(-0.3,0,-0.95));
	geometry.vertices.push(new THREE.Vector3(0,-0.5,0));
	geometry.faces.push(new THREE.Face3(0,1,2));
	geometry.faces.push(new THREE.Face3(0,2,3));
	geometry.faces.push(new THREE.Face3(0,3,4));
	geometry.faces.push(new THREE.Face3(0,4,5));
	geometry.faces.push(new THREE.Face3(0,5,1));
	geometry.faces.push(new THREE.Face3(6,2,1));
	geometry.faces.push(new THREE.Face3(6,3,2));
	geometry.faces.push(new THREE.Face3(6,4,3));
	geometry.faces.push(new THREE.Face3(6,5,4));
	geometry.faces.push(new THREE.Face3(6,1,5));
	var material = new THREE.MeshLambertMaterial({color: colors});
	var object = new THREE.Mesh(geometry, material); 
	return object;
	  
  }

  // returns joint axes object
  function createJoint(name){}

  // returns a whole leg
  function createLeg(end, side, material){}

  // returns the torso object
  function createTorso(material){}

  // returns the head object
  function createHead(material){}

  // Uses the other functions to create the frog
  function createFrog(material){}
    
