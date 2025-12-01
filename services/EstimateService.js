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

    // Step 1: Create estimate first
    const createResponse = await fetch('/api/estimates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!createResponse.ok) {
      let errorMessage = `서버 오류: ${createResponse.status}`;
      try {
        const errorData = await createResponse.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.errors) {
          const validationErrors = Object.values(errorData.errors).flat();
          errorMessage = validationErrors.join(', ');
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (e) {
        errorMessage = `서버 오류: ${createResponse.status} ${createResponse.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const createResult = await createResponse.json();
    console.log('견적 생성 응답:', createResult);
    const estimateId = createResult.data?.id;
    console.log('추출된 estimateId:', estimateId);

    // Step 2: Upload files if any
    if (files && files.length > 0 && estimateId) {
      try {
        console.log('파일 업로드 시작, estimateId:', estimateId, '파일 개수:', files.length);
        const uploadResult = await uploadEstimateFiles(estimateId, files);
        console.log('파일 업로드 성공:', uploadResult);
      } catch (fileError) {
        console.error('파일 업로드 실패:', fileError);
        // 파일 업로드 실패해도 견적은 생성되었으므로 경고만 표시
        // 사용자에게는 성공 메시지를 보여주되, 콘솔에 경고를 남김
        console.warn('견적은 생성되었지만 파일 업로드에 실패했습니다:', fileError.message);
        // 에러를 다시 throw하지 않아서 견적 생성은 성공으로 처리됨
        // 하지만 콘솔에서 확인 가능하도록 로그를 남김
      }
    } else {
      if (files && files.length > 0) {
        console.error('파일은 있지만 estimateId가 없습니다! estimateId:', estimateId);
      } else if (estimateId) {
        console.log('estimateId는 있지만 파일이 없습니다. files:', files);
      } else {
        console.log('파일이 없거나 estimateId가 없습니다. files:', files?.length, 'estimateId:', estimateId);
      }
    }

    return {
      success: createResult.success || true,
      message: createResult.message || '견적 요청이 성공적으로 접수되었습니다.',
      estimateId: estimateId
    };
  } catch (error) {
    console.error('견적 요청 제출 오류:', error);
    throw error;
  }
}

/**
 * Upload files for an estimate
 * @param {number} estimateId - Estimate ID
 * @param {Array<File>} files - Array of files to upload
 * @returns {Promise<Object>} Upload result
 */
export async function uploadEstimateFiles(estimateId, files) {
  try {
    console.log('=== 파일 업로드 시작 ===');
    console.log('estimateId:', estimateId);
    console.log('files:', files);
    console.log('files.length:', files?.length);
    
    if (!files || files.length === 0) {
      throw new Error('업로드할 파일이 없습니다.');
    }
    
    if (!estimateId) {
      throw new Error('견적 ID가 없습니다.');
    }
    
    const formData = new FormData();
    files.forEach((file, index) => {
      console.log(`파일 ${index + 1}:`, file.name, file.size, file.type);
      formData.append('files', file);
    });

    console.log('API 호출:', `/api/estimates/${estimateId}/attachments/multiple`);
    const response = await fetch(`/api/estimates/${estimateId}/attachments/multiple`, {
      method: 'POST',
      body: formData
    });

    console.log('응답 상태:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('파일 업로드 실패 응답:', errorData);
      throw new Error(errorData.message || `파일 업로드 실패: ${response.status}`);
    }

    const result = await response.json();
    console.log('파일 업로드 성공:', result);
    console.log('=== 파일 업로드 완료 ===');
    return result;
  } catch (error) {
    console.error('=== 파일 업로드 오류 ===');
    console.error('에러:', error);
    console.error('에러 메시지:', error.message);
    console.error('에러 스택:', error.stack);
    throw error;
  }
}

/**
 * Get attachments for an estimate
 * @param {number} estimateId - Estimate ID
 * @returns {Promise<Array>} Array of attachments
 */
export async function getEstimateAttachments(estimateId) {
  try {
    console.log('첨부파일 API 호출:', `/api/estimates/${estimateId}/attachments`);
    const response = await fetch(`/api/estimates/${estimateId}/attachments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error('첨부파일 조회 실패:', response.status, response.statusText);
      throw new Error(`서버 오류: ${response.status}`);
    }

    const result = await response.json();
    console.log('첨부파일 API 응답:', result);
    return result.data || [];
  } catch (error) {
    console.error('첨부파일 조회 오류:', error);
    throw error;
  }
}

/**
 * Download an attachment
 * @param {number} attachmentId - Attachment ID
 * @param {string} fileName - File name for download
 * @returns {Promise<void>}
 */
export async function downloadAttachment(attachmentId, fileName) {
  try {
    const response = await fetch(`/api/estimates/attachments/${attachmentId}/download`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`파일 다운로드 실패: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'download';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('파일 다운로드 오류:', error);
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

