const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserTeams = async (req, res) => {
  const { userId } = req.params; // Suponiendo que userId se pasa como parámetro en la URL
  try {
    // Buscar el usuario en la base de datos
    const user = await prisma.users.findUnique({
      where: {
        userId: parseInt(userId)
      },
      include: {
        user_teams: {
          include: {
            teams: true // Incluir los detalles de los equipos relacionados
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Extraer los equipos del usuario, incluyendo solo el nombre del equipo y el código
    const teams = user.user_teams.map(userTeam => {
      return {
        teamName: userTeam.teams.teamName,
        code: userTeam.teams.code // Asegúrate de que se incluye el código del equipo
      };
    });

    res.status(200).json({ teams });
  } catch (error) {
    console.error('Error al obtener los equipos del usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


const generateCode = async () => {
  let code;
  let existingCode = null; // Define existingCode fuera del bucle do-while
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  do {
    code = '';
    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // Verifica si el código ya existe
    existingCode = await prisma.teams.findFirst({
      where: {
        code: code
      }
    });
  } while (existingCode); // Repite el bucle si el código ya existe
  return code;
};



const createTeam = async (req, res) => {
  const { teamName, userId } = req.body;

  try {
    // Verifica si ya existe un equipo con ese nombre
    const existingTeam = await prisma.teams.findFirst({
      where: {
        teamName: teamName
      }
    });

    if (existingTeam) {
      return res.status(409).json({ error: 'Ya existe un equipo con ese nombre.' });
    }

    // Genera un código único para el nuevo equipo
    const code = await generateCode();

    // Crea un nuevo equipo si no existe uno con ese nombre
    const newTeam = await prisma.teams.create({
      data: {
        teamName,
        code // Añadir el código generado aquí
      }
    });

    // Agrega el usuario al equipo en la tabla user_teams
    const newUserTeam = await prisma.user_teams.create({
      data: {
        userId: userId,
        teamId: newTeam.teamId
      }
    });

    res.status(201).json({ team: newTeam, userTeam: newUserTeam });
  } catch (error) {
    console.error('Error al crear el equipo y agregar el usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  getUserTeams,
  createTeam
};