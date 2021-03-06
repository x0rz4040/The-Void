var click = 0; // left click action
var rotation = 4; // the degree of rotation
var movementSpeed = 1000; // speed of horizontal movement
var zoomSpeed = 10;
var Objects = 60000;

var rotate = false; 
var container = document.createElement('div');
document.body.appendChild( container );


// creates camera and scene to put our stars in
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,1, 10000)
camera.position.z = 2000; 

var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0x555555, 0.0003 );  
var geometry = new THREE.Geometry();

//creates  vertices 
for (i = 0; i < Objects; i ++) 
{ 
  var vertex = new THREE.Vector3();
  vertex.x = Math.random()*70000-10000;
  vertex.y = Math.random()*10000-3500;
  vertex.z = Math.random()*10000-3500;
  geometry.vertices.push( vertex );
}

//these are the stars 
var material = new THREE.ParticleBasicMaterial( { size: 8 });
var stars = new THREE.ParticleSystem( geometry, material );
      
scene.add( stars ); 

camera.position.x = -10000;


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild( renderer.domElement );

renderer.render( scene, camera );

render();
            // this render function handles the animations of the program, 
            // the camera will move from left to right until the x value of<11000
            // is satisfied at which point the camera rotates and repeats.
            // the same is true for the y and z functions; rotation happens about every 30 seconds 
            function render() {
        requestAnimationFrame( render );
        if (!rotate && camera.position.x < 11000)
        {
          if(camera.position.x > 10000){
            rotate = true;
            if (camera.rotation.y < rotation){
              camera.rotation.y += .02;
              rotate = false;
            }
            if (camera.position.z > -2000){
              camera.position.z -= 15;
              rotate = false;
            }
          }
          else{
          camera.position.x += movementSpeed;
          camera.position.z += click;
          }
        }
        //this essentially does the same thing as the above statements but for after the rotation
        else if(rotate && camera.position.x > -11000){
                    if(camera.position.x < -10000){
            rotate = false;
            if (camera.rotation.y > 0){
              camera.rotation.y -= .02;
              rotate = true;
            }
            if (camera.position.z < 2000){
              camera.position.z += 15;
              rotate = true;
            }
          }
          else{
          camera.position.x -= movementSpeed;
          camera.position.z -= click;
          }
        }
        
           
                renderer.render( scene, camera );

            }

window.addEventListener( 'mousedown', onDocumentMouseDown, false );
window.addEventListener( 'mouseup', onDocumentMouseUp, false );
window.addEventListener( 'resize', onWindowResize, false );

// handles window resize  when click to zoom is activated
function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }
//when the mouse is clicked this is the speed at which the zoom will happen
function onDocumentMouseDown(){
    event.preventDefault();
    click = -zoomSpeed;
}
//when the mouse is left alone then nothing will happen ie no zoom
function onDocumentMouseUp(){
   click = 0;
}