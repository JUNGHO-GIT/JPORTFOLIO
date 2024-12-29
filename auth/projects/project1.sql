use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('Projects').insertOne({
  project_number: 1,
  project_id: 'Project1',
  project_section: [
    {
      project_section_title: 'Information',
      project_section_contents: [
        {
          project_contents_title: 'Name',
          project_contents_detail: [
            {
              project_detail_value: "MeatStore",
            }
          ]
        },
        {
          project_contents_title: 'Detail',
          project_contents_detail: [
            {
              project_detail_value: "Mvc 모델2 방식을 활용한 종합 육류 판매 사이트",
            }
          ]
        },
        {
          project_contents_title: 'Period',
          project_contents_detail: [
            {
              project_detail_value: "2023.01.18 - 2023.02.03",
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
              project_detail_value: "www.github.com/JUNGHO-GIT/MEATSTORE.git",
              project_detail_alt: "MEATSTORE.git",
            }
          ]
        },
        {
          project_contents_title: 'Url',
          project_contents_detail: [
            {
              project_detail_value: "www.junghomun.com/MEATSTORE",
              project_detail_alt: "MEATSTORE.com",
            }
          ]
        }
      ]
    },
    {
      project_section_title: 'Features',
      project_section_contents: [
        {
          project_contents_title: "Java & Mvc",
          project_contents_detail: [
            {
              project_detail_value: "Java와 Mvc2 패턴을 기반으로, Controller, Model 및 View를 분리하여 개발",
            }
          ]
        },
        {
          project_contents_title: "Jsp",
          project_contents_detail: [
            {
              project_detail_value: "EL(Expression Language)와 JSTL(JSP Standard Tag Library)를 사용하여 코드의 가독성 및 확장성 증대",
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
          project_contents_title: "MySql",
          project_contents_detail: [
            {
              project_detail_value: "MySQL을 활용하여 데이터베이스의 무결성을 유지하고, 정규화를 진행하여 데이터의 중복을 최소화",
            }
          ]
        },
        {
          project_contents_title: "Servlet Container",
          project_contents_detail: [
            {
              project_detail_value: "GCP 인스턴스의 CentOS7 환경에서 서버를 구축하고, Tomcat을 사용하여 웹 애플리케이션을 배포",
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
