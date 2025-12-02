const { Sequelize, DataTypes } = require('sequelize');
const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_NAME = 'pimdb',
  DB_USER = 'root',
  DB_PASS = ''
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false
});

// Materia model
const Materia = sequelize.define('Materia', {
  nome: { type: DataTypes.STRING, allowNull: false },
  professor: { type: DataTypes.STRING, allowNull: true }
}, { tableName: 'materias', timestamps: true });

// Nota model
const Nota = sequelize.define('Nota', {
  materiaId: { type: DataTypes.INTEGER, allowNull: false },
  alunoId: { type: DataTypes.STRING, allowNull: false },
  np1: { type: DataTypes.FLOAT, allowNull: true },
  np2: { type: DataTypes.FLOAT, allowNull: true },
  pim: { type: DataTypes.FLOAT, allowNull: true },
  media: { type: DataTypes.FLOAT, allowNull: true }
}, { tableName: 'notas', timestamps: true });

// Associations
Materia.hasMany(Nota, { foreignKey: 'materiaId' });
Nota.belongsTo(Materia, { foreignKey: 'materiaId' });

module.exports = { sequelize, Materia, Nota };
