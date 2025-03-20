import './style.css'
import * as THREE from 'three';

export const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    //la manera que vamos a ver el objeto
    const renderer = new THREE.WebGLRenderer({ 
        canvas : document.querySelector('#bg')
    });
    

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.set(0, 0, 50);


    renderer.render(scene, camera)

    const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
    const material = new THREE.MeshBasicMaterial( { color: 0x3D85C6, wireframe: true } ); 
    const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );

    //una funcion para que me digamos al browser que queremos hacer 
    // una animacion y nos evita de llamarla a cada rato
    function animate() {
        requestAnimationFrame (animate);

        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.005;
        sphere.rotation.z += 0.01;

        renderer.render(scene, camera)
    }

    animate()


// Evento de redimensionamiento
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);