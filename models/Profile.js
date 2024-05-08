module.exports = (sequelize, DataTypes) => sequelize.define('Profile', {
    name: DataTypes.STRING,
    connections: DataTypes.INTEGER,
    location: DataTypes.STRING,
    followers: DataTypes.INTEGER,
    bio: DataTypes.STRING,
});
