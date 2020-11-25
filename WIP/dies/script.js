(function() {
    
    window.launchApp = function() {
        
        /// ---------------------------
        //  INIT
        /// ---------------------------
        this.container = document.getElementById('container');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.centerX = this.width/2;
        this.centerY = this.height/2;
        this.cubeSize = 200;
        this.blockTime = 5000;
        this.TransactionsPerSecond = 2000;
        this.activeStep = 1;
        
        this.initApp = function() {            
            this.initRenderer();
            this.launchApp();
            this.initMouseEvents();
            this.animate();            
            
            // prevent animation bug when tab is inactive
            TweenLite.lagSmoothing(0);
        }
        
        this.initRenderer = function() {
            this.renderer = new THREE.WebGLRenderer({alpha: true});
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor( 0x000000, 1);
            this.renderer.sortObjects = false
            this.container.appendChild(this.renderer.domElement);

            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.Fog(0x000000, 1000, 4000);

            this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 10000);
            this.camera.position.set(0, 0, 1000);
            
            this.scene.add(this.camera);
            
            var ambientLight = new THREE.AmbientLight(0x999999, 0.8);
            this.scene.add(ambientLight);
            
            var self = this;
            
            window.addEventListener('resize', this.onWindowResize.bind(this));
        }
        
        /// ---------------------------
        //  APP
        /// ---------------------------
        
        this.launchApp = function() {
            this.cube = this.createCubeGroup();
            this.cube.rotation.y = 0.225;
            this.cube.rotation.x = 0.225;
            this.scene.add(this.cube);
        }
        
        /// ---------------------------
        //  CUBE UTILS
        /// ---------------------------
        
        this.createCubeGroup = function() {
            var cubeGroup = new THREE.Object3D();
            
            var cube = this.createCube();            
            var dataMesh = this.generateCubeData();
            
            cubeGroup.add(dataMesh);
            this.createCubeLights(cubeGroup);
            cubeGroup.add(cube);
            
            
            return cubeGroup;
        }
        
        this.createCube = function() {
            var geometry = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize);
            var material = new THREE.MeshPhongMaterial({ 
                color: 0x11111f, 
                side: THREE.DoubleSide, 
                opacity: .5,                
                transparent: true
            });
            var cube = new THREE.Mesh(geometry, material);
            cube.name = 'cubeGeometry';
            
            return cube;
        }
        
        this.createCubeLights = function(cubeGroup) {
            
            this.lights = [];
            var colors = [
              '54BE68',
              '2CB060',
              '1AA261',
              '0C8D64',
              '037868'
            ];

            for (var i = 0; i < 5; i++) {
                var color = parseInt(colors[i % colors.length], 16);
                var light = new THREE.PointLight(color, 5, 100);
                light.add(
                    new THREE.Mesh(
                        new THREE.SphereGeometry(5, 16, 8),
                        new THREE.MeshBasicMaterial({
                            color: color,
                            transparent: true,
                            alphaTest: 0.5,
                            opacity: 1
                        })
                    )
                );

                light.name = "cubeLights";
                cubeGroup.add(light);
                this.lights.push(light);
            }                
        }
        
        this.generateCubeData = function() {
            var randomTransactionsNumber = Math.floor(Math.random() * (((this.blockTime / 1000) * this.TransactionsPerSecond) - 0)) + 0;
            var transactionsNumber = randomTransactionsNumber.toString();
            
            var dataMesh = this.generateDataTexture(transactionsNumber);
            dataMesh.name = "cubeText";
            
            return dataMesh;
        }
        this.generateDataTexture = function(transactionsNumber) {
            var bitmap = document.createElement('canvas');
            var g = bitmap.getContext('2d');
            var blockNumber = Math.floor(Math.random() * Math.floor(1000));
            bitmap.width = 256;
            bitmap.height = 256;
            g.font = '20px Arial';
            g.fillStyle = 'white';
            g.fillText('Block: ' + blockNumber.toString(), this.cubeSize * 0.1, this.cubeSize * 0.4);
            g.fillText('Transactions: ' + transactionsNumber.toString(), this.cubeSize * 0.1, this.cubeSize * 0.55);
            g.fillText('---------------', this.cubeSize * 0.1, this.cubeSize * 0.7);
            g.fillText('EVERYTIME   YOU', this.cubeSize * 0.1, this.cubeSize * 0.85);
            g.fillText('DONT      SMESH', this.cubeSize * 0.1, this.cubeSize * 1.0);
            g.fillText('A UNICORN  DIES', this.cubeSize * 0.1, this.cubeSize * 1.15);

            var geometry = new THREE.PlaneGeometry(this.cubeSize * 0.9, this.cubeSize * 0.9);
            var texture = new THREE.CanvasTexture(bitmap);
            var material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                color: 0xffffff,
                opacity: 1,
                depthWrite: false,
                reflectivity: 100
            });
            
            var dataMesh = new THREE.Mesh(geometry, material);
            dataMesh.position.set(0, 0, this.cubeSize / 4);

            return dataMesh;
        }
        
        /// ---------------------------
        //  UTILS
        /// ---------------------------
        
        this.onWindowResize = function(self) {            
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.centerX = this.width/2;
            this.centerY = this.height/2;
            
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(this.width, this.height);
        }
        
        this.animate = function(now) {
            requestAnimationFrame(this.animate.bind(this));

            if (this.cube && this.rotationX && this.rotationY) {
                this.cube.rotation.y += (this.rotationX - this.cube.rotation.y) * 0.05;
                this.cube.rotation.x += (this.rotationY - this.cube.rotation.x) * 0.05;
            }
            
            if (this.lights) {                
                this.lights[0].position.y = Math.cos((now * (1 * 0.5 + 1)) * 0.001) * 160;
                this.lights[0].position.x = Math.sin((now * (1 * 0.5 + 1)) * 0.001) * 160;
                this.lights[0].position.z = Math.sin((now * (1 * 0.5 + 1)) * 0.001) * 160;
                this.lights[1].position.y = Math.sin((now * (1.2 * 0.5 + 1)) * 0.001) * 160;
                this.lights[1].position.x = Math.sin((now * (1.2 * 0.5 + 1)) * 0.001) * 160;
                this.lights[1].position.z = Math.cos((now * (1.2 * 0.5 + 1)) * 0.001) * 160;
                this.lights[2].position.y = Math.sin((now * (1.4 * 0.5 + 1)) * 0.001) * 160;
                this.lights[2].position.x = Math.cos((now * (1.4 * 0.5 + 1)) * 0.001) * 160;
                this.lights[2].position.z = Math.sin((now * (1.4 * 0.5 + 1)) * 0.001) * 160;
                this.lights[3].position.y = Math.cos((now * (1.6 * 0.5 + 1)) * 0.001) * 160;
                this.lights[3].position.x = Math.cos((now * (1.6 * 0.5 + 1)) * 0.001) * 160;
                this.lights[3].position.z = Math.sin((now * (1.6 * 0.5 + 1)) * 0.001) * 160;
                this.lights[4].position.y = Math.sin((now * (1.8 * 0.5 + 1)) * 0.001) * 160;
                this.lights[4].position.x = Math.cos((now * (1.8 * 0.5 + 1)) * 0.001) * 160;
                this.lights[4].position.z = Math.cos((now * (1.8 * 0.5 + 1)) * 0.001) * 160;
            }

            this.renderer.render(this.scene, this.camera);            
        }
        
        this.findMouseCoords = function(event) {
            if (event) {
                //FireFox
                this.mouseX = event.pageX - document.body.scrollLeft;
                this.mouseY = event.pageY - document.body.scrollTop;
            } else {
                //IE
                this.mouseX = window.event.x + 2;
                this.mouseY = window.event.y + 2;
            }

            var diffX = this.mouseX - this.centerX;
            var diffY = this.mouseY - this.centerY;
            var percentX = diffX / this.centerX;
            var percentY = diffY / this.centerY;

            this.rotationX = percentX/2;
            this.rotationY = percentY/2;
        }
        this.findMouseCoords = this.findMouseCoords.bind(this)
        
        this.initMouseEvents = function() {
            this.container.addEventListener("mousemove", this.findMouseCoords);
        }
        this.stopMouseEvents = function() {
            this.container.removeEventListener("mousemove", this.findMouseCoords);
        }
        
        
        /// ---------------------------
        //  START
        /// ---------------------------
        this.initApp(); 
    };
    
    document.addEventListener("DOMContentLoaded", function() {
        this.app = new launchApp();
    });

})();