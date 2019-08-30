"use strict";

jQuery(function($) {
    $.fn.Wiresphere3DAnim = function(Config) {
        var It = $(this);
        var Settings = {
            particleColor: 0xffffff,
            particleOpacity: .5,
            particleSize: 5,
            particlesAmmount: 750,
            lineColor: 0xffffff,
            lineOpacity: 0.5,
            backlineOpacity: 0.05,
            moveSpeed: 0.07,
            cameraXMoveMax: 1.5,
            cameraYMoveMax: 0.75,
            cameraXMoveElastic: 0.02,
            cameraYMoveElastic: 0.02
        }


        Settings = $.extend(true, Settings, Config);
        var mouseX = 0,
            mouseY = 0,
            windowHalfX = $(this).innerWidth() / 2,
            windowHalfY = $(this).innerHeight() / 2,
            camera, scene, renderer;

        init();
        animate();

        var line;

        function init() {
            var container, color = 0xffffff,
                particles, particle;

            container = It[0];
            camera = new THREE.PerspectiveCamera(75, $(It).innerWidth() / $(It).innerHeight(), 1, 10000);
            camera.position.z = 100;
            camera.position.x = 2000;

            scene = new THREE.Scene();

            renderer = new THREE.CanvasRenderer({
                alpha: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0xffffff, 0);
            renderer.setSize($(It).innerWidth(), $(It).innerHeight());
            container.appendChild(renderer.domElement);
			
            var PI2 = Math.PI * 2;
            var geometry = new THREE.Geometry();

            for (var i = 0; i < Settings.particlesAmmount; i++) {
                var material = new THREE.SpriteCanvasMaterial({
                    color: Settings.particleColor,
                    opacity: Math.random() * 0.5,
                    program: function(context) {
                        context.beginPath();
                        context.arc(0, 0, 0.2, 0, PI2, true);
                        context.fill();
                    }
                });
                particle = new THREE.Sprite(material);
                particle.position.x = Math.random() * 2 - 1;
                particle.position.y = Math.random() * 2 - 1;
                particle.position.z = Math.random() * 2 - 1;
                if (Math.random() > 0.5) {
                    particle.position.xT = true;
                } else {
                    particle.position.xT = false;
                }
                if (Math.random() > 0.5) {
                    particle.position.yT = true;
                } else {
                    particle.position.yT = false;
                }
                if (Math.random() > 0.5) {
                    particle.position.zT = true;
                } else {
                    particle.position.zT = false;
                }
                particle.position.normalize();
                particle.position.multiplyScalar(Math.random() * 10 + 500);
                particle.scale.x = particle.scale.y = Settings.particleSize;

                scene.add(particle);

                geometry.vertices.push(particle.position);

            }

            line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: Settings.lineColor,
                opacity: 0
            }));
            scene.add(line);

			var Cgeometry, Cmaterial, Cmesh; 
			
            Cgeometry = new THREE.IcosahedronGeometry(50, 1);
            Cmaterial = new THREE.MeshBasicMaterial({
                color: Settings.lineColor,
                opacity: Settings.lineOpacity,
                wireframe: true,
                wireframeLinewidth: 1.5,
                side: THREE.FrontSide
            });
            Cmesh = new THREE.Mesh(Cgeometry, Cmaterial);
            scene.add(Cmesh);

            Cmaterial = new THREE.MeshBasicMaterial({
                color: Settings.lineColor,
                opacity: Settings.backlineOpacity,
                wireframe: true,
                wireframeLinewidth: 1,
                side: THREE.BackSide
            });
            Cmesh = new THREE.Mesh(Cgeometry, Cmaterial);
            scene.add(Cmesh);


            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener('touchstart', onDocumentTouchStart, false);
            document.addEventListener('touchmove', onDocumentTouchMove, false);


            window.addEventListener('resize', onWindowResize, false);

        }

        function onWindowResize() {
            windowHalfX = $(this).innerWidth() / 2;
            windowHalfY = $(this).innerHeight() / 2;

            camera.aspect = $(It).innerWidth() / $(It).innerHeight();
            camera.updateProjectionMatrix();

            renderer.setSize($(It).innerWidth(), $(It).innerHeight());

        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) * 0.05;
            mouseY = (event.clientY - windowHalfY) * 0.2;
        }

        function onDocumentTouchStart(event) {
            if (event.touches.length > 1) {
                mouseX = (event.touches[0].pageX - windowHalfX) * 0.7;
                mouseY = (event.touches[0].pageY - windowHalfY) * 0.7;
            }
        }
        function onDocumentTouchMove(event) {
            if (event.touches.length == 1) {
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
            }
        }

        function animate() {
            if (Settings.moveSpeed > 0) {
                for (var i = 0; i < Settings.particlesAmmount; i++) {
                    if (line.geometry.vertices[i].xT) {
                        line.geometry.vertices[i].x -= Settings.moveSpeed;
                    } else {
                        line.geometry.vertices[i].x += Settings.moveSpeed;
                    }

                    if (line.geometry.vertices[i].yT) {
                        line.geometry.vertices[i].y -= Settings.moveSpeed;
                    } else {
                        line.geometry.vertices[i].y += Settings.moveSpeed;
                    }
                    if (line.geometry.vertices[i].zT) {
                        line.geometry.vertices[i].z -= Settings.moveSpeed;
                    } else {
                        line.geometry.vertices[i].z += Settings.moveSpeed;
                    }


                    if (line.geometry.vertices[i].x < -500) {
                        line.geometry.vertices[i].xT = false;
                    }
                    if (line.geometry.vertices[i].y < -500) {
                        line.geometry.vertices[i].yT = false;
                    }
                    if (line.geometry.vertices[i].z < -500) {
                        line.geometry.vertices[i].zT = false;
                    }

                    if (line.geometry.vertices[i].x > 500) {
                        line.geometry.vertices[i].xT = true;
                    }
                    if (line.geometry.vertices[i].y > 500) {
                        line.geometry.vertices[i].yT = true;
                    }
                    if (line.geometry.vertices[i].z > 500) {
                        line.geometry.vertices[i].zT = true;
                    }
                }
            }

            requestAnimationFrame(animate);
            render();

        }

        function render() {
            camera.position.x += (mouseX * Settings.cameraXMoveMax - camera.position.x) * Settings.cameraXMoveElastic;
            camera.position.y += (-mouseY * Settings.cameraYMoveMax - camera.position.y) * Settings.cameraYMoveElastic;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);

        }
    }

});