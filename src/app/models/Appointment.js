import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.STRING,
        canceled_at: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.USER, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.USER, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}

export default Appointment;
