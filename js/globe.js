// Skills data
const skills = [
  // Programming Languages
  { name: 'Python', category: 'Programming' },
  { name: 'Java', category: 'Programming' },
  { name: 'JavaScript', category: 'Programming' },
  { name: 'PHP', category: 'Programming' },

  // Machine Learning & Data Science
  { name: 'TensorFlow', category: 'Machine Learning' },
  { name: 'Scikit-Learn', category: 'Machine Learning' },
  { name: 'Keras', category: 'Machine Learning' },
  { name: 'NLTK', category: 'Machine Learning' },
  { name: 'OpenCV', category: 'Machine Learning' },
  { name: 'Pandas', category: 'Machine Learning' },
  { name: 'NumPy', category: 'Machine Learning' },
  { name: 'Matplotlib', category: 'Machine Learning' },
  { name: 'Seaborn', category: 'Machine Learning' },

  // Web Development
  { name: 'Flask', category: 'Web Development' },
  { name: 'Django', category: 'Web Development' },
  { name: 'FastAPI', category: 'Web Development' },
  { name: 'HTML', category: 'Web Development' },
  { name: 'CSS', category: 'Web Development' },
  { name: 'Bootstrap', category: 'Web Development' },
  { name: 'Tailwind', category: 'Web Development' },

  // Database Management
  { name: 'MySQL', category: 'Database' },
  { name: 'SQLite', category: 'Database' },
  { name: 'SQLAlchemy', category: 'Database' },
  { name: 'Oracle', category: 'Database' },

  // Version Control & DevOps
  { name: 'Git', category: 'DevOps' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Heroku', category: 'DevOps' },
  { name: 'Vercel', category: 'DevOps' },
  { name: 'Github Pages', category: 'DevOps' },

  // Other Tools & Technologies
  { name: 'MS-Suite', category: 'Other' },
  { name: 'Markdown', category: 'Other' },
  { name: 'Power-BI', category: 'Other' },

  // AI and GenAI
  { name: 'GenAI', category: 'AI' },
  { name: 'Transformers', category: 'AI' },
  { name: 'Ollama', category: 'AI' },
  { name: 'Generative Adversarial Networks (GANs)', category: 'AI' }
];

// Three.js setup
let scene, camera, renderer, controls, globe, skillLabels;
let isAutoRotating = true;
let isInitialized = false;

// Cache for textures
const textureCache = new Map();

function init() {
  if (isInitialized) return;
  isInitialized = true;

  // Scene setup with optimized settings
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance"
  });
  
  const container = document.getElementById('globe');
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Camera position
  camera.position.z = 8;

  // Controls setup with optimized settings
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.minDistance = 5;
  controls.maxDistance = 15;
  controls.enableRotate = true;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.5;
  controls.minPolarAngle = -Infinity;
  controls.maxPolarAngle = Infinity;
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;
  controls.enableSmoothRotation = true;
  controls.smoothRotationSpeed = 0.5;

  // Create globe and labels
  createGlobe();
  createLabels();

  // Add event listeners
  window.addEventListener('resize', onWindowResize, false);
  document.getElementById('autoRotate').addEventListener('click', toggleAutoRotate);
  document.getElementById('resetView').addEventListener('click', resetView);

  // Start animation
  animate();
}

function createGlobe() {
  // Create sphere geometry with optimized segments
  const geometry = new THREE.SphereGeometry(2, 6, 6);
  
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  const material = new THREE.MeshPhongMaterial({
    color: isDarkMode ? 0x6f7fec : 0x161d45,
    transparent: true,
    opacity: 0.1,
    wireframe: true,
    wireframeLinewidth: 1
  });
  
  globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Add optimized lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 0.7 : 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, isDarkMode ? 1.5 : 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
}

