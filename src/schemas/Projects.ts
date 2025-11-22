// Projects.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
declare type ProjectsType = mongoose.Document & {
  project_number: number;
  project_id: string;
  project_section: any[];
  project_regDt: Date;
  project_updateDt: Date;
}

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    project_number : {
      type : Number,
      default: 1,
      unique : true
    },

    project_id: {
      type: String,
      default: "",
      required: false
    },

    project_section: [
      {
        project_section_title: {
          type: String,
          default: "",
          required: false
        },
        project_section_contents: [
          {
            project_contents_title: {
              type: String,
              default: "",
              required: false
            },
            project_contents_detail: [
              {
                project_detail_icon: {
                  type: String,
                  default: "",
                  required: false
                },
                project_detail_value: {
                  type: String,
                  default: "",
                  required: false
                },
                project_detail_alt: {
                  type: String,
                  default: "",
                  required: false
                },
              }
            ]
          }
        ]
      }
    ],

    project_regDt: {
      type: Date,
      default: Date.now,
      required: false
    },
    project_updateDt: {
      type: Date,
      default: Date.now,
      required: false
    }
  },
  {
    collection: "projects",
    timestamps: {
      createdAt: "project_regDt",
      updatedAt: "project_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre<ProjectsType>("save", async function() {
  if (this.isNew) {
    this.project_number = await incrementSeq("project_number", "projects");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const Projects = mongoose.model<ProjectsType>("projects", schema);