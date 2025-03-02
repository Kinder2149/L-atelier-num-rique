const fs = require('fs');
const path = require('path');

// Chemins absolus pour être sûr de trouver les fichiers
const projectRoot = path.resolve(__dirname);

// Fonction pour extraire les chemins d'images de tous les HTML
function extractImagePaths() {
  const htmlFiles = [
    'index.html', 
    'about.html', 
    'services.html', 
    'portfolio.html', 
    'process.html', 
    'contact.html'
  ];

  const imagePaths = new Set();

  htmlFiles.forEach(file => {
    const fullPath = path.join(projectRoot, file);
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const imageMatches = content.match(/src="([^"]+)"/g) || [];
      
      imageMatches.forEach(match => {
        const imagePath = match.replace(/src="/, '').replace(/"$/, '');
        if (imagePath.endsWith('.jpg') || imagePath.endsWith('.png') || imagePath.endsWith('.svg')) {
          imagePaths.add(path.join(projectRoot, imagePath));
        }
      });
    } catch (error) {
      console.error(`Erreur lors de la lecture de ${file}: ${error.message}`);
    }
  });

  return Array.from(imagePaths);
}

// Fonction pour créer les répertoires si nécessaire
function createDirectories(imagePaths) {
  const directories = new Set(imagePaths.map(path.dirname));
  
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

  // Assurer que le répertoire existe
  const directory = path.dirname(imagePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(imagePath, svgContent);
  console.log(`Image générée : ${imagePath}`);
}

// Fonction principale
function generateAllImages() {
  try {
    const imagePaths = extractImagePaths();
    
    createDirectories(imagePaths);
    
    imagePaths.forEach(imagePath => {
      // Génération de tailles différentes selon le type d'image
      if (imagePath.includes('projects/')) {
        generatePlaceholderImage(imagePath, 800, 600);  // Grande taille pour projets
      } else if (imagePath.includes('team/') || imagePath.includes('testimonials/')) {
        generatePlaceholderImage(imagePath, 400, 500);  // Taille de portrait
      } else if (imagePath.includes('services/') || imagePath.includes('about/')) {
        generatePlaceholderImage(imagePath, 600, 400);  // Taille moyenne
      } else if (imagePath.endsWith('.svg')) {
        // Pour les SVG, générer un SVG minimal
        const svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="60">
            <text x="10" y="40" font-family="Arial" font-size="20">
              ${path.basename(imagePath, '.svg')}
            </text>
          </svg>
        `;
        fs.writeFileSync(imagePath, svgContent);
      } else {
        generatePlaceholderImage(imagePath);  // Taille par défaut
      }
    });

    console.log('Toutes les images ont été générées avec succès !');
  } catch (error) {
    console.error('Erreur lors de la génération des images :', error);
  }
}

// Lancer la génération
generateAllImages();