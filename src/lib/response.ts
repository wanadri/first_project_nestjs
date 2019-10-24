export function success(res, data: object = {}, message: string = "Request Success", status: number = 200) {
  return res.status(status).json({
    'status': status,
    'error': false,
    'message': message,
    'data': data
  })
}