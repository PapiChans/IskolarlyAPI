'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResearchDetails extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'research_user',
        onDelete: 'RESTRICT',
    })
    }
  }
  ResearchDetails.init(
    {
    research_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: {
            args: 4,
            msg: '[users].[user_id] value must be a UUIDV4 type',
        },
      },
    },
    research_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    research_author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    research_abstract: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    research_date_accomplished: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    research_adviser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    research_program: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    research_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    research_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
      validate: {
        isIn: {
            args: [['Approved', 'Rejected', 'Pending', 'Deleted']],
            msg: 'Status should be Approved, Rejected or Pending only',
        },
    },
    },
    research_checked_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    research_remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'ResearchDetails',
    tableName: 'Research_Details',
  }
)
  return ResearchDetails
}