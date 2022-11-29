import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class MatchesModels extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModels.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      key: 'id',
      model: 'Team',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      key: 'id',
      model: 'Team',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'MatchesModels',
  tableName: 'matches',
  timestamps: false,
});

TeamsModel.hasMany(MatchesModels, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

TeamsModel.hasMany(MatchesModels, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

MatchesModels.belongsTo(TeamsModel, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
MatchesModels.belongsTo(TeamsModel, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default MatchesModels;
