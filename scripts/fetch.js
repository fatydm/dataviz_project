import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js"; // permett de interagir avec l'objet 3D
import gsap from "gsap"; //bibliotheque JS creer des animations 

const containerEl = document.querySelector(".globe-wrapper"); //container principal du monde
const canvasEl = containerEl.querySelector("#globe-3d");// cotient canvas l'objet 3D
const svgMapDomEl = document.querySelector("#map");// le format svg
const svgCountries = Array.from(svgMapDomEl.querySelectorAll("path")); //obtient chaque pays.Array.from() convierte la NodeList en un array real para poder usar métodos como .forEach() o .map().
const svgCountryDomEl = document.querySelector("#country"); //pour selectionner le pays en question
const countryNameEl = document.querySelector(".info span"); //va monter le nombre de pays ou l'action quon veut 


let renderer, scene, camera, rayCaster, pointer, controls;
let globeGroup, globeColorMesh, globeStrokesMesh, globeSelectionOuterMesh;
// globeColorMesh: Malla para la textura de color del globo.
// globeStrokesMesh: Malla para los contornos del globo.
// globeSelectionOuterMesh: Malla para el efecto de selección al pasar sobre un país.


const svgViewBox = [2000, 1000]; //definit la taille du map SVG
const offsetY = -.1;

const params = {
    strokeColor: "#111111", //couleur du conteur
    defaultColor: "#9a9591", //couleur des pays
    hoverColor: "#008f39", // couleur quand on passe le cursor
    fogColor: "#e4e5e6",  //
    fogDistance: 2.65, // l'effet du back des pays 
    strokeWidth: 1.5, // taille de conteur des frontieres
    hiResScalingFactor: 2,
    lowResScalingFactor: .7
}


let hoveredCountryIdx = 0; //indice sobre donde esta posicionado el utilizador y equivale al pais 
let isHoverable = true; //si on peut interagir avec le monde

const textureLoader = new THREE.TextureLoader(); //texture du 3D, ici special pour SVG
let staticMapUri; //ou on va stocker URL de la texturre du monde 
const bBoxes = []; //pour detecter si le pointer est sur chaque pays
const dataUris = []; //chaque pays va avoir sa propre texture pour le click


initScene(); //va creer l'objet 3D

window.addEventListener("resize", updateSize); //represente la fentre du navigateur. cest responisve grace au resize 



containerEl.addEventListener("mousemove", (e) => { //ecoute le mouvement de la souris
    updateMousePosition(e.clientX, e.clientY); //recupere la position de la souris X, Y
});
containerEl.addEventListener("click", (e) => { //ecoute le'evenement du click
    updateMousePosition(e.clientX, e.clientY);
    const countryName = svgCountries[hoveredCountryIdx].getAttribute("data-name");
    countryNameEl.innerHTML = countryName;
    const afficherRecettes = document.getElementById ("recipes-container")
    afficherRecettes.innerHTML = "";
    const area = areas[countryName];
    if (area) {
        obtenerRecetasPorArea(area);
    } 
});

function updateMousePosition(eX, eY) { //function qui met à jour les coordonnes de la souris
    pointer.x = (eX - containerEl.offsetLeft) / containerEl.offsetWidth * 2 - 1;
    pointer.y = -((eY - containerEl.offsetTop) / containerEl.offsetHeight) * 2 + 1;
}


function initScene() { //creation d'objet
    renderer = new THREE.WebGLRenderer({canvas: canvasEl, alpha: true});
    //canvas est egal mon objet 3D et alpha est le fond 
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    //definit la resolution 

    scene = new THREE.Scene(); //creation de la scene
    scene.fog = new THREE.Fog(params.fogColor, 0, params.fogDistance);
    //ajoute un brouillard fog= color, distance du depart, distance maximale

    camera = new THREE.OrthographicCamera(-1.2, 1.2, 1.2, -1.2, 0, 3); //cration de camera
    camera.position.z = 1.3;

    globeGroup = new THREE.Group(); //creation dun groupe pour organiser plsuierus objets 3d ensemble
    scene.add(globeGroup);

    rayCaster = new THREE.Raycaster(); //creation un raycaster outil pour detecter les click et mouvements sur l'objet 3D
    rayCaster.far = 1.15;
    pointer = new THREE.Vector2(-1, -1);

    createOrbitControls(); //Active le contrôle de la caméra avec la souris (zoom, rotation).
    createGlobe(); //Fonction qui crée le globe 3D.
    prepareHiResTextures(); //Précharge les textures haute résolution
    prepareLowResTextures(); //Précharge les textures basse résolution (pour chargement rapide).
    updateSize(); //Met à jour la taille du rendu pour s’adapter à la fenêtre.

    gsap.ticker.add(render); //Utilise GSAP (GreenSock Animation Platform) pour animer le rendu.
}