function createLabels() {
  skillLabels = [];
  const isDarkMode = document.body.classList.contains('dark-mode');

  // Create labels in batches for better performance
  const batchSize = 5;
  let currentBatch = 0;

  function createBatch() {
    const start = currentBatch * batchSize;
    const end = Math.min(start + batchSize, skills.length);

    for (let i = start; i < end; i++) {
      const skill = skills[i];
      const labelMaterial = new THREE.MeshBasicMaterial({
        color: isDarkMode ? 0xffffff : 0x333333,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide
      });

      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const angleIncrement = Math.PI * 2 * goldenRatio;
      const theta = angleIncrement * i;
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);

      const labelGeometry = new THREE.PlaneGeometry(8, 4);
      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      label.position.set(x * 3, y * 3, z * 3);
      label.userData.originalPosition = label.position.clone();
      label.lookAt(0, 0, 0);

      // Create or get cached texture (using reduced resolution)
      let texture = textureCache.get(skill.name + (isDarkMode ? '_dark' : '_light'));
      if (!texture) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 1024; // Reduced resolution for better performance
        canvas.height = 512;

        context.fillStyle = isDarkMode ? '#ffffff' : '#191919';
        context.font = 'bold 30px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(skill.name, canvas.width / 2, canvas.height / 2);

        texture = new THREE.CanvasTexture(canvas);
        textureCache.set(skill.name + (isDarkMode ? '_dark' : '_light'), texture);
      }

      labelMaterial.map = texture;
      labelMaterial.needsUpdate = true;

      scene.add(label);
      skillLabels.push(label);
    }

    currentBatch++;
    if (currentBatch * batchSize < skills.length) {
      requestAnimationFrame(createBatch);
    }
  }

  createBatch();
}

function animate() {
  requestAnimationFrame(animate);

  if (isAutoRotating) {
    const time = Date.now() * 0.001;
    globe.rotation.y += 0.001;
    globe.rotation.x = Math.sin(time * 0.5) * 0.05;
  }

  // Update only visible labels
  const frustum = new THREE.Frustum();
  frustum.setFromProjectionMatrix(
    new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    )
  );

  skillLabels.forEach(label => {
    if (frustum.containsPoint(label.position)) {
      const position = label.userData.originalPosition.clone();
      position.applyQuaternion(globe.quaternion);
      label.position.copy(position);
      
      const direction = new THREE.Vector3();
      direction.subVectors(camera.position, label.position).normalize();
      label.lookAt(camera.position);
      
      label.rotation.x = 0;
      label.rotation.z = 0;
      label.rotation.y = Math.atan2(direction.x, direction.z);
    }
  });

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  const container = document.getElementById('globe');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function toggleAutoRotate() {
  isAutoRotating = !isAutoRotating;
  const button = document.getElementById('autoRotate');
  button.classList.toggle('active');
  button.querySelector('.material-icons').textContent = isAutoRotating ? 'rotate_right' : 'pause';
}

function resetView() {
  camera.position.set(0, 0, 8);
  camera.lookAt(0, 0, 0);
  controls.reset();
  globe.rotation.x = 0;
  globe.rotation.y = 0;
  
  // Reset label positions and orientations
  skillLabels.forEach(label => {
    label.position.copy(label.userData.originalPosition);
    label.lookAt(0, 0, 0);
    label.rotation.x = 0;
    label.rotation.z = 0;
    label.rotation.y = 0;
  });
}

// Dispose of globe and labels when theme changes to free memory
function disposeGlobeAndLabels() {
  if (globe) {
    globe.geometry.dispose();
    globe.material.dispose();
    scene.remove(globe);
    globe = null;
  }
  if (skillLabels && skillLabels.length) {
    skillLabels.forEach(label => {
      label.geometry.dispose();
      if (label.material.map) label.material.map.dispose();
      label.material.dispose();
      scene.remove(label);
    });
    skillLabels = [];
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Debounce timer for theme changes
let themeChangeTimeout;
const observer = new MutationObserver((mutations) => {
  // Debounce theme change handling
  clearTimeout(themeChangeTimeout);
  themeChangeTimeout = setTimeout(() => {
    // Dispose existing objects before recreating them
    disposeGlobeAndLabels();
    createGlobe();
    createLabels();
  }, 100);
});

observer.observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});
