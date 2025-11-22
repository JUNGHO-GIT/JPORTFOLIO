// Counter.ts

import mongoose from "mongoose";

// -------------------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    seq_collection: {
      type: String,
      required: true,
      unique: true,
    },
    seq_number: {
      type: Number,
      default: 1,
    },
  },
  {
    collection: "Counter",
  }
);

// -------------------------------------------------------------------------------------------------
export const incrementSeq = async (sequenceName: string, modelName: string) => {

  // 0. result 변수 선언
  let latestFindResult:any = null;
  let latestResult:number = 1;
  let existingFindResult:any = null;
  let existingCreateResult:any = null;
  let existingUpdateResult:any = null
  let finalResult:number = 1;

  // 1. Model과 Counter 초기화
  const Model = mongoose.model(modelName);
  const Counter = mongoose.model("Counter", schema);

  // 2. 최신 sequence 값을 가져오기
  latestFindResult = await Model.findOne({})
  .sort(
    {
      [sequenceName]: -1
    }
  )
  .lean();

  latestResult = latestFindResult ? latestFindResult[sequenceName] : 0;

  // 3. Counter에서 해당 sequenceName 존재 여부 확인
  existingFindResult = await Counter.findOne(
    {
      seq_collection: modelName
    }
  )
  .lean();

  // 4. Counter 업데이트 또는 새로운 Counter 생성
  if (!existingFindResult) {
    existingCreateResult = await Counter.create(
      {
        seq_collection: modelName,
        seq_number: latestResult + 1
      }
    );
    existingUpdateResult = existingCreateResult.seq_number;
  }
  else {
    existingUpdateResult = await Counter.findOneAndUpdate(
      {
        seq_collection: modelName
      },
      {
        $inc: {
          seq_number: 1
        }
      },
      {
        new: true
      }
    );
  }

  if (!existingUpdateResult) {
    finalResult = 1;
  }
  else {
    finalResult = existingUpdateResult.seq_number;
  }

  return finalResult;
};