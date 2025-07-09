use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('Projects').insertOne({
  project_number: 6,
  project_id: 'Project6',
  project_section: [
    {
      project_section_title: 'Information',
      project_section_contents: [
        {
          project_contents_title: 'Name',
          project_contents_detail: [
            {
              project_detail_value: "WMS"
            }
          ]
        },
        {
          project_contents_title: 'Detail',
          project_contents_detail: [
            {
              project_detail_value: "Spring Framework를 활용한 창고 관리 시스템"
            }
          ]
        },
        {
          project_contents_title: 'Period',
          project_contents_detail: [
            {
              project_detail_value: "2023.10.01 - 2024.02.01"
            }
          ]
        },
        {
          project_contents_title: 'Role',
          project_contents_detail: [
            {
              project_detail_value: "총 2명 (팀원)"
            }
          ]
        },
      ]
    },
    {
      project_section_title: 'Features',
      project_section_contents: [
        {
          project_contents_title: "Spring Framework",
          project_contents_detail: [
            {
              project_detail_value: "Spring Framework를 활용한 종합 창고 및 재고관리 시스템 개발"
            }
          ]
        },
        {
          project_contents_title: "Wms",
          project_contents_detail: [
            {
              project_detail_value: "실시간 입출고 및 출하, 재고 관리, 유통 기한 관리, 재고 이력 관리 등 다양한 기능 제공"
            }
          ]
        },
        {
          project_contents_title: "MyBatis",
          project_contents_detail: [
            {
              project_detail_value: "MyBatis를 활용한 데이터베이스 연동 및 SQL Mapping"
            }
          ]
        },
        {
          project_contents_title: "Svn",
          project_contents_detail: [
            {
              project_detail_value: "Svn을 활용하여 버전 통합 관리 및 협업"
            }
          ]
        },
        {
          project_contents_title: "Responsive Design",
          project_contents_detail: [
            {
              project_detail_value: "Bootstrap(v4)을 활용, 모바일 환경에서도 최적화된 UI/UX를 제공"
            }
          ]
        }
      ]
    },
    {
      project_section_title: 'Frontend',
      project_section_contents: [
        {
          project_contents_title: 'Language',
          project_contents_detail: [
            {
              project_detail_icon: 'html',
              project_detail_value: 'Html'
            },
            {
              project_detail_icon: 'css',
              project_detail_value: 'Css'
            },
            {
              project_detail_icon: 'js',
              project_detail_value: 'Js'
            }
          ]
        },
        {
          project_contents_title: 'Framework',
          project_contents_detail: [
            {
              project_detail_icon: 'bootstrap',
              project_detail_value: 'Bootstrap'
            }
          ]
        },
        {
          project_contents_title: "Template Engine",
          project_contents_detail: [
            {
              project_detail_icon: 'jsp',
              project_detail_value: 'Jsp'
            }
          ]
        }
      ]
    },
    {
      project_section_title: 'Backend',
      project_section_contents: [
        {
          project_contents_title: 'Language',
          project_contents_detail: [
            {
              project_detail_icon: 'java',
              project_detail_value: 'Java'
            }
          ],
        },
        {
          project_contents_title: 'Framework',
          project_contents_detail: [
            {
              project_detail_icon: 'spring',
              project_detail_value: 'Spring'
            }
          ]
        },
        {
          project_contents_title: 'Package, Build, Scm',
          project_contents_detail: [
            {
              project_detail_icon: 'maven',
              project_detail_value: 'Maven'
            },
            {
              project_detail_icon: 'xml',
              project_detail_value: 'Xml'
            },
            {
              project_detail_icon: 'json',
              project_detail_value: 'Json'
            },
            {
              project_detail_icon: 'svn',
              project_detail_value: 'Svn'
            }
          ]
        }
      ]
    },
    {
      project_section_title: 'Database',
      project_section_contents: [
        {
          project_contents_title: 'DBMS',
          project_contents_detail: [
            {
              project_detail_icon: 'mysql',
              project_detail_value: 'Mysql'
            }
          ]
        },
        {
          project_contents_title: 'Framework',
          project_contents_detail: [
            {
              project_detail_icon: 'mybatis',
              project_detail_value: 'Mybatis'
            }
          ]
        }
      ]
    },
    {
      project_section_title: 'Server',
      project_section_contents: [
        {
          project_contents_title: 'Server',
          project_contents_detail: [
            {
              project_detail_icon: "tomcat",
              project_detail_value: 'Tomcat'
            }
          ]
        },
        {
          project_contents_title: 'Cloud',
          project_contents_detail: [
            {
              project_detail_icon: 'gabia',
              project_detail_value: 'Gabia'
            },
            {
              project_detail_icon: 'ubuntu',
              project_detail_value: 'Ubuntu'
            }
          ]
        }
      ]
    }
  ],
  project_regDt: ISODate('2024-11-29T15:59:49.714Z'),
  project_updateDt: null
});
