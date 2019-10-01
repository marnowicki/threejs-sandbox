let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let rings = [];
for (let i = 0; i < 9; i++) {
    let inner = i + 1;
    const geometry = new THREE.RingGeometry(inner, inner + 0.7, 100, 1, i, Math.random() * 6 + 0.5);
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(`hsl(${360 - i * 45}, 100%, 50%)`) });
    const ring = new THREE.Mesh(geometry, material);
    scene.add(ring);
    rings.push({ ring, rotationSpeed: (Math.random() * 10 + 0.5) * 0.005 });
}

camera.position.z = 25;
camera.lookAt(new THREE.Vector3(0,0,0));

animate();
function animate() {
    requestAnimationFrame(animate);
    rings.forEach(r => r.ring.rotation.z += r.rotationSpeed);
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

document.addEventListener('mousemove', (e) => {
    let x = (e.clientX / window.innerWidth) * 2 - 1;
    let y = -(e.clientY / window.innerHeight) * 2 + 1;
    camera.position.set(x * 5, y * 5, camera.position.z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
})