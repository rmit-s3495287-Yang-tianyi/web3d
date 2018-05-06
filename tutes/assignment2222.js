var scene;
var camera;
var renderer;
var body;
var wireframew=0;
var joint1;
var joint2;
var material;
var eyematerial;
init();


material = new THREE.MeshLambertMaterial({side:THREE.DoubleSide,color : 0x00ff00});
eyematerial = new THREE.MeshLambertMaterial({side:THREE.DoubleSide,color : 0x000000});

createFrog(material);

renderer.render(scene, camera); 
var controls = new THREE.TrackballControls(camera);
controls.addEventListener('change', render);
animate();

document.onkeydown = handleKeyDown;

function handleKeyDown(event)
{
    switch (event.keyCode) {
    case 77:
        if(wireframew==0){
			wireframew=1;
			material.wireframe=true;
			eyematerial.wireframe=true;
		}else{
			wireframew=0;
			material.wireframe=false;
			eyematerial.wireframe=false;
		}
        break;
    case 39:
        joint1.rotation.z += 1 * Math.PI / 180;
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
function render() {
    renderer.render(scene, camera); 
}
function animate() {
    render();
    requestAnimationFrame(animate);
    controls.update();
}

function createJoint(length){
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

 function createPentagonalBipyramid(material){
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
	var object = new THREE.Mesh(geometry, material);
	object.add(createJoint(0.5));
	return object;
}

function createSquareBipyramid(sizeX, sizeY, sizeZ, material){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(sizeX ,sizeY ,0));
	geometry.vertices.push(new THREE.Vector3(sizeX, 0 ,-sizeZ));
	geometry.vertices.push(new THREE.Vector3(1*sizeX*2 ,0 ,0));
	geometry.vertices.push(new THREE.Vector3( sizeX ,0 ,sizeZ));
	geometry.vertices.push(new THREE.Vector3( 0 ,0, 0));
	geometry.vertices.push(new THREE.Vector3( sizeX ,-sizeY, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.faces.push(new THREE.Face3(0, 2,3));
	geometry.faces.push(new THREE.Face3(0, 3,4));
	geometry.faces.push(new THREE.Face3(0, 4,1));
	geometry.faces.push(new THREE.Face3(5, 1, 2));
	geometry.faces.push(new THREE.Face3(5, 2,3));
	geometry.faces.push(new THREE.Face3(5, 3,4));
	geometry.faces.push(new THREE.Face3(5, 4,1));
	var object = new THREE.Mesh(geometry, material); 
	var axes=createJoint(0.5);
	axes.position.x=0.5;
	object.add(axes);
	return object;
          
}

function createHead(material){
	var head=createSquareBipyramid(0.5, 0.25, 0.25, material);
	head.position.x=0.8;
	head.rotation.z=0.5;
	return head;
}

function createTorso(material){
	joint1 = new THREE.Object3D();
	var ltarm=createSquareBipyramid(0.5, 0.25, 0.25, material);
	var lbarm=createSquareBipyramid(0.5, 0.25, 0.25, material);
	var ltoes=createToes(material);
	joint1.add(ltarm);
	ltarm.add(lbarm);
	lbarm.add(ltoes);
	joint1.position.x=0.8;
	joint1.rotation.z=-Math.PI / 4;
	lbarm.position.x=1;
	lbarm.rotation.z=Math.PI / 4;
	ltoes.position.x=1;
	return joint1;
 }

function createEye(sizeX, sizeY, sizeZ, material){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(sizeX ,sizeY ,0));
	geometry.vertices.push(new THREE.Vector3(sizeX, 0 ,-sizeZ));
	geometry.vertices.push(new THREE.Vector3(1*sizeX*2 ,0 ,0));
	geometry.vertices.push(new THREE.Vector3( sizeX ,0 ,sizeZ));
	geometry.vertices.push(new THREE.Vector3( 0 ,0, 0));
	geometry.vertices.push(new THREE.Vector3( sizeX ,-sizeY, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.faces.push(new THREE.Face3(0, 2,3));
	geometry.faces.push(new THREE.Face3(0, 3,4));
	geometry.faces.push(new THREE.Face3(0, 4,1));
	geometry.faces.push(new THREE.Face3(5, 1, 2));
	geometry.faces.push(new THREE.Face3(5, 2,3));
	geometry.faces.push(new THREE.Face3(5, 3,4));
	geometry.faces.push(new THREE.Face3(5, 4,1));
	var object = new THREE.Mesh(geometry, material); 
	object.position.x=0.75;
	return object;
          
}

function createToes(material){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0,0 ,0));
	geometry.vertices.push(new THREE.Vector3(0.5, 0 ,-0.25));
	geometry.vertices.push(new THREE.Vector3(0.5, 0 ,0.25));
	geometry.faces.push(new THREE.Face3(0,1,2));
	var object = new THREE.Mesh(geometry, material); 
	var axes=createJoint(0.5);
	object.add(axes);
	return object;
}

function createWater(){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-5,-0.5 ,2));
	geometry.vertices.push(new THREE.Vector3(5, -0.5 ,2));
	geometry.vertices.push(new THREE.Vector3(5, -0.5 ,-2));
	geometry.vertices.push(new THREE.Vector3(-5, -0.5 ,-2));
	geometry.faces.push(new THREE.Face3(0,1,2));
	geometry.faces.push(new THREE.Face3(2,3,0));
	var m= new THREE.MeshLambertMaterial({side:THREE.DoubleSide,color : 0xaaaaaa});
	var object = new THREE.Mesh(geometry, m); 
	return object;
}
function createFrog(material){
	
	body=createPentagonalBipyramid(material);
	var head=createHead(material);
	var leye=createEye(0.1, 0.1, 0.1, eyematerial);
	var reye=createEye(0.1, 0.1, 0.1, eyematerial);
	var larm=createTorso(material);
	var rarm=createTorso(material);
	body.add(head);
	body.add(larm);
	body.add(rarm);
	head.add(leye);
	head.add(reye);
	
	body.position.y=1;
	leye.position.z=0.1;
	reye.position.z=-0.1;
	larm.position.z=-0.58;
	rarm.position.z=0.58;
	scene.add(body);
	scene.add(createWater());
	var light1=directionalLight(body);
	var light2=ambientLight();
	scene.add(light1);
	scene.add(light2);
	scene.add(createJoint(5));
	

}

function directionalLight(name){
	var light1  = new THREE.DirectionalLight(0xffffff);
	light1.position.set(2,0,0);
	light1.target = name;
	return light1;
}

function ambientLight(){
	var light2  = new THREE.AmbientLight(0x404040);
	return light2;
}

