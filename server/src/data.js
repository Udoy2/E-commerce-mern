const data = {
    users: [
      {
        name: "John Doe",
        email: "udoy@gmail.com",
        password: "password123@",
        phone: "+1234567890",
        address: "123 Main St, Anytown, USA"
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "password456",
        phone: "+0987654321",
        address: "456 Elm St, Othertown, USA"
      },
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "password789",
        phone: "+1122334455",
        address: "789 Oak St, Sometown, USA"
      }
    ],
    products: [
      {
          name: "Wireless Bluetooth Earbuds",
          slug: "wireless-bluetooth-earbuds",
          description: "High-quality wireless earbuds with noise cancellation and long battery life.",
          price: 49.99,
          quantity: 100,
          sold: 10,
          category: "66c385440f4ab375539a6fd1", // Example ObjectId for category
      },
      {
          name: "Smartphone Stand Holder",
          slug: "smartphone-stand-holder",
          description: "Adjustable smartphone stand holder, perfect for desk or nightstand.",
          price: 19.99,
          quantity: 200,
          sold: 50,
          category: "66c385440f4ab375539a6fd1", // Example ObjectId for category
      },
      {
          name: "USB-C Charging Cable",
          slug: "usb-c-charging-cable",
          description: "Durable and fast-charging USB-C cable, compatible with most devices.",
          price: 9.99,
          quantity: 500,
          sold: 120,
          category: "66c385440f4ab375539a6fd1", // Example ObjectId for category
      },
      {
          name: "Portable Power Bank 10000mAh",
          slug: "portable-power-bank-10000mah",
          description: "Compact and powerful 10000mAh power bank with dual USB ports.",
          price: 29.99,
          quantity: 150,
          sold: 70,
          category: "66c38561ba47d3d37059c9b6", // Example ObjectId for category
      },
      {
          name: "Ergonomic Office Chair",
          slug: "ergonomic-office-chair",
          description: "Comfortable ergonomic office chair with lumbar support and adjustable height.",
          price: 199.99,
          quantity: 30,
          sold: 5,
          category: "66c38561ba47d3d37059c9b6", // Example ObjectId for category
      }
  ]
  
  };


  module.exports = {data}