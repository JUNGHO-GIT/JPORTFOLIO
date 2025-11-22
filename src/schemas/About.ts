// About.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
declare type AboutType = mongoose.Document & {
  about_number: number;
  about_title: string;
  about_sub: string;
  about_section: any[];
  about_regDt: Date;
  about_updateDt: Date;
}

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    about_number : {
      type : Number,
      default: 1,
      unique : true
    },

    about_title: {
      type: String,
      default: "",
      required: false
    },
    about_sub: {
      type: String,
      default: "",
      required: false
    },
    about_section: [
      {
        about_section_title: {
          type: String,
          default: "",
          required: false
        },
        about_section_value: {
          type: String,
          default: "",
          required: false
        }
      }
    ],

    about_regDt: {
      type: Date,
      default: Date.now,
      required: false
    },
    about_updateDt: {
      type: Date,
      default: Date.now,
      required: false
    }
  },
  {
    collection: "About",
    timestamps: {
      createdAt: "about_regDt",
      updatedAt: "about_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre<AboutType>("save", async function() {
  if (this.isNew) {
    this.about_number = await incrementSeq("about_number", "About");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const About = mongoose.model<AboutType>("About", schema);