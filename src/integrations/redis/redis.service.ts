import { HttpService } from '@nestjs/axios'
import { Global, Injectable } from '@nestjs/common'
import config from 'config/config'
import { lastValueFrom } from 'rxjs'

@Global()
@Injectable()
export class RedisService {
	constructor(private readonly http: HttpService) {}
	
	// Using remote redis VIA rest API
	async getObject(key) {
		try {
			const value = await lastValueFrom(this.http.get(`${config.REDIS_HOST}/get/${key}`, {
				headers: { 'Authorization': `Bearer ${config.REDIS_PASS}` }
			}))

			const result = value.data.result
			return result ? JSON.parse(value.data.result) : null
		} catch (err) {
			return null
		}
	}

	async setObject(key, value) {
		try {
			const valStr = JSON.stringify(value)
			const result = await lastValueFrom(this.http.get(`${config.REDIS_HOST}/set/${key}/${valStr}`, {
				headers: { 'Authorization': `Bearer ${config.REDIS_PASS}` }
			}
			))
			return result.data.result == 'OK' ? true : false
		} catch (err) {
			return null
		}
	}
}
