   //USING BLAZEPOSE TO CONTROL A 3D MODEL
   //Adapted from KyleWetton's control of a 3D character with the mouse: https://tympanus.net/codrops/2019/10/14/how-to-create-an-interactive-3d-character-with-three-js/

   // Set our main variables
    let scene,  
      renderer,
      virtualCam,
      model,                              // Our character
      neck,                               // Reference to the neck bone in the skeleton
      head,
      leftArm,
      rightArm,
      leftShoulder,
      rightShoulder,
      leftForearm,
      rightForearm,
      leftHand,
      rightHand,
      waist,                               // Reference to the waist bone in the skeleton
      possibleAnims,                      // Animations found in our file
      mixer,                              // THREE.js animations mixer
      idle,                               // Idle, the default state our character returns to
      clock = new THREE.Clock(),          // Used for anims, which run to a clock instead of frame rate 
      currentlyAnimating = false,         // Used to check whether characters neck is being used in another anim
      raycaster = new THREE.Raycaster(),  // Used to detect the click on our character
      loaderAnim = document.getElementById('js-loader');
    let nose, leftWrist, rightwrist;
    const videoElement = document.getElementsByClassName('input_video')[0];
    videoElement.style.display = 'none';
    const canvasElement = document.getElementsByClassName('output_canvas')[0];
    const canvasCtx = canvasElement.getContext('2d');
    const landmarkContainer = document.getElementsByClassName('landmark-grid-container')[0];
      
    function onResults(results) {
        if (!results.poseLandmarks) {
          return;
    }
    if (neck) {
      moveJoint(results.poseLandmarks[0], neck, false);
    }
    if(leftArm){
      moveJoint(results.poseLandmarks[15], leftArm, false);
    }
    if(rightArm){
      moveJoint(results.poseLandmarks[16], rightArm, false);
    }
    if(leftShoulder){
      moveJoint(results.poseLandmarks[13], leftShoulder, true);
    }
    if(rightShoulder){
      moveJoint(results.poseLandmarks[14], rightShoulder, true);
    }
    
      
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      
        // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'source-in';
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      
    // Only overwrite missing pixels.
    // canvasCtx.globalCompositeOperation = 'destination-atop';
    // canvasCtx.drawImage(
    //     results.image, 0, 0, canvasElement.width, canvasElement.height);
      
    canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
        { color: '#00FF00', lineWidth: 4 });
    drawLandmarks(canvasCtx, results.poseLandmarks,
        { color: '#FF0000', lineWidth: 2 });
        canvasCtx.restore();
    }
      
    const pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
    });
      
    pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
      
    pose.onResults(onResults);
      
    const camera = new Camera(videoElement, {
        onFrame: async () => {
          await pose.send({ image: videoElement });
        },
        width: 1280,
        height: 720
    });
    camera.start();

     init(); 
    //  mixamorigHips sketch.js:91:25
    //  mixamorigSpine sketch.js:91:25
    //  mixamorigSpine1 sketch.js:91:25
    //  mixamorigSpine2 sketch.js:91:25
    //  mixamorigNeck sketch.js:91:25
    //  mixamorigHead sketch.js:91:25
    //  mixamorigHeadTop_End sketch.js:91:25
    //  mixamorigLeftShoulder sketch.js:91:25
    //  mixamorigLeftArm sketch.js:91:25
    //  mixamorigLeftForeArm sketch.js:91:25
    //  mixamorigLeftHand sketch.js:91:25
    //  mixamorigLeftHandThumb1 sketch.js:91:25
    //  mixamorigLeftHandThumb2 sketch.js:91:25
    //  mixamorigLeftHandThumb3 sketch.js:91:25
    //  mixamorigLeftHandThumb4 sketch.js:91:25
    //  mixamorigLeftHandIndex1 sketch.js:91:25
    //  mixamorigLeftHandIndex2 sketch.js:91:25
    //  mixamorigLeftHandIndex3 sketch.js:91:25
    //  mixamorigLeftHandIndex4 sketch.js:91:25
    //  mixamorigLeftHandMiddle1 sketch.js:91:25
    //  mixamorigLeftHandMiddle2 sketch.js:91:25
    //  mixamorigLeftHandMiddle3 sketch.js:91:25
    //  mixamorigLeftHandMiddle4 sketch.js:91:25
    //  mixamorigLeftHandRing1 sketch.js:91:25
    //  mixamorigLeftHandRing2 sketch.js:91:25
    //  mixamorigLeftHandRing3 sketch.js:91:25
    //  mixamorigLeftHandRing4 sketch.js:91:25
    //  mixamorigRightShoulder sketch.js:91:25
    //  mixamorigRightArm sketch.js:91:25
    //  mixamorigRightForeArm sketch.js:91:25
    //  mixamorigRightHand sketch.js:91:25
    //  mixamorigRightHandThumb1 sketch.js:91:25
    //  mixamorigRightHandThumb2 sketch.js:91:25
    //  mixamorigRightHandThumb3 sketch.js:91:25
    //  mixamorigRightHandThumb4 sketch.js:91:25
    //  mixamorigRightHandIndex1 sketch.js:91:25
    //  mixamorigRightHandIndex2 sketch.js:91:25
    //  mixamorigRightHandIndex3 sketch.js:91:25
    //  mixamorigRightHandIndex4 sketch.js:91:25
    //  mixamorigRightHandMiddle1 sketch.js:91:25
    //  mixamorigRightHandMiddle2 sketch.js:91:25
    //  mixamorigRightHandMiddle3 sketch.js:91:25
    //  mixamorigRightHandMiddle4 sketch.js:91:25
    //  mixamorigRightHandRing1 sketch.js:91:25
    //  mixamorigRightHandRing2 sketch.js:91:25
    //  mixamorigRightHandRing3 sketch.js:91:25
    //  mixamorigRightHandRing4 sketch.js:91:25
    //  mixamorigLeftUpLeg sketch.js:91:25
    //  mixamorigLeftLeg sketch.js:91:25
    //  mixamorigLeftFoot sketch.js:91:25
    //  mixamorigLeftToeBase sketch.js:91:25
    //  mixamorigLeftToe_End sketch.js:91:25
    //  mixamorigRightUpLeg sketch.js:91:25
    //  mixamorigRightLeg sketch.js:91:25
    //  mixamorigRightFoot sketch.js:91:25
    //  mixamorigRightToeBase sketch.js:91:25
    //  mixamorigRightToe_End sketch.js:91:25
     
    function init() {
        const MODEL_PATH = 'mousey.gltf';
        
        var loader = new THREE.GLTFLoader();

        loader.load(
        MODEL_PATH,
        function(gltf) {
            model = gltf.scene;
            let fileAnimations = gltf.animations;
            model.traverse(o => {
              if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
              }
              if (o.isBone && o.name === 'mixamorigNeck') { 
                neck = o;
              }
              if (o.isBone && o.name === 'mixamorigLeftArm') { 
                leftHand = o;
              }
              if (o.isBone && o.name === 'mixamorigRightArm') { 
                rightHand = o;
              }
              if (o.isBone && o.name === 'mixamorigLeftShoulder') { 
                leftShoulder = o;
              }
              if (o.isBone && o.name === 'mixamorigRightShoulder') { 
                rightShoulder = o;
              }

            });
            model.scale.set(7, 7, 7);
            model.position.y = -11;
            scene.add(model);
            loaderAnim.remove();
            mixer = new THREE.AnimationMixer(model);
            // let idleAnim = THREE.AnimationClip.findByName(fileAnimations, 'idle');
            // idleAnim.tracks.splice(12, 3);
            // idleAnim.tracks.splice(27, 3);
            // idleAnim.tracks.splice(84, 3);
            // idle = mixer.clipAction(idleAnim);
            // idle.play();
        },
        undefined, // We don't need this function
        function(error) {
            console.error(error);
        }
        );

        const canvas = document.querySelector('#c');
        const backgroundColor = 0xf1f1f1;

        // Init the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        scene.fog = new THREE.Fog(backgroundColor, 60, 100);

        // Init the renderer
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);

        // Add a camera
        virtualCam = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        virtualCam.position.z = 30 
        virtualCam.position.x = 0;
        virtualCam.position.y = -3;

        // Add lights
        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
        hemiLight.position.set(0, 50, 0);
        // Add hemisphere light to scene
        scene.add(hemiLight);

        let d = 8.25;
        let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
        dirLight.position.set(-8, 12, 8);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 1500;
        dirLight.shadow.camera.left = d * -1;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = d * -1;
        // Add directional Light to scene
        scene.add(dirLight);

        // Floor
        let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
        let floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
        shininess: 0,
        });

        let floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -0.5 * Math.PI; // This is 90 degrees by the way
        floor.receiveShadow = true;
        floor.position.y = -11;
        scene.add(floor);

        let geometry = new THREE.SphereGeometry(500, 100, 100);
        let material = new THREE.MeshPhongMaterial({ color: 0xffff00,
        shininess: 90 }); // 0xf2ce2e 
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.z = -550;
        sphere.position.y = -25;
        sphere.position.x = -0.25;
        scene.add(sphere);
    }

    function update() {
        if (mixer) {
          mixer.update(clock.getDelta());
        }
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            virtualCam.aspect = canvas.clientWidth / canvas.clientHeight;
            virtualCam.updateProjectionMatrix();
        }
        renderer.render(scene, virtualCam);
        requestAnimationFrame(update);
      }
      update();

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let canvasPixelWidth = canvas.width / window.devicePixelRatio;
        let canvasPixelHeight = canvas.height / window.devicePixelRatio;
      
        const needResize =
          canvasPixelWidth !== width || canvasPixelHeight !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function moveJoint(landMark, joint, rotateZ) {
      if(rotateZ) {
        //joint.rotation.z = landMark.z-0.5;
        joint.rotation.x = landMark.y;
      }
      else{
        joint.rotation.y = landMark.x-0.5;
        joint.rotation.x = landMark.y-0.5;
      }
      
    }
