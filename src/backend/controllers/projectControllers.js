const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getFatherDirectories = async (req, res) => {
    const { teamId } = req.params;
    try {
        
        const directories = await prisma.directories.findMany({
            where: {
                teamId: parseInt(teamId),
                directoryFather: null 
            }
        });

        if (directories.length === 0) {
            return res.status(404).json({ error: 'No se encontraron directorios padre para el equipo especificado' });
        }

        res.status(200).json(directories);
    } catch (error) {
        console.error('Error al obtener los directorios padre del equipo:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const deleteDirectory = async (req, res) => {
  const { directoryId } = req.params;
  const id = parseInt(directoryId);

  try {
    // Intenta eliminar el directorio directamente
    await prisma.directories.delete({
      where: {
          directoryId: id,
      }
    });

    res.status(200).json({ message: 'Directorio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar directorio:', error);
    if (error.code === 'P2003') {
      return res.status(409).json({ error: 'No se puede eliminar el directorio porque tiene registros dependientes.' });
    }
    res.status(500).json({ error: 'Error del servidor' });
  }
};

  

module.exports = {
    getFatherDirectories,
    deleteDirectory
};
