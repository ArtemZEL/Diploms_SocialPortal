const catchErrors = error => {
  let errorMsg;

  if (error.response) {
    // Ошибка от сервера с кодом ответа (например, 400, 500 и т.д.)
    errorMsg = error.response.data;
    console.error(errorMsg);
  } else if (error.request) {
// Ошибка при отправке запроса    
errorMsg = error.request;
    console.error(errorMsg);
  } else {
    // Другие ошибки
    errorMsg = error.message;
    console.error(errorMsg);
  }
  return errorMsg;
};

export default catchErrors;
