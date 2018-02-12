export function sendOk(res, data?: any) {
    res.json({
      success: true,
      error: null,
      data: data
    });
  }
  
  export function sendError(res, error?, status?) {
    // Log the error
    error && console.error(error);
  
    res.status(status || 400).json({
      success: false,
      error: error
    });
  }