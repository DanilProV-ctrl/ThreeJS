window.onload = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.getElementById('canvas')
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    var ball = {
        rotationY: 0.001,
        rotationX: 0,
        rotationZ: 0,
        positionY: 0,
        positionX: 0,
        positionZ: 0
    };
    var gui = new dat.gui.GUI();
    gui.add(ball, 'rotationY').min(-0.01).max(0.01).step(0.001);
    gui.add(ball, 'rotationX').min(-0.01).max(0.01).step(0.001);
    gui.add(ball, 'rotationZ').min(-0.01).max(0.01).step(0.001);
    gui.add(ball, 'positionY').min(-2).max(2).step(0.1);
    gui.add(ball, 'positionX').min(-2).max(2).step(0.1);
    gui.add(ball, 'positionZ').min(-2).max(2).step(0.1)
    var renderer = new THREE.WebGLRenderer({ canvas: canvas });
    var scene = new THREE.Scene();

    var starsGeo = new THREE.Geometry();
    var starsMat = new THREE.ParticleBasicMaterial({ color: 0xffffff, size: 1, sizeAttenuation: false });
    var stars;
    for (var i = 0; i < 5000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2 - 1
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar(7000);
        starsGeo.vertices.push(vertex);
    }
    stars = new THREE.ParticleSystem(starsGeo, starsMat);
    scene.add(stars);
    var camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100000);
    camera.position.z = 1000;
    camera.position.x = 0;
    var light = new THREE.SpotLight();
    light.castShadow = true;
    light.position.set(0, 0, 1000);
    scene.add(light);
    var geometry = new THREE.SphereGeometry(200, 60, 60);
    var loader = new THREE.TextureLoader();
    var material = new THREE.MeshLambertMaterial({ map: loader.load('https://lh5.googleusercontent.com/-Ochc8HOY8uE/URDsSk9NZ9I/AAAAAAAAA0E/eoV5-EU7Xuk/s1024/earthmap1k.jpg'), });

    /*for (var i = 0; i < geometry.faces.length; i++) {
        geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    }*/

    var Mesh = new THREE.Mesh(geometry, material);
    Mesh.castShadow = true;
    Mesh.reactiveShadow = true;
    scene.add(Mesh);
    var y = 0;

    document.addEventListener('mousemove', function(event) {
        y = parseInt(event.offsetY);
    })

    function loop() {
        Mesh.rotation.y += ball.rotationY;
        Mesh.rotation.x += ball.rotationX;
        Mesh.rotation.z += ball.rotationZ;
        Mesh.position.y += ball.positionY;
        Mesh.position.x += ball.positionX;
        Mesh.position.z += ball.positionZ;
        camera.position.y = y * 0.5;
        camera.lookAt(Mesh.position);
        renderer.mapShadowEnabled = true;
        requestAnimationFrame(function() { loop(); });
        renderer.render(scene, camera);
    }
    loop();
}