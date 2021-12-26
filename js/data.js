let productsDB = [
  {
    id: 1,
    title: "mac air",
    price: 800,
    imageUrl: "images/img1.jpg",
    quantity: 1,
  },
  {
    id: 2,
    title: "mac pro",
    price: 900,
    imageUrl: "images/img2.jpg",
    quantity: 1,
  },
  {
    id: 3,
    title: "macbook",
    price: 1000,
    imageUrl: "images/img3.jpg",
    quantity: 1,
  },
];

localStorage.setItem("products", JSON.stringify(productsDB));
