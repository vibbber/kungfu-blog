import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';

const SOURCE_DIR = '/Users/marcschwyn/Desktop/projects/kungfu/apps/knowledge-hub/public/images';
const TARGET_DIR = '/Users/marcschwyn/Desktop/projects/kungfu/apps/kungfu-blog/public/images';

async function convertToWebP(sourcePath, targetPath) {
  try {
    await sharp(sourcePath)
      .webp({ quality: 85 })
      .toFile(targetPath);
    console.log(`Converted: ${basename(sourcePath)} -> ${basename(targetPath)}`);
  } catch (err) {
    console.error(`Failed to convert ${sourcePath}: ${err.message}`);
    throw err;
  }
}

async function processDirectory(subDir) {
  const sourceDir = join(SOURCE_DIR, subDir);
  const targetDir = join(TARGET_DIR, subDir);

  try {
    await mkdir(targetDir, { recursive: true });
    const files = await readdir(sourceDir);

    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const sourcePath = join(sourceDir, file);
        const targetName = basename(file, ext) + '.webp';
        const targetPath = join(targetDir, targetName);
        await convertToWebP(sourcePath, targetPath);
      }
    }
  } catch (err) {
    console.error(`Failed to process directory ${subDir}: ${err.message}`);
    throw err;
  }
}

async function main() {
  console.log('Converting images to WebP...\n');

  // Convert card images (only the two we need)
  await mkdir(join(TARGET_DIR, 'cards'), { recursive: true });
  await convertToWebP(
    join(SOURCE_DIR, 'strategies/goodness-of-fit.png'),
    join(TARGET_DIR, 'cards/goodness-of-fit.webp')
  );
  await convertToWebP(
    join(SOURCE_DIR, 'strategies/matching-childs-motivation-style.png'),
    join(TARGET_DIR, 'cards/matching-childs-motivation-style.webp')
  );

  // Convert blog images
  await processDirectory('blog/goodness-of-fit');
  await processDirectory('blog/matching-childs-motivation-style');

  console.log('\nDone!');
}

main().catch(err => { console.error(err); process.exit(1); });
