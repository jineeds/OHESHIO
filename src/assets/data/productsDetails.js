export const productDetails = [
  {
    id: 'p001',
    name: '체크 패턴 후드 자켓',
    price: 228000,
    category: 'outer',
    description: '체크 패턴의 후드 퍼프 자켓입니다. 방풍 소재와 탈부착 가능한 후드가 특징입니다.',
    material: 'COTTON 100%',
    care: 'DRY CLEANING ONLY',
    model_info: {
      height: '175cm',
      weight: '65kg',
      wearing_size: 'M',
    },
    size_info: {
      // 사이즈 정보...
    },
    images: {
      blue: {
        thumbnail: '/images/products/p001/blue/thumbnail.jpg',
        main_images: [
          // 이미지 정보...
        ],
      },
      // 다른 색상...
    },
    related_products: ['p005', 'p010', 'p015'],
    styling_products: ['p004', 'p008', 'p012'],
  },
  // 더 많은 상품 상세...
];
