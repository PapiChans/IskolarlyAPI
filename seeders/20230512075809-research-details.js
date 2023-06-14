'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Research_Details', [
			{
				research_id: '6c2b6c6f-57a1-41bc-8ec6-ca0a3d818415',
				user_id: '0229d6d6-6eb7-4c41-b236-1ec50ae011c5',
				research_title: 'Iskolarly',
				research_author: 'Mejela Gojol',
        research_abstract: 'Lorem Ipsum....',
        research_date_accomplished: '2022-01-01',
        research_adviser: 'Advisers Name',
        research_program: 'BSIT',
        research_type: 'Copyrighted',
        research_status: 'Approved',
				created_at: new Date(),
				updated_at: new Date(),
			},
      {
				research_id: 'b650ca7b-c5f2-4194-a585-6976c2224532',
				user_id: '0229d6d6-6eb7-4c41-b236-1ec50ae011c5',
				research_title: 'Iskolarly',
				research_author: 'Mejela Gojol',
        research_abstract: 'Lorem Ipsum....',
        research_date_accomplished: '2022-01-02',
        research_adviser: 'Advisers Name',
        research_program: 'BSIT',
        research_type: 'Copyrighted',
        research_status: 'Approved',
				created_at: new Date(),
				updated_at: new Date(),
			},
      {
				research_id: 'd2ba6f75-8f12-4af4-a3b1-b7b400b67e75',
				user_id: '176925fb-605b-4ceb-b0e8-edf178a96d9f',
				research_title: 'Iskolarly',
				research_author: 'Mejela Gojol',
        research_abstract: 'Lorem Ipsum....',
        research_date_accomplished: '2022-01-03',
        research_adviser: 'Advisers Name',
        research_program: 'BSIT',
        research_type: 'Copyrighted',
        research_status: 'Approved',
				created_at: new Date(),
				updated_at: new Date(),
			},
      {
				research_id: 'e23336ee-08db-489c-93e9-db00c7d235a9',
				user_id: '0c0ea07c-ded1-4c43-8df3-acc3dd4afec7',
				research_title: 'Iskolarly',
				research_author: 'Mejela Gojol',
        research_abstract: 'Lorem Ipsum....',
        research_date_accomplished: '2022-01-04',
        research_adviser: 'Advisers Name',
        research_program: 'BSIT',
        research_type: 'Copyrighted',
        research_status: 'Pending',
				created_at: new Date(),
				updated_at: new Date(),
			},
      {
				research_id: 'e23436ee-08db-489c-93e9-db00c7d235a9',
				user_id: 'a224e56e-69dd-4608-b873-588e629ec6d4',
				research_title: 'Research number 5',
				research_author: 'Leslie Felipe',
        research_abstract: 'Lorem Ipsum....',
        research_date_accomplished: '2022-01-05',
        research_adviser: 'Advisers Name',
        research_program: 'BSIT',
        research_type: 'Copyrighted',
        research_status: 'Pending',
				created_at: new Date(),
				updated_at: new Date(),
			},
      {
				research_id: 'f23436ee-08db-489c-93e9-db00c7d235a9',
				user_id: 'a224e56e-69dd-4608-b873-588e629ec6d4',
				research_title: 'Research number 6',
				research_author: 'Leslie Felipe',
        research_abstract: 'Lorem Ipsum....',
        research_date_accomplished: '2022-01-06',
        research_adviser: 'Advisers Name',
        research_program: 'BSIT',
        research_type: 'Copyrighted',
        research_status: 'Pending',
				created_at: new Date(),
				updated_at: new Date(),
			},
      {
				research_id: '623436ee-08db-489c-93e9-db00c7d235a9',
				user_id: 'a224e56e-69dd-4608-b873-588e629ec6d4',
				research_title: 'Research number 7',
				research_author: 'Christian Altiche',
        research_abstract: 'Lorem Ipsum....',
        research_date_accomplished: '2022-01-07',
        research_adviser: 'Advisers Name',
        research_program: 'BSIT',
        research_type: 'Copyrighted',
        research_status: 'Pending',
				created_at: new Date(),
				updated_at: new Date(),
			},
      {
				research_id: 'c83436ee-08db-489c-93e9-db00c7d235a9',
				user_id: 'a224e56e-69dd-4608-b873-588e629ec6d4',
				research_title: 'Research number 8',
				research_author: 'Mejela Gojol',
        research_abstract: 'Lorem Ipsum....',
        research_date_accomplished: '2022-01-08',
        research_adviser: 'Advisers Name',
        research_program: 'BSIT',
        research_type: 'Copyrighted',
        research_status: 'Deleted',
				created_at: new Date(),
				updated_at: new Date(),
			},
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
