// upload.ts

import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
dotenv.config();

// 1. upload ---------------------------------------------------------------------------------------
// upload 오버라이드 해서 함수화하기
export const uploadMemory = (fieldName: string, type: string, limit: number) => {

  // 메모리에만 저장
  const storage = multer.memoryStorage();

  const upload = multer({
    storage: storage,
  });

  // multer 설정 [Object: null prototype] 문제 해결
  if (type === "single") {
    return (req: Request, res: Response, next: NextFunction) => {
      upload.single(fieldName)(req, res, (err) => {
        if (err) {
          return next(err);
        }
        else {
          req.body = JSON.parse(JSON.stringify(req.body));
        }
        next();
      });
    };
  }
  else if (type === "array") {
    return (req: Request, res: Response, next: NextFunction) => {
      upload.array(fieldName, limit)(req, res, (err) => {
        if (err) {
          return next(err);
        }
        else {
          req.body = JSON.parse(JSON.stringify(req.body));
        }
        next();
      });
    };
  }
  else {
    throw new Error("Invalid upload type");
  }
};

// 2. gcloud ---------------------------------------------------------------------------------------
export const fnUploadCloud = (groupName:string, fileList: any[]) => {

  const projectId = process.env.GCLOUD_PROJECTS_ID;
  const bucketName = process.env.GCLOUD_BUCKET_NAME;
  const destination = process.env.GCLOUD_DESTINATION;

  // 스토리지 인스턴스 생성
  const storage = new Storage({ projectId });
  const bucket = storage.bucket(bucketName as string);

  fileList.forEach(async (file: any, _index: number) => {
    const fileUpload = bucket.file(`${destination}/${groupName}/${file.originalname}`);

    // Create a stream and pipe buffer content
    const stream = fileUpload.createWriteStream({
      resumable: false,
      public: true,
    });

    // Stream error handling
    stream.on('error', (err) => {
      console.error('Stream error:', err);
    });

    // Write file buffer content to stream
    stream.end(file.buffer);
  });
};

// 3. gcloud ---------------------------------------------------------------------------------------
export const fnGetUploadedFiles = async (groupName: string) => {

  const projectId = process.env.GCLOUD_PROJECTS_ID;
  const bucketName = process.env.GCLOUD_BUCKET_NAME;
  const destination = process.env.GCLOUD_DESTINATION;

  // 스토리지 인스턴스 생성
  const storage = new Storage({ projectId });
  const bucket = storage.bucket(bucketName as string);

  // 폴더 내 파일 리스트
  const [files] = await bucket.getFiles({
    prefix: `${destination}/${groupName}/`,
  });

  return files;
};