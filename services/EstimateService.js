/**
 * Submits an estimate request to the backend API
 * @param {Object} formData - The form data to submit
 * @param {Array<File>} files - Array of uploaded files
 * @returns {Promise<Object>} Response object with success status and message
 */
export async function submitEstimate(formData, files = []) {
  try {
    // Map frontend form data to backend DTO format
    const requestData = {
      userType: formData.customerType === 'individual' ? 'INDIVIDUAL' : 'COMPANY',
      name: formData.name,
      phoneNumber: formData.phone,
      email: formData.email,
      requestDetails: formData.message || '',
      items: [] // Empty items array for now, can be extended later
    };

    // Add enterprise-specific fields
    if (formData.customerType === 'enterprise') {
      requestData.companyName = formData.companyName || '';
      requestData.businessNumber = formData.businessNumber || '';
    }

    // Send request to backend API
    const response = await fetch('/api/estimates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      let errorMessage = `서버 오류: ${response.status}`;
      try {
        const errorData = await response.json();
        // 백엔드에서 반환하는 오류 메시지 처리
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.errors) {
          // Validation 오류 처리
          const validationErrors = Object.values(errorData.errors).flat();
          errorMessage = validationErrors.join(', ');
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (e) {
        // JSON 파싱 실패 시 기본 메시지 사용
        errorMessage = `서버 오류: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return {
      success: result.success || true,
      message: result.message || '견적 요청이 성공적으로 접수되었습니다.',
      estimateId: result.data?.id
    };
  } catch (error) {
    console.error('견적 요청 제출 오류:', error);
    throw error;
  }
}

/**
 * Fetches all estimates from the backend API
 * @param {string} status - Optional status filter
 * @returns {Promise<Array>} Array of estimates
 */
export async function fetchEstimates(status = null) {
  try {
    const url = status ? `/api/estimates?status=${status}` : '/api/estimates';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('견적 목록 조회 오류:', error);
    throw error;
  }
}

/**
 * Fetches a single estimate by ID
 * @param {number} id - Estimate ID
 * @returns {Promise<Object>} Estimate object
 */
export async function fetchEstimate(id) {
  try {
    const response = await fetch(`/api/estimates/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('견적 조회 오류:', error);
    throw error;
  }
}

/**
 * Updates an estimate status
 * @param {number} id - Estimate ID
 * @param {Object} updateData - Update data
 * @returns {Promise<Object>} Updated estimate
 */
export async function updateEstimate(id, updateData) {
  try {
    const response = await fetch(`/api/estimates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('견적 업데이트 오류:', error);
    throw error;
  }
}

/**
 * 개인 고객 견적 조회
 * @param {string} name - 이름
 * @param {string} email - 이메일
 * @param {string} phoneNumber - 전화번호
 * @returns {Promise<Object>} Estimate object
 */
export async function inquiryEstimateByIndividual(name, email, phoneNumber) {
  try {
    const params = new URLSearchParams({
      name,
      email,
      phoneNumber
    });
    
    const response = await fetch(`/api/estimates/inquiry/individual?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || '견적을 찾을 수 없습니다.');
    }

    return result.data;
  } catch (error) {
    console.error('견적 조회 오류:', error);
    throw error;
  }
}

/**
 * 기업 고객 견적 조회
 * @param {string} companyName - 회사명
 * @param {string} email - 이메일
 * @param {string} phoneNumber - 전화번호
 * @returns {Promise<Object>} Estimate object
 */
export async function inquiryEstimateByCompany(companyName, email, phoneNumber) {
  try {
    const params = new URLSearchParams({
      companyName,
      email,
      phoneNumber
    });
    
    const response = await fetch(`/api/estimates/inquiry/company?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || '견적을 찾을 수 없습니다.');
    }

    return result.data;
  } catch (error) {
    console.error('견적 조회 오류:', error);
    throw error;
  }
}

