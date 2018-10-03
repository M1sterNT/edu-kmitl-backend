'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'users',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                username: {
                    type: Sequelize.STRING,
                    unique: true
                },
                password: {
                    type: Sequelize.STRING
                },
                firstname: {
                    type: Sequelize.STRING
                },
                lastname: {
                    type: Sequelize.STRING
                },
                image: {
                    type: Sequelize.STRING
                },
                gender: {
                    type: Sequelize.STRING
                },
                birthday: {
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
    },

    down: function (queryInterface, Sequelize) {
      queryInterface.dropTable('users')
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.dropTable('users');
         */
    }

};
