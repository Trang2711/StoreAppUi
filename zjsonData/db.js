module.exports = () => {
  const data = { products: [] };
  // Create 1000 users
  for (let i = 0; i < 10; i++) {
    data.products.push({
      id: i,
      laptopName: `Laptop${i}`,
      lapUrl: [
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
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
