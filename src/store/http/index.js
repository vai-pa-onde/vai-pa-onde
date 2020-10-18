import HttpClient from './client'
import config from '@/config'

export const googleClient = new HttpClient(config.googleBaseUrl)
export const cuttlyClient = new HttpClient('https://cutt.ly/api/')
