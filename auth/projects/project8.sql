use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('Projects').insertOne({
  project_number: 8,
  project_id: 'Project8',
  project_section: [
    {
      project_section_title: 'Information',
      project_section_contents: [
        {
          project_contents_title: 'Name',
          project_contents_detail: [
            {
              project_detail_value: "LifeChange"
            }
          ]
        },
        {
          project_contents_title: 'Detail',
          project_contents_detail: [
            {
              project_detail_value: "ReactNative 및 React를 활용한 생활 관리 하이브리드 앱",
            }
          ]
        },
        {
          project_contents_title: 'Period',
          project_contents_detail: [
            {
              project_detail_value: "2024.05.05 - 2024.10.23",
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
              project_detail_value: "www.github.com/JUNGHO-GIT/LIFECHANGE.git",
              project_detail_alt: "LIFECHANGE.git",
            }
          ]
        },
        {
          project_contents_title: 'Git2',
          project_contents_detail: [
            {
              project_detail_value: "www.github.com/JUNGHO-GIT/LIFECHANGE_RN.git",
              project_detail_alt: "LIFECHANGE_RN.git",
            }
          ]
        },
        {
          project_contents_title: 'Url',
          project_contents_detail: [
            {
              project_detail_value: "play.google.com/store/apps/details?id=com.LIFECHANGE&hl=ko",
              project_detail_alt: "Google Play",
            }
          ]
        }
      ]
    },
    {
      project_section_title: 'Features',
      project_section_contents: [
        {
          project_contents_title: "React Native",
          project_contents_detail: [
            {
              project_detail_value: "ReactNative(v0.74)를 활용하여 iOS 및 Android 플랫폼 지원 하이브리드 앱 구현",
            }
          ]
        },
        {
          project_contents_title: "Android Widget",
          project_contents_detail: [
            {
              project_detail_value: "네이티브 모듈을 활용하여 Android 홈 화면 위젯 제작 및 실시간 데이터 연동",
            }
          ]
        },
        {
          project_contents_title: "Admob",
          project_contents_detail: [
            {
              project_detail_value: "Admob를 연동하여 앱 내 광고 수익 창출 및 사용자 피드백 수집",
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
              project_detail_icon: 'rn',
              project_detail_value: 'ReactNative'
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
            },
            {
              project_detail_icon: 'ts',
              project_detail_value: 'Ts'
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
