import { Storage } from '@google-cloud/storage';
import path from 'path';

export const gc = new Storage({
  keyFilename: path.join(__dirname, `../../simplifymanage-0c184de8cf80.json`),
  projectId: 'simplifymanage',
});
