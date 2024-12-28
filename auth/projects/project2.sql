use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('Projects').insertOne({
  project_number: 2,
  project_id: 'Project2',
  project_section: [
    {
      project_section_title: 'Information',
      project_section_contents: [
        {
          project_contents_title: 'Name',
          project_contents_detail: [
            {
              project_detail_value: "GoodNeighbor",
            }
          ]
        },
        {
          project_contents_title: 'Detail',
          project_contents_detail: [
            {
              project_detail_value: "Spring Framework를 활용한 자선단체 웹사이트",
            }
          ]
        },
        {
          project_contents_title: 'Period',
          project_contents_detail: [
            {
              project_detail_value: "2023.02.20 ~ 2023.03.08",
            }
          ]
        },
        {
          project_contents_title: 'Role',
          project_contents_detail: [
            {
              project_detail_value: "총 4명 (팀원)",
            }
          ]
        },
        {
          project_contents_title: 'Git1',
          project_contents_detail: [
            {
              project_detail_value: "www.github.com/JUNGHO-GIT/GOODNEIGHBOR.git",
              project_detail_alt: "GOODNEIGHBOR.git",
            }
          ]
        },
        {
          project_contents_title: 'Url',
          project_contents_detail: [
            {
              project_detail_value: "www.junghomun.com/GOODNEIGHBOR",
              project_detail_alt: "GOODNEIGHBOR.com",
            }
          ]
        }
      ]
    },
    {
      project_section_title: 'Features',
      project_section_contents: [
        {
          project_contents_title: "Spring Framework",
          project_contents_detail: [
            {
              project_detail_value: "Spring Framework(v4.3)를 활용한 MVC model2 방식의 웹 애플리케이션 구현",
            }
          ]
        },
        {
          project_contents_title: "Template Engine",
          project_contents_detail: [
            {
              project_detail_value: "Jsp 등 다양한 언어템플릿을 활용함으로써 동적 데이터 처리기능 향상과 동시에 프론트엔드와 백엔드의 연동을 통한 개발의 효율성 증대 및 유지보수 유연성 확보",
            }
          ]
        },
        {
          project_contents_title: "MyBatis",
          project_contents_detail: [
            {
              project_detail_value: "MyBatis를 활용한 데이터베이스 연동 및 SQL Mapping",
            }
          ]
        },
        {
          project_contents_title: "Responsive Design",
          project_contents_detail: [
            {
              project_detail_value: "Bootstrap(v4)을 활용, 모바일 환경에서도 최적화된 UI/UX를 제공",
            }
          ]
        },
        {
          project_contents_title: "Cloud Instance",
          project_contents_detail: [
            {
              project_detail_value: "GCP 인스턴스의 CentOS7 환경에서 서버를 구축하고, DNS 설정을 통해 도메인과 서버를 연결",
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
            },
          ]
        },
        {
          project_contents_title: 'Framework',
          project_contents_detail: [
            {
              project_detail_icon: 'bootstrap',
              project_detail_value: 'Bootstrap'
            },
          ]
        },
        {
          project_contents_title: 'Template Engine',
          project_contents_detail: [
            {
              project_detail_icon: 'jsp',
              project_detail_value: 'Jsp'
            }
          ]
        },
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
              project_detail_icon: 'github',
              project_detail_value: 'Git'
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
              project_detail_value: 'MySql'
            }
          ]
        },
        {
          project_contents_title: "Framework",
          project_contents_detail: [
            {
              project_detail_icon: 'mybatis',
              project_detail_value: 'Mybatis'
            }
          ]
        },
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
              project_detail_icon: 'gcp',
              project_detail_value: 'GCP'
            },
            {
              project_detail_icon: 'centos',
              project_detail_value: 'Centos7'
            }
          ]
        }
      ]
    }
  ],
  project_regDt: ISODate('2024-11-29T15:59:49.714Z'),
  project_updateDt: null
});
