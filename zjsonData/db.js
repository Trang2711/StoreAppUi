module.exports = () => {
  const data = { products: [] };
  // Create 1000 users
  for (let i = 0; i < 100; i++) {
    data.products.push({
      id: i,
      laptopName: `Laptop${i}`,
      lapUrl: [
        "https://www.hnmac.vn/media/cache/data/16t-350x265.jpg",
        "https://www.hnmac.vn/media/cache/data/16t-350x265.jpg",
        "https://www.hnmac.vn/media/cache/data/16t-350x265.jpg",
        "https://www.hnmac.vn/media/cache/data/16t-350x265.jpg",
      ],
      comments: [
        { user: `user${i}`, comment: `comment${i}` },
        { user: `user${i + 1}`, comment: `comment${i + 1}` },
        { user: `user${i + 2}`, comment: `comment${i + 2}` },
        { user: `user${i + 3}`, comment: `comment${i + 3}` },
        { user: `user${i + 4}`, comment: `comment${i + 4}` },
      ],
    });
  }
  return data;
};
