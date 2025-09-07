use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('About').insertOne({
  about_title: 'About',
  about_sub: "FullStack Developer",
  about_section: [
    {
      about_section_title: 'Name',
      about_section_value: '문정호'
    },
    {
      about_section_title: 'Birth',
      about_section_value: "1996.09.14",
    },
    {
      about_section_title: 'Email',
      about_section_value: "junghomun@gmail.com",
    },
    {
      about_section_title: 'Git',
      about_section_value: "github.com/JUNGHO-GIT"
    }
  ],

  about_regDt: ISODate('2024-11-29T15:59:49.714Z'),
  about_updateDt: null
});
