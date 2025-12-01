// Mock API Service for Portfolio Data
// This service simulates fetching portfolio data from a Spring Boot backend

/**
 * Fetches portfolio data from the backend API
 * @returns {Promise<Array>} Array of portfolio items with category, title, image, and details
 */
export async function fetchPortfolios() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock portfolio data with 10+ items
  const mockPortfolios = [
    {
      id: 1,
      title: "모던 리빙룸 세트",
      category: "맞춤 가구",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      description: "세련된 모던 스타일의 리빙룸 가구 세트입니다.",
      details: "재질: 원목, 크기: 맞춤 제작"
    },
    {
      id: 2,
      title: "사무실 책상 시스템",
      category: "상업 공간 솔루션",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      description: "효율적인 사무 공간을 위한 책상 시스템입니다.",
      details: "재질: MDF, 크기: 표준형"
    },
    {
      id: 3,
      title: "클래식 침실 세트",
      category: "맞춤 가구",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800",
      description: "우아한 클래식 스타일의 침실 가구 세트입니다.",
      details: "재질: 원목, 크기: 맞춤 제작"
    },
    {
      id: 4,
      title: "카페 인테리어 솔루션",
      category: "상업 공간 솔루션",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
      description: "편안한 분위기의 카페 공간을 위한 가구 솔루션입니다.",
      details: "재질: 원목 + 철제, 크기: 맞춤 제작"
    },
    {
      id: 5,
      title: "미니멀 주방 수납장",
      category: "맞춤 가구",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
      description: "깔끔한 미니멀 디자인의 주방 수납장입니다.",
      details: "재질: 합판, 크기: 맞춤 제작"
    },
    {
      id: 6,
      title: "호텔 로비 가구 세트",
      category: "상업 공간 솔루션",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      description: "고급스러운 호텔 로비를 위한 가구 세트입니다.",
      details: "재질: 원목 + 가죽, 크기: 맞춤 제작"
    },
    {
      id: 7,
      title: "스칸디나비아 식탁 세트",
      category: "맞춤 가구",
      image: "https://images.unsplash.com/photo-1556911220-e63b4a0d0aec?w=800",
      description: "따뜻한 느낌의 스칸디나비아 스타일 식탁입니다.",
      details: "재질: 원목, 크기: 4인용"
    },
    {
      id: 8,
      title: "레스토랑 테이블 시스템",
      category: "상업 공간 솔루션",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      description: "레스토랑을 위한 효율적인 테이블 배치 시스템입니다.",
      details: "재질: 원목, 크기: 다양한 사이즈"
    },
    {
      id: 9,
      title: "인더스트리얼 책장",
      category: "맞춤 가구",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      description: "인더스트리얼 스타일의 벽걸이 책장입니다.",
      details: "재질: 철제 + 원목, 크기: 맞춤 제작"
    },
    {
      id: 10,
      title: "회의실 가구 세트",
      category: "상업 공간 솔루션",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      description: "프로페셔널한 회의 공간을 위한 가구 세트입니다.",
      details: "재질: MDF + 원목, 크기: 10인용"
    },
    {
      id: 11,
      title: "빈티지 서재 세트",
      category: "맞춤 가구",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800",
      description: "빈티지 감성의 서재 가구 세트입니다.",
      details: "재질: 원목, 크기: 맞춤 제작"
    },
    {
      id: 12,
      title: "매장 진열대 시스템",
      category: "상업 공간 솔루션",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
      description: "매장 진열을 위한 효율적인 가구 시스템입니다.",
      details: "재질: 철제 + 유리, 크기: 맞춤 제작"
    }
  ];

  return mockPortfolios;
}