function createOrbitControls() {
    controls = new OrbitControls(camera, canvasEl);
    controls.enablePan = true;  //L'utilisateur ne pourra pas déplacer la scène horizontalement ou verticalement.
    controls.enableZoom = true; //zoom
    controls.enableDamping = true; //Active l'effet de lissage pour rendre les mouvements plus fluides.
//     controls.minPolarAngle = .46 * Math.PI;  //ca nous permet de deplacer le monde de droite a gauche
//     controls.maxPolarAngle = .46 * Math.PI;
    controls.autoRotate = true;  //rotation de la camera automatique 
    controls.autoRotateSpeed *= .2; //vitesse de la rotation

    //des le moment que l'utilisateur interagi ca arrive des choses
    controls.addEventListener("start", () => {
        isHoverable = false;
        pointer = new THREE.Vector2(-1, -1);
        gsap.to(globeGroup.scale, {
            duration: .3,
            x: .9,
            y: .9,
            z: .9,
            ease: "power1.inOut"
        })
    });
    // Ce code s'exécute lorsque l'utilisateur cesse d'interagir avec les contrôles (fin du mouvement de la souris ou du touché).
    controls.addEventListener("end", () => {
        // isHoverable = true;
        gsap.to(globeGroup.scale, {
            duration: .6,
            x: 1,
            y: 1,
            z: 1,
            ease: "back(1.7).out",
            onComplete: () => {
                isHoverable = true;
            }
        })
    });
}

function createGlobe() { //  crée un globe 3D en utilisant Three.js    
    const globeGeometry = new THREE.IcosahedronGeometry(1, 20); //cree la geometry

    const globeColorMaterial = new THREE.MeshBasicMaterial({ //cree le material
        transparent: true, //transparent
        side: THREE.DoubleSide //Rend les deux faces du matériau visibles 
    });
    const globeStrokeMaterial = new THREE.MeshBasicMaterial({ //material pour le contours
        transparent: true,
        depthTest: false, //Désactive la vérification de profondeur, ce qui signifie que ce matériau sera toujours rendu devant ou derrière les autres objets,
    });
    const outerSelectionColorMaterial = new THREE.MeshBasicMaterial({ //material pour l'exterieur
        transparent: true,
        side: THREE.DoubleSide
    });

    //creation de la mesh, donc objet avec superficie tridimensional
    globeColorMesh = new THREE.Mesh(globeGeometry, globeColorMaterial); //mesh pour couleur du globe
    globeStrokesMesh = new THREE.Mesh(globeGeometry, globeStrokeMaterial); //mesh pour les contours
    globeSelectionOuterMesh = new THREE.Mesh(globeGeometry, outerSelectionColorMaterial); //mesh pour l'exteriur

    globeStrokesMesh.renderOrder = 2; // l'ordre del objet,  plus élevé signifie que l'objet sera dessiné après les autres, le plaçant donc au-dessus.

    //creation du groupe pour les manipuler ensemble
    globeGroup.add(globeStrokesMesh, globeSelectionOuterMesh, globeColorMesh); 
}

//charger texture depuis un URI 
function setMapTexture(material, URI) {
    textureLoader.load(  
        URI,//chemin de notre svg, il n'a pas de lien car l'image est codifie avec un format Base64
        (t) => { //function callback et t represente la texture
            t.repeat.set(1, 1); //repetition de la texture ici une seule fois
            material.map = t; //association de texture au materiau
            material.needsUpdate = true;
        });
}

function prepareHiResTextures() {
    let svgData;
    gsap.set(svgMapDomEl, {
        attr: {
            "viewBox": "0 " + (offsetY * svgViewBox[1]) + " " + svgViewBox[0] + " " + svgViewBox[1], //deifinit la zone visible de SVG
            "stroke-width": params.strokeWidth, //apparence d epaisseur du trace
            "stroke": params.strokeColor, //tracé
            "fill": params.defaultColor, //couelur de remplisage 
            "width": svgViewBox[0] * params.hiResScalingFactor, //modifie la taille du SVG 
            "height": svgViewBox[1] * params.hiResScalingFactor,
        }
    })
    svgData = new XMLSerializer().serializeToString(svgMapDomEl); //converti SVG en chaine de caracteres pour l'utiliser comme texture
    staticMapUri = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData); //encode les donnees SVG pour une chaine base64 pour la rendre un URI valide
    setMapTexture(globeColorMesh.material, staticMapUri); //aplique la texture SVG a l'objet

    gsap.set(svgMapDomEl, {
        attr: {
            "fill": "none", //remplisage de SVG desactive
            "stroke": params.strokeColor,
        }
    })
    svgData = new XMLSerializer().serializeToString(svgMapDomEl); //remet le SVG avec modifications
    staticMapUri = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);
    setMapTexture(globeStrokesMesh.material, staticMapUri);
    
    //met a jour le texte = pays actuel, recupere le nom du pays 
    countryNameEl.innerHTML = svgCountries[hoveredCountryIdx].getAttribute("data-name");

}

