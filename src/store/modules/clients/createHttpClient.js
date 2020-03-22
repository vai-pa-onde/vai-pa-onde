import HttpClient from '../../http/client'
import config from '@/config'

export default () => new HttpClient(config.apiHost)
