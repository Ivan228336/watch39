// scripts/upload-images.js
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = 'watch-39-bucket';
// Папка, где лежат ВСЕ ваши изображения (измените, если нужно)
const LOCAL_IMAGES_DIR = path.join(__dirname, '../public');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Функция для определения modelCode по имени файла
function extractModelCode(fileName) {
  // Ищем первый разделитель: _ или .
  const match = fileName.match(/^([^_.]+)[_.]/);
  return match ? match[1] : null;
}

async function uploadImage(filePath, fileName) {
  try {
    const modelCode = extractModelCode(fileName);
    if (!modelCode) {
      console.warn(`⚠️ Не удалось определить модель для ${fileName} – пропускаем`);
      return null;
    }

    // Читаем и оптимизируем
    const fileBuffer = await fs.readFile(filePath);
    const optimizedBuffer = await sharp(fileBuffer)
      .resize(1200, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 80 })
      .toBuffer();

    // Формируем путь в Storage: modelCode/имя_файла.webp
    const cleanName = fileName.replace(/\.[^.]+$/, '') + '.webp';
    const storagePath = `${modelCode}/${cleanName}`;

    // Загружаем
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, optimizedBuffer, {
        contentType: 'image/webp',
        cacheControl: 'public, max-age=31536000',
        upsert: false, // если файл уже есть, не перезаписываем
      });

    if (error) throw error;

    // Получаем публичный URL
    const { data: publicData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);

    return { modelCode, originalName: fileName, publicUrl: publicData.publicUrl };
  } catch (err) {
    console.error(`❌ Ошибка загрузки ${filePath}:`, err.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Загрузка изображений в Supabase Storage...');

  // Создаём bucket, если не существует
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets.some(b => b.name === BUCKET_NAME)) {
    await supabase.storage.createBucket(BUCKET_NAME, { public: true });
    console.log(`📦 Bucket "${BUCKET_NAME}" создан.`);
  }

  // Читаем все файлы из папки
  let files = await fs.readdir(LOCAL_IMAGES_DIR);
  // Фильтруем только изображения
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  files = files.filter(f => imageExtensions.includes(path.extname(f).toLowerCase()));

  console.log(`📸 Найдено ${files.length} изображений.`);

  const results = [];
  for (const file of files) {
    const filePath = path.join(LOCAL_IMAGES_DIR, file);
    const result = await uploadImage(filePath, file);
    if (result) {
      results.push(result);
      console.log(`✅ ${result.originalName} → ${result.publicUrl}`);
    }
  }

  // Сохраняем маппинг
  await fs.writeFile(
    path.join(__dirname, '../image-mapping.json'),
    JSON.stringify(results, null, 2)
  );
  console.log(`🎉 Загружено ${results.length} файлов. Маппинг сохранён в image-mapping.json`);
}

main().catch(console.error);