//modifique les attributs SVG et utilise GSAP = bibliotheque de animation JS
function prepareLowResTextures() {
    gsap.set(svgCountryDomEl, {
        attr: {
            "viewBox": "0 " + (offsetY * svgViewBox[1]) + " " + svgViewBox[0] + " " + svgViewBox[1],
            "stroke-width": params.strokeWidth,
            "stroke": params.strokeColor,
            "fill": params.hoverColor,
            "width": svgViewBox[0] * params.lowResScalingFactor,
            "height": svgViewBox[1] * params.lowResScalingFactor,
        }
    })
    svgCountries.forEach((path, idx) => { //il parcourt tous les elements path  et idx est l'index
        bBoxes[idx] = path.getBBox(); //il obtient les coordonnes du chaque pays
        svgCountryDomEl.innerHTML = "";
        svgCountryDomEl.appendChild(svgCountries[idx].cloneNode(true)); //clone le path et l'ajoute dans un autre container
        const svgData = new XMLSerializer().serializeToString(svgCountryDomEl); //SVG a une chaine des caractheres
        dataUris[idx] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData); //change de SVG a base64 pour l'utiliser comme une image
    })
    setMapTexture(globeSelectionOuterMesh.material, dataUris[hoveredCountryIdx]);

}


//mets a jour la carte du monde 
function updateMap(uv = {x: 0, y: 0}) {  //position par defaut
    const pointObj = svgMapDomEl.createSVGPoint(); //cree un objet pour representer un point avec le systeme des coordonnes SVG
    pointObj.x = uv.x * svgViewBox[0];
    pointObj.y = (1 + offsetY - uv.y) * svgViewBox[1];

    for (let i = 0; i < svgCountries.length; i++) {
        const boundingBox = bBoxes[i];
        if ( //delimite les pays 
                pointObj.x >= boundingBox.x &&
                pointObj.x <= boundingBox.x + boundingBox.width &&
                pointObj.y >= boundingBox.y &&
                pointObj.y <= boundingBox.y + boundingBox.height
        ) {// verifie si le pointer est à l'interieur du pays 
            const isHovering = svgCountries[i].isPointInFill(pointObj);
            if (isHovering) {
                if (i !== hoveredCountryIdx) {
                        hoveredCountryIdx = i;
                        setMapTexture(globeSelectionOuterMesh.material, dataUris[hoveredCountryIdx]);
                        const countryName = svgCountries[hoveredCountryIdx].getAttribute("data-name");
                        countryNameEl.innerHTML = countryName;
                    }
                    break;
            }
        }
    }
}

//function pour montrer le 3D
function render() {
    controls.update();
    if (isHoverable) {
        rayCaster.setFromCamera(pointer, camera);
        const intersects = rayCaster.intersectObject(globeStrokesMesh);
        if (intersects.length) {
            updateMap(intersects[0].uv);
        }
    }
    renderer.render(scene, camera);
}

//taille de l'element contentant la scene, cest a dire l'objet 
function updateSize() {
    const side = Math.min(700, Math.min(window.innerWidth, window.innerHeight) - 60);
    containerEl.style.width = side + "px";
    containerEl.style.height = side + "px";
    renderer.setSize(side, side);
}



// Correspondance entre les pays dans le SVG et les aires dans l'API
const areas = {
        "United States": "American",
        "United Kingdom": "British",
        "Canada": "Canadian",
        "China": "Chinese",
        "Croatia": "Croatian",
        "Netherlands": "Dutch",
        "Egypt": "Egyptian",
        "Philippines": "Filipino",
        "France": "French",
        "Greece": "Greek",
        "India": "Indian",
        "Ireland": "Irish",
        "Italy": "Italian",
        "Jamaica": "Jamaican",
        "Japan": "Japanese",
        "Kenya": "Kenyan",
        "Malaysia": "Malaysian",
        "Mexico": "Mexican",
        "Morocco": "Moroccan",
        "Poland": "Polish",
        "Portugal": "Portuguese",
        "Russian Federation": "Russian",
        "Spain": "Spanish",
        "Thailand": "Thai",
        "Tunisia": "Tunisian",
        "Turkey": "Turkish",
        "Ukraine": "Ukrainian",
        "Uruguay": "Uruguayan",
        "Vietnam": "Vietnamese"
    };




    // Fonction pour obtenir des recettes par aire
    async function obtenerRecetasPorArea(area) {
        console.log("Buscando recetas para:", area);
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        console.log(data.meals); // Verifica si hay datos
    
        if (data.meals) {
            
            const divRecipes = document.getElementById("recipes-container");
            const numeroRecettes = document.createElement("h2");
            numeroRecettes.textContent = `${data.meals.length} recettes pour ${area}`;
            divRecipes.appendChild(numeroRecettes);
            
            data.meals.forEach((meal) => { 
                 const recipeDiv = document.createElement("div");
                 recipeDiv.innerHTML = `
                    <img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
                    <h3 class="meal-title">${meal.strMeal}</h3>
                `
                divRecipes.appendChild(recipeDiv);
                ;
            });
            console.log(divRecipes.innerHTML); // Vérifie si le HTML est bien mis à jour
        } else {
            console.log(`Aucune recette trouvée pour la zone : ${area}`);
        }
    }
    
