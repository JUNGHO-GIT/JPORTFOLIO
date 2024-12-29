use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('Projects').insertOne({
  project_number: 3,
  project_id: 'Project3',
  project_section: [
    {
      project_section_title: 'Information',
      project_section_contents: [
        {
          project_contents_title: 'Name',
          project_contents_detail: [
            {
              project_detail_value: "JUNGHQLO",
            }
          ]
        },
        {
          project_contents_title: 'Detail',
          project_contents_detail: [
            {
              project_detail_value: "SpringBoot를 활용한 종합 남성의류 쇼핑몰 사이트",
            }
          ]
        },
        {
          project_contents_title: 'Period',
          project_contents_detail: [
            {
              project_detail_value: "2023.03.24 - 2023.05.01",
            }
          ]
        },
        {
          project_contents_title: 'Role',
          project_contents_detail: [
            {
              project_detail_value: "총 4명 (팀장)",
            }
          ]
        },
        {
          project_contents_title: 'Git1',
          project_contents_detail: [
            {
              project_detail_value: "www.github.com/JUNGHO-GIT/JUNGHQLO.git",
              project_detail_alt: "JUNGHQLO.git",
            }
          ]
        },
        {
          project_contents_title: 'Url',
          project_contents_detail: [
            {
              project_detail_value: "www.junghomun.com/JUNGHQLO",
              project_detail_alt: "JUNGHQLO.com"
            }
          ]
        }
      ]
    },
    {
      project_section_title: 'Features',
      project_section_contents: [
        {
          project_contents_title: "Spring Boot",
          project_contents_detail: [
            {
              project_detail_value: "Spring Boot(v2.7)를 활용한 MVC 아키텍쳐 위주의 개발을 통해 코드구조화 실현 및 유지보수성 향상",
            }
          ]
        },
        {
          project_contents_title: "Template Engine",
          project_contents_detail: [
            {
              project_detail_value: "Thymeleaf, Jsp 등 다양한 언어템플릿을 활용함으로써 동적 데이터 처리기능 향상과 동시에 프론트엔드와 백엔드의 연동을 통한 개발의 효율성 증대 및 유지보수 유연성 확보",
            }
          ]
        },
        {
          project_contents_title: "Stripe",
          project_contents_detail: [
            {
              project_detail_value: "Stripe Api를 활용하여 결제시스템을 구축, 실제 결제가 가능한 상품 구매 기능을 구현",
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
              project_detail_icon: 'thymeleaf',
              project_detail_value: 'Thymeleaf'
            },
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
              project_detail_value: 'Java'
            }
          ],
        },
        {
          project_contents_title: 'Framework',
          project_contents_detail: [
            {
              project_detail_icon: 'boot',
              project_detail_value: 'Spring Boot'
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
