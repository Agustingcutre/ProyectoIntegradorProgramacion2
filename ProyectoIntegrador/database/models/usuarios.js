module.exports = (sequelize, DataTypes) => {
	const usuarios = sequelize.define(
		// 1. Nombre del Modelo
		'usuarios',
		// 2. Columnas del modelo
		{
			id: DataTypes.INTEGER,
			nombreCompleto: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			fechaNacimiento: DataTypes.DATE,
		},
		// 3. Configuraciones adicionales
		{
			tableName: "usuarios",
			timestamps: false,
		}
	);

	return usuarios;
}