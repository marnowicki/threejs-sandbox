
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let composer = new THREE.EffectComposer(renderer);
let renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);
afterimagePass = new THREE.AfterimagePass();
composer.addPass(afterimagePass);

afterimagePass.uniforms["damp"].value = 0.94;

let geometry = new THREE.Geometry();
for (let i = 0; i < 10000; i++) {
    geometry.vertices.push(new THREE.Vector3(
        THREE.Math.randFloatSpread(2000),
        THREE.Math.randFloatSpread(2000),
        THREE.Math.randFloatSpread(2000),
    ))
}
let material = new THREE.PointsMaterial(0x999999);

let points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 1000;
animate();

function animate() {
    requestAnimationFrame(animate);

    for(let i=0;i<10000;i++){
        geometry.vertices[i].x += 0.4;
    }
    geometry.verticesNeedUpdate = true;

    //renderer.render(scene, camera);
    composer.render();

}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}, false)

