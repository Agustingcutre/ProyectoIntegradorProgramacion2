module.exports = (sequelize, DataTypes) => {
	const resenas = sequelize.define(
		// 1. Nombre del Modelo
		'resenas',
		// 2. Columnas del modelo
		{
			ID: DataTypes.INTEGER,
			peliculaID: DataTypes.INTEGER,
			usuarioID: DataTypes.INTEGER,
            fechaDeCreacion: DataTypes.DATE,
            fechaDeActualizacion: DataTypes.DATE,
			puntaje: DataTypes.INTEGER,
		},
		// 3. Configuraciones adicionales
		{
			tableName: "resenas",
			timestamps: false,
		}
	);

	return resenas;
}