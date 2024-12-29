use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('Projects').insertOne({
  project_number: 4,
  project_id: 'Project4',
  project_section: [
    {
      project_section_title: 'Information',
      project_section_contents: [
        {
          project_contents_title: 'Name',
          project_contents_detail: [
            {
              project_detail_value: "JLINT",
            }
          ]
        },
        {
          project_contents_title: 'Detail',
          project_contents_detail: [
            {
              project_detail_value: "NodeJs & TypeScript를 활용한 Vscode Extension",
            }
          ]
        },
        {
          project_contents_title: 'Period',
          project_contents_detail: [
            {
              project_detail_value: "2023.05.05 - 2023.06.05",
            }
          ]
        },
        {
          project_contents_title: 'Role',
          project_contents_detail: [
            {
              project_detail_value: "총 1명 (개인)",
            }
          ]
        },
        {
          project_contents_title: 'Git1',
          project_contents_detail: [
            {
              project_detail_value: "www.github.com/JUNGHO-GIT/JLINT.git",
              project_detail_alt: "JLINT.git",
            }
          ]
        },
        {
          project_contents_title: 'Url',
          project_contents_detail: [
            {
              project_detail_value: "marketplace.visualstudio.com/items?itemName=JUNGHO.JLINT",
              project_detail_alt: "Vscode Marketplace",
            }
          ]
        }
      ]
    },
    {
      project_section_title: 'Features',
      project_section_contents: [
        {
          project_contents_title: "NodeJs & TypeScript",
          project_contents_detail: [
            {
              project_detail_value: "NodeJs(v16)를 통한 프로젝트 생성 및 빌드, 주 언어로 Typescript 사용",
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
          project_contents_title: "Npm Package",
          project_contents_detail: [
            {
              project_detail_value: "Npm을 이용해 'prettier, lodash, cheerio, mocha, ts-node' 등의 패키지를 활용하여 개발 확장성 및 효율성 확보",
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
          project_contents_title: "Language Formatting",
          project_contents_detail: [
            {
              project_detail_value: "10가지 이상의 다양한 언어를 지원하며, 각 언어별로 린팅, 코딩 스타일 설정, Indent 최적화, 코드 자동 정렬 등의 기능을 제공하여 코드의 일관성 유지 및 코드 품질 향상",
            }
          ]
        },
        {
          project_contents_title: "Vscode Api",
          project_contents_detail: [
            {
              project_detail_value: "Vscode Api를 통해 제작 및 빌드한 확장 프로그램을 Marketplace에 배포하여 제공함으로써 실제 프로젝트에 적용 가능한 실용적인 프로그램 제작",
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
              project_detail_icon: 'markdown',
              project_detail_value: 'Markdown'
            },
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
              project_detail_icon: 'nodejs',
              project_detail_value: 'Nodejs'
            },
            {
              project_detail_icon: 'js',
              project_detail_value: 'Js'
            },
            {
              project_detail_icon: 'ts',
              project_detail_value: 'Ts'
            }
          ],
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
      project_section_title: 'Api',
      project_section_contents: [
        {
          project_contents_title: 'api',
          project_contents_detail: [
            {
              project_detail_icon: 'vscode',
              project_detail_value: 'Vscode'
            }
          ]
        },
      ]
    },
  ],
  project_regDt: ISODate('2024-11-29T15:59:49.714Z'),
  project_updateDt: null
});
