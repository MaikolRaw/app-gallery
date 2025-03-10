const Photo = require('../models/photo');

exports.uploadPhoto = async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    // Obtén el userId del token decodificado
    const userId = req.user.userId;
    const newPhoto = new Photo({
      userId,  
      imageBase64
    });
    await newPhoto.save();
    return res.status(201).json({
      msg: 'Foto guardada en la base de datos',
      photoId: newPhoto._id
    });
  } catch (error) {
    console.error('Error al guardar foto:', error);
    return res.status(500).json({ msg: 'Error al guardar foto' });
  }
};

exports.getPhotos = async (req, res) => {
  try {
    // Filtra las fotos por el userId obtenido del token
    const photos = await Photo.find({ userId: req.user.userId });
    return res.json(photos);
  } catch (error) {
    console.error('Error al obtener fotos:', error);
    return res.status(500).json({ msg: 'Error al obtener fotos' });
  }
};
