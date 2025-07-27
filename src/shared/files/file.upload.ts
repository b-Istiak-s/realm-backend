import { FileUpload } from 'graphql-upload/processRequest.mjs';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

export async function fileUpload(
  filePath: string,
  file: Promise<FileUpload>,
): Promise<void> {
  if (!existsSync(filePath)) {
    mkdirSync(filePath, { recursive: true });
  }

  const { filename, createReadStream } = await file;
  const filenameWithTimestamp = `${Date.now()}-${filename}`;
  const fullPath = `${filePath}/${filenameWithTimestamp}`;

  const readStream = createReadStream();
  const writeStream = createWriteStream(fullPath);

  return new Promise((resolve, reject) => {
    readStream.pipe(writeStream).on('finish', resolve).on('error', reject);
  });
}
