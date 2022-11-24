import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

export default class TeamsModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'TeamsModel',
  tableName: 'teams',
  underscored: true,
});
