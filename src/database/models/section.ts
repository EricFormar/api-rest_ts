import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

interface SectionAttributes{

  id: number;
  name: string;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Section extends Model<SectionAttributes> implements SectionAttributes {
  
  public id!: number;
  public name!: string;
  
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

Section.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    }, 
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connection,
    modelName: 'Section',
  }
);

// associates

export default Section;