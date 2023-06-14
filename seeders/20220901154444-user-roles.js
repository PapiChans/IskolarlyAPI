'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('UserRoles', [
            {
                user_id: 'a224e56e-69dd-4608-b873-588e629ec6d4',
                role_id: '084b9fd9-05ba-4e19-b733-2c5dabc5c9ff',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: 'adf95bf0-9e28-4752-8fe1-d86e8593a544',
                role_id: 'd679ec16-2589-47f2-9b04-06f422b18c6d',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: 'f7b9b71a-490c-412b-bfd0-055aabe0a5b2',
                role_id: '641cac7a-2706-4e4c-b8a3-2c01e08bf147',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: 'f7b9b71a-490c-412b-bfd0-055aabe0a5b2',
                role_id: 'd679ec16-2589-47f2-9b04-06f422b18c6d',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {},
}
