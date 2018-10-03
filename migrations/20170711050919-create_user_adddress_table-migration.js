'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
        'user_addresss',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            address: {
                type: Sequelize.STRING
            },
            sub_district: {
                type: Sequelize.STRING
            },
            district: {
                type: Sequelize.STRING
            },
            provinc: {
                type: Sequelize.STRING
            },
            created_at: {
                type: Sequelize.DATE
            },
            updated_at: {
                type: Sequelize.DATE
            },

        },
        {}
    )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.dropTable('user_addresss')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
