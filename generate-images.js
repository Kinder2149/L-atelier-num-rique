const fs = require('fs');
const path = require('path');

// Chemins absolus pour être sûr de trouver les fichiers
const projectRoot = path.resolve(__dirname);

// Liste exhaustive de tous les chemins d'images à générer
const IMAGE_PATHS = [
  // Logos
  'img/logo.svg',
  'img/logo-white.svg',

  
  'img/hero-illustration.svg',
  'img/hero-pattern.svg',
  'img/hero-illustration.svg',
  'img/hero-pattern.svg',
  'img/contact/contact-hero.jpg',
  'img/pattern-background.svg',
  'img/placeholder-image.jpg',

  // Projets
  'img/projects/paperclip2.jpg',
  'img/projects/paperclip2-1.jpg',
  'img/projects/paperclip2-2.jpg',
  'img/projects/paperclip2-3.jpg',
  'img/projects/crypto-app.jpg',
  'img/projects/crypto-app-1.jpg',
  'img/projects/crypto-app-2.jpg',
  'img/projects/crypto-app-3.jpg',
  'img/projects/library-software.jpg',
  'img/projects/library-1.jpg',
  'img/projects/library-2.jpg',
  'img/projects/library-3.jpg',
  'img/projects/ecommerce.jpg',
  'img/projects/ecommerce-1.jpg',
  'img/projects/ecommerce-2.jpg',
  'img/projects/ecommerce-3.jpg',

  // Équipe
  'img/team/samuel.jpg',
  'img/team/valentin.jpg',
  'img/team.jpg',

  // Témoignages
  'img/testimonials/client1.jpg',
  'img/testimonials/client2.jpg',
  'img/testimonials/client3.jpg',
  'img/testimonials/client4.jpg',

  // À propos
  'img/about/history.jpg',
  'img/about/approach.jpg',

  // Services
  'img/services/mobile-app.jpg',
  'img/services/web-dev.jpg',
  'img/services/software.jpg',
  'img/services/consulting.jpg',

  // Processus
  'img/process/intro.jpg'
];

// Fonction pour créer les répertoires si nécessaire
function createDirectories() {
  const directories = new Set(IMAGE_PATHS.map(imagePath => path.join(projectRoot, path.dirname(imagePath))));
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Création du répertoire : ${dir}`);
    }
  });
}

// Fonction pour générer des images placeholder
function generatePlaceholderImage(imagePath, width = 800, height = 600) {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="20" fill="#888" 
        text-anchor="middle" alignment-baseline="middle">
        ${path.basename(imagePath)}
      </text>
    </svg>
  `;

  // Génération de placeholder SVG
  if (imagePath.endsWith('.svg')) {
    const svgLogoContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="60">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#888" 
          text-anchor="middle" alignment-baseline="middle">
          ${path.basename(imagePath, '.svg')}
        </text>
      </svg>
    `;
    fs.writeFileSync(imagePath, svgLogoContent);
  } else {
    // Ajuster la taille selon le type d'image
    if (imagePath.includes('team/') || imagePath.includes('testimonials/')) {
      width = 400;
      height = 500;
    } else if (imagePath.includes('services/') || imagePath.includes('about/')) {
      width = 600;
      height = 400;
    }

    const finalSvgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" font-family="Arial" font-size="20" fill="#888" 
          text-anchor="middle" alignment-baseline="middle">
          ${path.basename(imagePath)}
        </text>
      </svg>
    `;

    fs.writeFileSync(imagePath, finalSvgContent);
  }

  console.log(`Image générée : ${imagePath}`);
}

// Fonction principale
function generateAllImages() {
  try {
    // Créer les répertoires
    createDirectories();
    
    // Générer chaque image
    IMAGE_PATHS.forEach(relativePath => {
      const fullPath = path.join(projectRoot, relativePath);
      generatePlaceholderImage(fullPath);
    });

    console.log('Toutes les images ont été générées avec succès !');
  } catch (error) {
    console.error('Erreur lors de la génération des images :', error);
  }
}

// Lancer la génération
generateAllImages();