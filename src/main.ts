import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { LogLevels, setLogLevel } from '@typegoose/typegoose'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import config from '../config/config'
import { AppModule } from './app.module'

declare const module: any

setLogLevel(LogLevels.WARN)
async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bodyParser: true, cors: true })
	app.enableCors()
	app.use(helmet())
	app.use(json({ limit: '50mb' }))
	app.use(urlencoded({ extended: true, limit: '50mb' }))

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Payments API')
		.setDescription('The Payments API')
		.setVersion('1.0')
		.addTag('payments')
		.setExternalDoc('Postman Collection', '/api-json')
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api', app, document)

	app.useGlobalPipes(new ValidationPipe())
	await app.listen(config.PORT)

	Logger.log(`Listening port: ${config.PORT}`, 'NestApplication')

	if (module.hot) {
		module.hot.accept()
		module.hot.dispose(() => app.close())
	}
}
bootstrap()
