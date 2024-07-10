import loadEnvironments from '../environments/environment'

loadEnvironments()

const config = {
	PORT: +process.env.PORT,
	APP_URL: process.env.APP_URL,
	MONGO_URL: process.env.MONGO_URL,
	JWT_SECRET: process.env.JWT_SECRET,
	REDIS_URL: process.env.REDIS_URL,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PASS: process.env.REDIS_PASS,
}
export default config as IConfigOptions


export interface IConfigOptions {
	PORT: number
	MONGO_URL: string
	APP_URL: string
	JWT_SECRET: string
	REDIS_URL: string
	REDIS_HOST: string
	REDIS_PASS: string
}


export function isProd() {
	return process.env.NODE_ENV == 'production'
}
