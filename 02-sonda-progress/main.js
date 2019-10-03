let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);

let composer = new THREE.EffectComposer(renderer);
let renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);
let bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 1, 0.2);
composer.addPass(bloomPass);
let glitchPass = new THREE.GlitchPass();
composer.addPass(glitchPass);
let chromaticAberrationPass = new THREE.ShaderPass(chromaticAberration);
composer.addPass(chromaticAberrationPass);
let antialiasPass = new THREE.ShaderPass(THREE.FXAAShader);
composer.addPass(antialiasPass);
antialiasPass.renderToScreen = true;

let rings = [];
for (let i = 0; i < 9; i++) {
    let inner = i + 1;
    const geometry = new THREE.RingGeometry(inner, inner + 0.7, 100, 1, i, Math.random() * 6 + 0.5);
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(`hsl(${360 - i * 45}, 100%, 50%)`) });
    const ring = new THREE.Mesh(geometry, material);
    scene.add(ring);
    rings.push({ ring, rotationSpeed: (Math.random() * 10 + 0.5) * 0.005 });
}

camera.position.z = 35;
camera.lookAt(new THREE.Vector3(0, 0, 0));

animate();
function animate() {
    requestAnimationFrame(animate);
    rings.forEach(r => r.ring.rotation.z += r.rotationSpeed);
    //renderer.render(scene, camera);
    composer.render();
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}, false)

document.addEventListener('mousemove', (e) => {
    let x = (e.clientX / window.innerWidth) * 2 - 1;
    let y = -(e.clientY / window.innerHeight) * 2 + 1;
    camera.position.set(x * 5, y * 5, camera.position.z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
})