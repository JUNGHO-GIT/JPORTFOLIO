use('JPORTFOLIO');

// Create a new document in the collection.
db.getCollection('Skills').insertOne({
  skills_title: 'Skills',
  skills_section: [
    {
      skills_section_img: "front",
      skills_section_value: "Front",
      skills_section_sub: [
        {
          skills_section_sub_icon: "html",
          skills_section_sub_value: "HTML"
        },
        {
          skills_section_sub_icon: "css",
          skills_section_sub_value: "CSS"
        },
        {
          skills_section_sub_icon: "bootstrap",
          skills_section_sub_value: "Bootstrap"
        },
        {
          skills_section_sub_icon: "js",
          skills_section_sub_value: "Js"
        },
        {
          skills_section_sub_icon: "ts",
          skills_section_sub_value: "Ts"
        },
        {
          skills_section_sub_icon: "react",
          skills_section_sub_value: "React"
        },
        {
          skills_section_sub_icon: "jsp",
          skills_section_sub_value: "JSP"
        },
        {
          skills_section_sub_icon: "thymeleaf",
          skills_section_sub_value: "Thymeleaf"
        }
      ]
    },
    {
      skills_section_img: "back",
      skills_section_value: "Back",
      skills_section_sub: [
        {
          skills_section_sub_icon: "java",
          skills_section_sub_value: "Java"
        },
        {
          skills_section_sub_icon: "spring",
          skills_section_sub_value: "Spring"
        },
        {
          skills_section_sub_icon: "boot",
          skills_section_sub_value: "Boot"
        },
        {
          skills_section_sub_icon: "nodejs",
          skills_section_sub_value: "NodeJs"
        },
        {
          skills_section_sub_icon: "express",
          skills_section_sub_value: "Express"
        },
        {
          skills_section_sub_icon: "webpack",
          skills_section_sub_value: "Webpack"
        },
        {
          skills_section_sub_icon: "rn",
          skills_section_sub_value: "ReactNative"
        }
      ]
    },
    {
      skills_section_img: "data",
      skills_section_value: "Data",
      skills_section_sub: [
        {
          skills_section_sub_icon: "github",
          skills_section_sub_value: "Git",
        },
        {
          skills_section_sub_icon: "svn",
          skills_section_sub_value: "SVN",
        },
        {
          skills_section_sub_icon: "npm",
          skills_section_sub_value: "Npm",
        },
        {
          skills_section_sub_icon: "maven",
          skills_section_sub_value: "Maven",
        },
        {
          skills_section_sub_icon: "gradle",
          skills_section_sub_value: "Gradle",
        }
      ]
    },
    {
      skills_section_img: "db",
      skills_section_value: "DB",
      skills_section_sub: [
        {
          skills_section_sub_icon: "mongodb",
          skills_section_sub_value: "MongoDb",
        },
        {
          skills_section_sub_icon: "mysql",
          skills_section_sub_value: "MySql",
        },
        {
          skills_section_sub_icon: "mariadb",
          skills_section_sub_value: "Maria",
        },
        {
          skills_section_sub_icon: "oracle",
          skills_section_sub_value: "Oracle",
        }
      ]
    },
    {
      skills_section_img: "system",
      skills_section_value: "System",
      skills_section_sub: [
        {
          skills_section_sub_icon: "windows",
          skills_section_sub_value: "Windows",
        },
        {
          skills_section_sub_icon: "android",
          skills_section_sub_value: "Android",
        },
        {
          skills_section_sub_icon: "linux",
          skills_section_sub_value: "Linux",
        },
        {
          skills_section_sub_icon: "centos",
          skills_section_sub_value: "Centos",
        },
        {
          skills_section_sub_icon: "ubuntu",
          skills_section_sub_value: "Ubuntu",
        }
      ]
    },
    {
      skills_section_img: "cloud",
      skills_section_value: "Cloud & Server",
      skills_section_sub: [
        {
          skills_section_sub_icon: "tomcat",
          skills_section_sub_value: "Tomcat",
        },
        {
          skills_section_sub_icon: "apache",
          skills_section_sub_value: "Apache",
        },
        {
          skills_section_sub_icon: "nginx",
          skills_section_sub_value: "Nginx",
        },
        {
          skills_section_sub_icon: "gcp",
          skills_section_sub_value: "GCP",
        },
        {
          skills_section_sub_icon: "azure",
          skills_section_sub_value: "Azure",
        },
      ]
    }
  ],

  skills_regDt: ISODate('2024-11-29T15:59:49.714Z'),
  skills_updateDt: null
});
