import http from '@/utils/http'

export const getQrcode = async (info: any): Promise<{ base64_image: string }> => {
  const {
    data: { result }
  } = await http.get('/open/qrcode/api', { params: info })
  return result
}

export const getRecruitInfo = async (params: any): Promise<any> => {
  const {
    data: { data }
  } = await http.get('/ncss', {
    params
  })
  return data
}
