import HttpClient from './client'
import config from '@/config'

export default new HttpClient(config.googleBaseUrl)
