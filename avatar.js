    

let scene, camera, renderer, mixer;
let helloAnimation, standingAnimation;
let helloAnimationFinished = false; // Flag to track the completion of helloAnimation
let currentModel = null; // Track the current model in the scene

function init() {
    console.log('Initializing scene...');

    // Scene
    scene = new THREE.Scene();
    console.log('Scene created.');

    // Camera
    const container = document.getElementById('avatarContainer');
    camera = new THREE.PerspectiveCamera(50,1, 0.1, 1000);
    camera.position.set(0,0, 4);
    console.log('Camera created.');

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);
    console.log('Renderer created.');

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Softer ambient light
    scene.add(ambientLight);
    console.log('Ambient light added.');

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight1.position.set(5, 5, 5).normalize();
    scene.add(directionalLight1);
    console.log('Directional light 1 added.');

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight2.position.set(-4, -4, -4).normalize();
    scene.add(directionalLight2);
    console.log('Directional light 2 added.');

    const loader = new THREE.GLTFLoader();
    loader.load('models/hello.glb', function (gltf) {
        // Remove previous model if it exists
        if (currentModel) {
            scene.remove(currentModel);
        }

        // Load new model
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        // Center the model in the scene
        model.position.set(-center.x, -center.y, -center.z);
        model.scale.set(1.5, 1.5, 1.5);

        scene.add(model);
        console.log('Hello model loaded.');


        currentModel = model;

    
        mixer = new THREE.AnimationMixer(model);
        console.log("this is animation list", gltf.animations);

    
        gltf.animations.forEach((clip) => {
            console.log(`Loaded animation:1 ${clip.name}`, clip.name);

            helloAnimation = mixer.clipAction(clip);
            console.log(`Hello animation duration: ${helloAnimation.getClip().duration}`);

            helloAnimation.setLoop(THREE.LoopOnce);
            helloAnimation.clampWhenFinished = true;
            helloAnimation.play();
        });

        animate();
    }, undefined, function (error) {
        console.error('Error loading hello model:', error);
    });
}

function loadStandingAnimation() {
    console.log("Loading standing animation...");

    const loader = new THREE.GLTFLoader();
    loader.load('models/hello.glb', function (gltf) {
    
        if (currentModel) {
            scene.remove(currentModel);
        }

        
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

    
        model.position.set(-center.x, -center.y, -center.z);
        model.scale.set(1.5, 1.5, 1.5);

        scene.add(model);
        console.log('Standing model loaded.');

    
        currentModel = model;


        mixer = new THREE.AnimationMixer(model);

        gltf.animations.forEach((clip) => {
            console.log(`Loaded animation 2: ${clip.name}`, clip.name);
        
                standingAnimation = mixer.clipAction(clip);
                standingAnimation.setLoop(THREE.LoopRepeat);
                standingAnimation.play();
        
        });

        animate(); 
        
    }, undefined, function (error) {
        console.error('Error loading standing model:', error);
    });
}
function loadnextanimation() {
    console.log("Loading standing animation...");

    const loader = new THREE.GLTFLoader();
    loader.load('models/hand movement.glb', function (gltf) {
    
        if (currentModel) {
            scene.remove(currentModel);
        }

        
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

    
        model.position.set(-center.x, -center.y, -center.z);
        model.scale.set(1.5, 1.5, 1.5);

        scene.add(model);
        console.log('Standing model loaded.');

    
        currentModel = model;


        mixer = new THREE.AnimationMixer(model);

        gltf.animations.forEach((clip) => {
            console.log(`Loaded animation 2: ${clip.name}`, clip.name);
        
                standingAnimation = mixer.clipAction(clip);
                standingAnimation.setLoop(THREE.LoopRepeat);
                standingAnimation.play();
        
        });

        animate();
        loadStandingAnimation()
    }, undefined, function (error) {
        console.error('Error loading standing model:', error);
    });
}

function animate() {
    requestAnimationFrame(animate);

    if (mixer) {
        mixer.update(0.016); // Update mixer with delta time
    }

    // Check if helloAnimation has finished
    if (helloAnimation && !helloAnimationFinished) {
        const currentTime = helloAnimation.time;
        const duration = helloAnimation.getClip().duration;

        if (currentTime >= duration) {
            console.log('Hello animation finished.');
            helloAnimationFinished = true; // Set flag to prevent multiple calls
            loadStandingAnimation(); 
        }
    }

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const container = document.getElementById('avatarContainer');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

init();
