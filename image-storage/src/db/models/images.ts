import {
    Sequelize,
    Model,
    DataTypes,
    Optional,
  } from "sequelize";
const sequelize = new Sequelize(process.env['DATABASE_URL'] as string);


interface ImageAttributes {
    id : number;
    src : string;
}

interface ImageCreationAttributes extends Optional<ImageAttributes,'id'> {};

class Image extends Model<ImageAttributes,ImageCreationAttributes> implements ImageAttributes {
    public id!: number;
    public src! : string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date; 
}

Image.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      src: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: "files",
      sequelize, // passing the `sequelize` instance is required
    }
);

export default Image;