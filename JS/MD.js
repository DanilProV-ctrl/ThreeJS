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
    renderer.setClearColor(0x000000);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 5000);
    camera.position.set(0, 0, 1000);
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

    function loop() {
        Mesh.rotation.y += ball.rotationY;
        Mesh.rotation.x += ball.rotationX;
        Mesh.rotation.z += ball.rotationZ;
        Mesh.position.y += ball.positionY;
        Mesh.position.x += ball.positionX;
        Mesh.position.z += ball.positionZ;
        renderer.render(scene, camera);
        renderer.mapShadowEnabled = true;
        requestAnimationFrame(function() { loop(); });
    }
    loop();
}