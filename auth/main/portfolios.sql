use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('Portfolios').insertOne({
  portfolios_title: 'Portfolios',
  portfolios_section: [
    {
      portfolios_section_id: "8",
      portfolios_section_name: "LIFECHANGE",
      portfolios_section_desc: "Lifestyle Record Android App",
      portfolios_section_icon: "rn",
      portfolios_section_img: "project8_1",
    },
    {
      portfolios_section_id: "7",
      portfolios_section_name: "파주개성면옥",
      portfolios_section_desc: "Restaurant Website",
      portfolios_section_icon: "react",
      portfolios_section_img: "project7_1",
    },
    {
      portfolios_section_id: "6",
      portfolios_section_name: "WMS",
      portfolios_section_desc: "Warehouse Management System",
      portfolios_section_icon: "spring",
      portfolios_section_img: "project6_1",
    },
    {
      portfolios_section_id: "5",
      portfolios_section_name: "Jportfolio",
      portfolios_section_desc: "Portfolio Page with React",
      portfolios_section_icon: "react",
      portfolios_section_img: "project5_1",
    },
    {
      portfolios_section_id: "4",
      portfolios_section_name: "JLINT",
      portfolios_section_desc: "Vscode Language Formatter Extension",
      portfolios_section_icon: "nodejs",
      portfolios_section_img: "project4_1",
    },
    {
      portfolios_section_id: "3",
      portfolios_section_name: "JUNGHQLO",
      portfolios_section_desc: "Online Clothing Shopping Store",
      portfolios_section_icon: "boot",
      portfolios_section_img: "project3_1",
    },
    {
      portfolios_section_id: "2",
      portfolios_section_name: "GoodNeighbor",
      portfolios_section_desc: "Charity and Donation Website",
      portfolios_section_icon: "spring",
      portfolios_section_img: "project2_1",
    },
    {
      portfolios_section_id: "1",
      portfolios_section_name: "MeatStore",
      portfolios_section_desc: "Online Meat Shopping Store",
      portfolios_section_icon: "spring",
      portfolios_section_img: "project1_1",
    }
  ],

  portfolios_regDt: ISODate('2024-11-29T15:59:49.714Z'),
  portfolios_updateDt: null
});
