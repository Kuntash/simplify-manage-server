import { Request } from 'express';
import formidable from 'formidable';
import { gc } from '../storage';

export const getBooleanFromString = (stringValue: string): boolean => {
  return stringValue === 'true' ? true : false;
};

export const formParseAsync = async (req: Request) => {
  return new Promise<[formidable.Fields, formidable.Files]>(
    (resolve, reject) => {
      const form = formidable({ multiples: false });
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    }
  );
};

export const gcpUploadFile = async (
  bucketName: string,
  filepath: string,
  destination: string,
  contentType?: string | undefined
) => {
  const gcpBucket = gc.bucket(bucketName);
  const uploadResponse = await gcpBucket.upload(filepath, {
    destination,
    contentType,
    gzip: true,
  });
  return `${uploadResponse[0].storage.apiEndpoint}/${bucketName}/${uploadResponse[0].metadata.name}`;
};
