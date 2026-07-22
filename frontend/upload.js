import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import mime from 'mime-types';

const bucketName = process.argv[2];
if (!bucketName) {
  console.error('Please provide the bucket name as the first argument.');
  process.exit(1);
}

const s3Client = new S3Client({ region: 'us-east-1' });

async function uploadDirectory(directoryPath, prefix = '') {
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await uploadDirectory(filePath, path.posix.join(prefix, file));
    } else {
      const s3Key = path.posix.join(prefix, file);
      const fileContent = fs.readFileSync(filePath);
      const mimeType = mime.lookup(filePath) || 'application/octet-stream';

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
        Body: fileContent,
        ContentType: mimeType,
      });

      try {
        await s3Client.send(command);
        console.log(`Successfully uploaded ${s3Key}`);
      } catch (err) {
        console.error(`Failed to upload ${s3Key}:`, err);
      }
    }
  }
}

console.log(`Starting upload to ${bucketName}...`);
uploadDirectory(path.join(process.cwd(), 'dist'))
  .then(() => console.log('Upload complete!'))
  .catch((err) => console.error('Error during upload:', err));
