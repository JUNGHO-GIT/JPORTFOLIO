use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('Projects').insertOne({
  project_number: 5,
  project_id: 'Project5',
  project_section: [
    {
      project_section_title: 'Information',
      project_section_contents: [
        {
          project_contents_title: 'Name',
          project_contents_detail: [
            {
              project_detail_value: "Jportfolio"
            }
          ]
        },
        {
          project_contents_title: 'Detail',
          project_contents_detail: [
            {
              project_detail_value: "React Framework 를 활용한 개인 포트폴리오 웹사이트",
            }
          ]
        },
        {
          project_contents_title: 'Period',
          project_contents_detail: [
            {
              project_detail_value: "2023.04.26 - 2023.05.23",
            }
          ]
        },
        {
          project_contents_title: 'Role',
          project_contents_detail: [
            {
              project_detail_value: "총 1명 (개인)"
            }
          ]
        },
        {
          project_contents_title: 'Git1',
          project_contents_detail: [
            {
              project_detail_value: "www.github.com/JUNGHO-GIT/JPORTFOLIO.git",
              project_detail_alt: "JPORTFOLIO.git"
            }
          ]
        },
        {
          project_contents_title: 'Url',
          project_contents_detail: [
            {
              project_detail_value: "www.junghomun.com/JPORTFOLIO",
              project_detail_alt: "JPORTFOLIO.com"
            }
          ]
        }
      ]
    },
    {
      project_section_title: 'Features',
      project_section_contents: [
        {
          project_contents_title: "React Framework",
          project_contents_detail: [
            {
              project_detail_value: "React(v18)를 활용, SPA 방식의 종합 포트폴리오 웹사이트 제작",
            }
          ]
        },
        {
          project_contents_title: "Hooks & Router",
          project_contents_detail: [
            {
              project_detail_value: "React Hooks와 React Router를 활용하여 효율적 상태 관리와 동적 라우팅을 구현",
            }
          ]
        },
        {
          project_contents_title: "Component",
          project_contents_detail: [
            {
              project_detail_value: "컴포넌트 기반의 구조 설계를 통한 효율적인 상태 관리 및 코드 재사용성 확보",
            }
          ]
        },
        {
          project_contents_title: "Nginx Server",
          project_contents_detail: [
            {
              project_detail_value: "Nginx 서버를 활용하여 정적 파일 제공 및 리버스 프록시 서버 구축",
            }
          ]
        },
        {
          project_contents_title: "Responsive Design",
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
            {
              project_detail_icon: 'ts',
              project_detail_value: 'Ts'
            }
          ]
        },
        {
          project_contents_title: 'Framework',
          project_contents_detail: [
            {
              project_detail_icon: 'react',
              project_detail_value: 'React'
            },
            {
              project_detail_icon: 'mui',
              project_detail_value: 'MaterialUI'
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
              project_detail_icon: 'nodejs',
              project_detail_value: 'Nodejs'
            }
          ],
        },
        {
          project_contents_title: 'Framework',
          project_contents_detail: [
            {
              project_detail_icon: 'webpack',
              project_detail_value: 'Webpack'
            },
            {
              project_detail_icon: 'express',
              project_detail_value: 'Express'
            }
          ]
        },
        {
          project_contents_title: 'Package, Build, Scm',
          project_contents_detail: [
            {
              project_detail_icon: 'npm',
              project_detail_value: 'Npm'
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
              project_detail_icon: 'mongodb',
              project_detail_value: 'MongoDB'
            }
          ]
        },
        {
          project_contents_title: 'ORM',
          project_contents_detail: [
            {
              project_detail_icon: 'mongoose',
              project_detail_value: 'Mongoose'
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
              project_detail_icon: "nginx",
              project_detail_value: "Nginx"
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
