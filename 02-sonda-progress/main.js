let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let rings = [];
for(let i=0;i<9;i++){
    let inner = i + 1;
    const geometry = new THREE.RingGeometry(inner, inner + 0.7, 100, 1, i, Math.random() * 6);
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(`hsl(${i * 45}, 100%, 50%)`) });
    const ring = new THREE.Mesh(geometry, material);
    scene.add(ring);
    rings.push(ring);
}


camera.position.z = 25;

animate();

function animate(){
    requestAnimationFrame(animate);
    rings.forEach(r => r.rotation.z += 0.01);
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
})