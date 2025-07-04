const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'photos');
const outputFile = path.join(__dirname, 'image.json');

fs.readdir(photosDir, (err, files) => {
  if (err) {
    console.error('Không đọc được thư mục photos:', err);
    return;
  }
  // Lọc ra các file ảnh
  const images = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
  fs.writeFileSync(outputFile, JSON.stringify(images, null, 2), 'utf8');
  console.log('Đã tạo xong file image.json:', images);
});