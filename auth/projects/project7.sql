use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('Projects').insertOne({
  project_number: 7,
  project_id: 'Project7',
  project_section: [
    {
      project_section_title: 'Information',
      project_section_contents: [
        {
          project_contents_title: 'Name',
          project_contents_detail: [
            {
              project_detail_value: "파주개성면옥"
            }
          ]
        },
        {
          project_contents_title: 'Detail',
          project_contents_detail: [
            {
              project_detail_value: "React Framework를 활용한 메밀음식 전문점 홈페이지",
            }
          ]
        },
        {
          project_contents_title: 'Period',
          project_contents_detail: [
            {
              project_detail_value: "2024.07.01 - 2024.09.15",
            }
          ]
        },
        {
          project_contents_title: 'Role',
          project_contents_detail: [
            {
              project_detail_value: '총 1명 (개인)'
            }
          ]
        },
        {
          project_contents_title: 'Git1',
          project_contents_detail: [
            {
              project_detail_alt: "PAJUKAESONG.git",
              project_detail_value: "www.github.com/JUNGHO-GIT/PAJUKAESONG.git",
            }
          ]
        },
        {
          project_contents_title: 'Url',
          project_contents_detail: [
            {
              project_detail_alt: "파주개성면옥.com",
              project_detail_value: "www.파주개성면옥.com",
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
              project_detail_value: "React(v18)를 활용, SPA 방식의 종합 메밀음식 전문점 홈페이지 제작",
            }
          ]
        },
        {
          project_contents_title: "Order & Reservation",
          project_contents_detail: [
            {
              project_detail_value: "특정 날짜와 시간으로 예약 주문을 할 수 있는 기능을 구현하고, 관리자 페이지에서 주문 내역을 확인할 수 있도록 구성"
            }
          ]
        },
        {
          project_contents_title: "MaterialUI",
          project_contents_detail: [
            {
              project_detail_value: "MaterialUI를 활용하여 반응형 웹 디자인 및 컴포넌트 제작, 모바일 환경 최적화",
            }
          ]
        },
        {
          project_contents_title: 'Nginx Server',
          project_contents_detail: [
            {
              project_detail_value: 'Nginx 서버를 활용하여 정적 파일 제공 및 리버스 프록시 서버 구축'
            }
          ]
        },
        {
          project_contents_title: 'Cloud Instance',
          project_contents_detail: [
            {
              project_detail_value: 'GCP 인스턴스의 CentOS7 환경에서 서버를 구축하고, DNS 설정을 통해 도메인과 서버를 연결'
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
              project_detail_icon: 'ts',
              project_detail_value: 'Ts'
            },
            {
              project_detail_icon: 'nodejs',
              project_detail_value: 'Nodejs'
            },
            {
              project_detail_icon: 'express',
              project_detail_value: 'Express'
            },
            {
              project_detail_icon: 'webpack',
              project_detail_value: 'Webpack'
            }
          ]
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
              project_detail_icon: 'nginx',
              project_detail_value: 'Nginx'
            }
          ]
        },
        {
          project_contents_title: 'Cloud',
          project_contents_detail: [
            {
              project_detail_icon: 'gcp',
              project_detail_value: 'Gcp'
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
