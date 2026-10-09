export const pages = {};

for (let i = 1; i <= 43; i++) {
  const pageNumber = i.toString().padStart(4, '0');
  const filename = `https://res.cloudinary.com/db9l85phg/image/upload/prisma2.0-pages/prisma2.0-page-${pageNumber}.webp`;
  
  if (i === 1) {
    pages["cover"] = filename;
  } else if (i === 43) {
    pages["backCover"] = filename;
  } else {
    pages[`Page${i - 1}`] = filename;
  }
}

export const pdf = {
    "pdf": "/prisma2.0.pdf"
};

export const pageList = Object.values(pages);

export default pages;
