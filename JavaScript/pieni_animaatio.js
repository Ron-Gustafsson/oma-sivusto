console.log("Aurinko nousee vuorien takaa ja alkaa sädehtimään valoa vihreälle niitylle. Pilvet liikkuvat edestakaisin taivaalla.");

// Tämä koodi suoritetaan kun dokumentti on ladattu
document.addEventListener('DOMContentLoaded', function() {
    // Hakee canvas-elementin HTML-dokumentista sen id:n perusteella
    const canvas = document.getElementById("canvaasi");
    // Hakee 2D-piirtoalueen kontekstin canvas-elementistä
    const ctx = canvas.getContext("2d");

    /**
    * Piirtää canvasin taustalle värillisen suorakulmion
    * Tämä funktio kutsutaan ennen muiden elementtien piirtämistä
    */
    function drawBackground() {
        // Asettaa täyttöväriksi vaaleansinisen (Day Sky Blue)
        ctx.fillStyle = '#82CAFF';
        // Piirtää täytetyn suorakulmion koko canvas-alueelle
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    

    // Piirretään vihreä niitty
    function drawNiitty() {
        const niittyHeight = 200; // Niityn korkeus
        ctx.fillStyle = '#437C17'; // Seaweed Green
        ctx.fillRect(0, canvas.height - niittyHeight, canvas.width, niittyHeight);     

        // Määrittele puun sijaintiin liittyvät muuttujat
        const trees = [
            { x: 100, y: canvas.height - 250 },
            { x: 250, y: canvas.height - 180 },
            { x: 550, y: canvas.height - 250 },
            { x: 700, y: canvas.height - 210 }
        ];

        trees.forEach(tree => {
            ctx.fillStyle = '#966F33'; // Wood väri puun rungolle
            ctx.fillRect(tree.x, tree.y, 30, 120); // Runko
            ctx.beginPath();
            ctx.arc(tree.x + 15, tree.y - 20, 50, 0, Math.PI * 2); // Ympyrä (pensas)
            ctx.fillStyle = '#228B22'; // Vihreä väri yläosalle (lehdet)
            ctx.fill();
        });
    }

    // Määrittele pilvien sijaintiin liittyvät muuttujat ja ominaisuudet
    const clouds = [
        { x: 50, y: 50, width: 150, height: 30, speed: 0.6 },
        { x: 200, y: 140, width: 150, height: 40, speed: 0.7 },
        { x: 400, y: 100, width: 200, height: 35, speed: 1.0 },
        { x: 600, y: 70, width: 150, height: 25, speed: 1.2 }
    ];

    // Piirretään pilvet bezier-käyrien avulla
    function drawClouds() {
        clouds.forEach(cloud => {
            ctx.beginPath();
            ctx.moveTo(cloud.x + cloud.width / 2, cloud.y);
            ctx.bezierCurveTo(
                cloud.x, cloud.y + cloud.height / 2,
                cloud.x, cloud.y + cloud.height,
                cloud.x + cloud.width / 2, cloud.y + cloud.height
            );
            ctx.bezierCurveTo(
                cloud.x + cloud.width, cloud.y + cloud.height,
                cloud.x + cloud.width, cloud.y + cloud.height / 2,
                cloud.x + cloud.width / 2, cloud.y
            );
            ctx.closePath();
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();

            // Päivitä pilven sijainti x-akselilla ja tarkista reunat
            cloud.x += cloud.speed;
            if (cloud.x > canvas.width) {
                cloud.x = -cloud.width; // Aseta takaisin vasemmalle laidalle
            }
        });
    }

    let sunY = canvas.height; // Auringon aloituskorkeus
    const sunRadius = 80; // Auringon säde
    const sunSpeed = 1.5; // Auringon liikkumisnopeus
    const sunLowPoint = canvas.height - 100; // Määritä alin kohta, jossa aurinko käy
    const sunHighPoint = 30; // Määritä korkein kohta, jossa aurinko käy
    let isSunRising = true; // Auringon suunta

    // Piirretään aurinko
    function drawSun() {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }

    // Piirretään vuoret
    function drawMountains() {
        ctx.fillStyle = '#837E7C';
        
        const mountainBaseY = canvas.height - 200; // Vuoren perusta niityllä

        // Ensimmäinen vuori
        ctx.beginPath();
        ctx.moveTo(0, mountainBaseY); // Alkuperusta niityn yläpuolella
        ctx.lineTo(200, mountainBaseY - 370); // Vuoren huippu
        ctx.lineTo(400, mountainBaseY); // Loppuperusta niityn yläpuolella
        ctx.fill();

        // Toinen vuori
        ctx.beginPath();
        ctx.moveTo(400, mountainBaseY); // Alkuperusta niityn yläpuolella
        ctx.lineTo(600, mountainBaseY - 300); // Vuoren huippu
        ctx.lineTo(800, mountainBaseY); // Loppuperusta niityn yläpuolella
        ctx.fill();
    }

    // Mörrimöykyn liikkeeseen liittyvät muuttujat
    let mörrimöykkyX = 300;
    let mörrimöykkyY = canvas.height - 180;
    const mörrimöykkySpeed = 2;
    let isMovingUp = false;
    let isMovingRight = true;

    // Piirretään Mörrimöykky
    function drawMörrimöykky(x, y) {
        // Mörrimöykyn vartalo (suorakulmio)
        ctx.fillStyle = '#8B4513'; // Ruskea väri #8B4513
        ctx.fillRect(x + 10, y + 50, 60, 80); // Vartalo

        // Mörrimöykyn jalat (kaksi jalkaa)
        ctx.fillRect(x + 20, y + 130, 15, 30); // Vasen takajalka
        ctx.fillRect(x + 45, y + 130, 15, 30); // Oikea takajalka

        // Mörrimöykyn kädet
        ctx.beginPath();
        ctx.moveTo(x + 9, y + 50); // Vasen käsi alku
        ctx.lineTo(x - 20, y + 20); // Vasen käsi ylös
        ctx.lineTo(x - 8, y + 20); // Vasen käsi leveys
        ctx.closePath();
        ctx.fillStyle = '#8B4513'; // Ruskea väri
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x + 71, y + 50); // Oikea käsi alku
        ctx.lineTo(x + 90, y + 20); // Oikea käsi ylös
        ctx.lineTo(x + 80, y + 20); // Oikea käsi leveys
        ctx.closePath();
        ctx.fillStyle = '#8B4513'; // Ruskea väri
        ctx.fill();

        // Mörrimöykyn pää
        ctx.beginPath();
        ctx.arc(x + 40, y + 30, 20, 0, Math.PI * 2); // Pään ympyrä
        ctx.fillStyle = '#8B4513'; // Ruskea väri
        ctx.fill();

        // Korvat
        ctx.beginPath();
        ctx.moveTo(x + 30, y + 5); // Korvan alku
        ctx.lineTo(x + 10, y + 30); // Korvan yläosa
        ctx.lineTo(x + 30, y + 30); // Korvan loppu
        ctx.closePath();
        ctx.fillStyle = '#8B4513'; // Ruskea väri
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x + 50, y + 5); // Korvan alku
        ctx.lineTo(x + 70, y + 30); // Korvan yläosa
        ctx.lineTo(x + 50, y + 30); // Korvan loppu
        ctx.closePath();
        ctx.fillStyle = '#8B4513'; // Ruskea väri
        ctx.fill();

        // Silmät (mustat ympyrät)
        ctx.beginPath();
        ctx.arc(x + 30, y + 20, 5, 0, Math.PI * 2); // Vasen silmä
        ctx.arc(x + 50, y + 20, 5, 0, Math.PI * 2); // Oikea silmä
        ctx.fillStyle = 'black'; // Musta väri
        ctx.fill();

        // Mörrimöykyn nenä
        ctx.beginPath();
        ctx.moveTo(x + 25, y + 30); // Siirretty lähemmäksi silmiä
        ctx.lineTo(x + 42, y + 25); // Muokattu nenän leveyttä
        ctx.lineTo(x + 40, y + 30); // Yläosan korkeuden muokkaus
        ctx.closePath();
        ctx.fillStyle = '#FF6347'; // Tomaatin väri
        ctx.fill();

        // Kieli (iso punainen)
        ctx.beginPath();
        ctx.moveTo(x + 35, y + 40);
        ctx.lineTo(x + 45, y + 40);
        ctx.lineTo(x + 40, y + 58);
        ctx.closePath();
        ctx.fillStyle = 'red'; // Punainen väri
        ctx.fill();
    }

    // Animoidaan
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Tyhjennä canvas
        // Kutsuu drawBackground-funktion, jotta tausta piirretään ennen muiden elementtien piirtämistä
        drawBackground();

        drawSun(); // Piirrä aurinko
        drawMountains(); // Piirrä vuoret 
        drawNiitty(); // Piirretään niitty
        drawClouds(); // Piirrä pilvet
        drawMörrimöykky(mörrimöykkyX, mörrimöykkyY); // Piirrä Mörrimöykky sijaintiin (x, y)

        // Päivitetään Mörrimöykyn sijainti
        if (isMovingUp) {
            mörrimöykkyY -= mörrimöykkySpeed;
            if (mörrimöykkyY <= canvas.height - 300) {
                isMovingUp = false;
            }
        } else {
            mörrimöykkyY += mörrimöykkySpeed;
            if (mörrimöykkyY >= canvas.height - 180) {
                isMovingUp = true;
            }
        }

        if (isMovingRight) {
            mörrimöykkyX += mörrimöykkySpeed;
            if (mörrimöykkyX >= canvas.width - 60) {
                isMovingRight = false;
            }
        } else {
            mörrimöykkyX -= mörrimöykkySpeed;
            if (mörrimöykkyX <= 0) {
                isMovingRight = true;
            }
        }

        // Päivitetään auringon sijainti
        if (isSunRising) {
            sunY -= sunSpeed; // Aurinko nousee
        } else {
            sunY += sunSpeed; // Aurinko laskee
        }

        // Muutetaan suunta kun aurinko saavuttaa rajan
        if (sunY <= sunHighPoint) { // Auringon korkein kohta
            isSunRising = false;
        } else if (sunY >= sunLowPoint) { // Auringon alin kohta
            isSunRising = true;
        }

        requestAnimationFrame(animate); // Pyyntö seuraavalle animaatiokehitykselle
    }

    // Käynnistetään animaatio napin painalluksella
    document.getElementById("käynnistäNappula").addEventListener("click", function() {
        animate();
        this.style.display = "none"; // Piilotetaan nappi kun animaatio käynnistyy
    });
});
