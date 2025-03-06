// chatbotLogic.js

// 간단한 제품 데이터베이스
const productDatabase = {
    'HEAVY HOOD': {
        price: '89,000원',
        colors: ['블랙', '화이트', '그레이', '네이비'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: '고급 코튼 소재로 제작된 프리미엄 후드티입니다. 따뜻하고 편안한 착용감을 제공합니다.',
    },
    'BASIC TEE': {
        price: '39,000원',
        colors: ['블랙', '화이트', '그레이', '베이지', '레드'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: '부드러운 면 소재의 기본 티셔츠입니다. 일상 착용에 적합합니다.',
    },
    'CARGO PANTS': {
        price: '79,000원',
        colors: ['블랙', '베이지', '올리브'],
        sizes: ['28', '30', '32', '34', '36'],
        description: '내구성 있는 소재로 제작된 카고 팬츠입니다. 실용적인 다수의 포켓이 특징입니다.',
    },
};

// 정책 정보
const storeInfo = {
    shipping: '주문 후 1-3일 내 출고되며, 출고 후 1-2일 내 배송됩니다. (주말/공휴일 제외)',
    returns:
        '상품 수령 후 7일 이내에 교환/반품이 가능합니다. 단, 착용하거나 세탁한 제품, 포장이 훼손된 제품은 교환/반품이 불가능합니다.',
    sizeGuide:
        '사이즈 가이드는 각 제품 페이지에서 확인하실 수 있습니다. 일반적으로 S는 90-95, M은 95-100, L은 100-105, XL은 105-110에 해당합니다.',
    stores: '서울 강남구 삼성로 123에 플래그십 스토어가 있으며, 영업시간은 오전 11시부터 오후 8시까지입니다.',
};

// 키워드 기반 응답 매핑
const keywordResponses = {
    // 인사
    안녕: '안녕하세요! 무엇을 도와드릴까요?',
    하이: '안녕하세요! 무엇을 도와드릴까요?',
    헬로: '안녕하세요! 무엇을 도와드릴까요?',

    // 배송
    배송: storeInfo.shipping,
    배달: storeInfo.shipping,
    언제: storeInfo.shipping,
    며칠: storeInfo.shipping,

    // 교환/반품
    교환: storeInfo.returns,
    반품: storeInfo.returns,
    환불: storeInfo.returns,
    취소: '주문 취소는 출고 전까지 가능합니다. 마이페이지에서 취소 요청을 해주세요.',

    // 사이즈
    사이즈: storeInfo.sizeGuide,
    크기: storeInfo.sizeGuide,
    핏: '본 브랜드의 제품은 대체로 정사이즈에서 약간 오버핏으로 제작됩니다. 타이트한 핏을 원하시면 한 사이즈 작게 주문하세요.',

    // 매장
    매장: storeInfo.stores,
    오프라인: storeInfo.stores,
    직접: storeInfo.stores,

    // 기타
    감사: '도움이 되어 기쁩니다! 다른 질문이 있으시면 언제든지 물어보세요.',
    고마워: '도움이 되어 기쁩니다! 다른 질문이 있으시면 언제든지 물어보세요.',
    도움: '무엇을 도와드릴까요? 제품 정보, 배송, 교환/반품 등에 관해 질문해주세요.',
};

/**
 * 사용자 메시지에서 제품명을 추출하는 함수
 * @param {string} message - 사용자 메시지
 * @returns {string|null} - 찾은 제품명 또는 null
 */
const extractProductName = (message) => {
    const productNames = Object.keys(productDatabase);

    // 정확한 제품명 일치 확인
    for (const name of productNames) {
        if (message.toUpperCase().includes(name)) {
            return name;
        }
    }

    // 부분 일치 확인
    if (message.toUpperCase().includes('후드') || message.toUpperCase().includes('HOOD')) {
        return 'HEAVY HOOD';
    } else if (
        message.toUpperCase().includes('티셔츠') ||
        message.toUpperCase().includes('티') ||
        message.toUpperCase().includes('TEE')
    ) {
        return 'BASIC TEE';
    } else if (
        message.toUpperCase().includes('팬츠') ||
        message.toUpperCase().includes('바지') ||
        message.toUpperCase().includes('카고') ||
        message.toUpperCase().includes('CARGO')
    ) {
        return 'CARGO PANTS';
    }

    return null;
};

/**
 * 제품 가격에 대한 응답 생성 함수
 * @param {string} productName - 제품명
 * @returns {string} - 가격 정보를 포함한 응답
 */
const buildPriceResponse = (productName) => {
    const product = productDatabase[productName];
    if (!product) return '죄송합니다, 해당 제품 정보를 찾을 수 없습니다.';

    return `${productName}의 가격은 ${product.price}입니다.`;
};

/**
 * 제품 정보에 대한 상세 응답 생성 함수
 * @param {string} productName - 제품명
 * @returns {string} - 제품 상세 정보를 포함한 응답
 */
const buildProductDetailResponse = (productName) => {
    const product = productDatabase[productName];
    if (!product) return '죄송합니다, 해당 제품 정보를 찾을 수 없습니다.';

    return `${productName}에 대한 정보입니다:
- 가격: ${product.price}
- 색상: ${product.colors.join(', ')}
- 사이즈: ${product.sizes.join(', ')}
- 설명: ${product.description}`;
};

/**
 * 사용자 메시지에 대한 봇 응답을 가져오는 함수
 * @param {string} message - 사용자 메시지
 * @returns {Promise<string>} - 봇 응답
 */
export const fetchBotResponse = async (message) => {
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 메시지 전처리
    const normalizedMessage = message.toLowerCase();

    // 제품명 추출
    const productName = extractProductName(message);

    // 가격 문의 확인
    if (normalizedMessage.includes('가격') || normalizedMessage.includes('얼마') || normalizedMessage.includes('원')) {
        if (productName) {
            return buildPriceResponse(productName);
        }
        return '어떤 제품의 가격이 궁금하신가요? HEAVY HOOD, BASIC TEE, CARGO PANTS 등의 제품이 있습니다.';
    }

    // 제품 정보 문의 확인
    if (
        productName &&
        (normalizedMessage.includes('정보') || normalizedMessage.includes('알려') || normalizedMessage.includes('설명'))
    ) {
        return buildProductDetailResponse(productName);
    }

    // 키워드 기반 응답 확인
    for (const keyword in keywordResponses) {
        if (normalizedMessage.includes(keyword)) {
            return keywordResponses[keyword];
        }
    }

    // 기본 응답
    return '죄송합니다, 질문을 이해하지 못했습니다. 제품 정보, 배송, 교환/반품 등에 관해 더 명확히 질문해 주시겠어요?';
};
