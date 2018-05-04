var scene;
var camera;
var renderer;
init();
var geometry = new THREE.BoxGeometry(2, 1, 1); 
var torusGeometry = new THREE.TorusGeometry(1,0.25,30,50);


//普通材料
 var torusMaterial=new THREE.MeshBasicMaterial({wireframe : true}); 
//漫射材料
//var torusMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
//镜面反射
 //var torusMaterial = new THREE.MeshPhongMaterial({color: 0xff0000, specular: 0xffffff});

var tours = new THREE.Mesh(torusGeometry,torusMaterial);
//改变线框颜色
//var border = new THREE.EdgesHelper( tours,0xffff00 ); 
//scene.add(border);


//方向灯
var light1  = new THREE.DirectionalLight(0xffffff);
light1.position.set(0, 0, 1);
//环境灯
var light2  = new THREE.AmbientLight(0x404040);

scene.add(light1);
scene.add(light2);
scene.add(tours);

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