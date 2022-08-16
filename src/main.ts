import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import * as dotenv from 'dotenv'
dotenv.config()

const SimpleTransport = async () => {
    try {
        const logger = new Logger('SimpleTransport')
        const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { cors: true })
        app.useGlobalPipes(new ValidationPipe())
        await app.listen(3000, '0.0.0.0')
        logger.log('Application SimpleTransport is listening on port http://localhost:3000')
    } catch (error) {
        console.log(error)
    }
}
SimpleTransport()
