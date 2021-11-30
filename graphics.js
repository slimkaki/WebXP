<script type="module" 
    import * as THREE from "https://cdn.skypack.dev/three@0.134.0/build/three.module.js";
                
    // Criar nova cena
    var scene = new THREE.Scene();
    // Definir câmera perspectiva e posicionar ela
    var aspect = window.innerWidth/window.innerHeight;
    var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
    camera.position.z = 4;
    // Preparar um renderizados para a cena, com antialiasing ligado
    var renderer = new THREE.WebGLRenderer({antialias:true});
    // Configurar a cor para limpar a imagem, no caso preto
    renderer.setClearColor("#000000");
    // Configurar a janela de renderização
    renderer.setSize( window.innerWidth, window.innerHeight );
    // Adicionar o renderizador na página web
    document.body.appendChild( renderer.domElement );

    // Definir malha para o cubo e seu material
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: "#FF3232" } );
    var cube = new THREE.Mesh( geometry, material );
    // Adicionar o cubo na cena
    scene.add( cube );
    // Iniciar loop de renderização
    var render = function () {
        requestAnimationFrame( render );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // Renderizar a cena
        renderer.render(scene, camera);
    };
    render();
</script>