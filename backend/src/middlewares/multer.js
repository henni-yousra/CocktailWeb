import multer from "multer";

// Configurer multer pour stocker les fichiers en mémoire
const storage = multer.memoryStorage(); // Les fichiers sont stockés dans la RAM
const upload = multer({ storage });

export default upload;
