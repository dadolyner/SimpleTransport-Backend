// Custom Exceptions extended class 
import { HttpException, Logger } from "@nestjs/common"

export class CustomException extends HttpException {
    constructor(message: string, status: number) {
        super(message, status)
    }

    static ok(location: string, message: string) {
        const logger = new Logger(location)
        logger.verbose(message)
        return new CustomException(message, 200)
    }

    static created(location: string, message: string) {
        const logger = new Logger(location)
        logger.verbose(message)
        return new CustomException(message, 201)
    }

    static noContent(location: string, message: string) {
        const logger = new Logger(location)
        logger.verbose(message)
        return new CustomException(message, 204)
    }

    static notModified(location: string, message: string) {
        const logger = new Logger(location)
        logger.verbose(message)
        return new CustomException(message, 304)
    }

    static badRequest(location: string, message: string) {
        const logger = new Logger(location)
        logger.error(message)
        return new CustomException(message, 400)
    }

    static unauthorized(location: string, message: string) {
        const logger = new Logger(location)
        logger.error(message)
        return new CustomException(message, 401)
    }

    static forbiden(location: string, message: string) {
        const logger = new Logger(location)
        logger.error(message)
        return new CustomException(message, 403)
    }

    static notFound(location: string, message: string) {
        const logger = new Logger(location)
        logger.error(message)
        return new CustomException(message, 404)
    }

    static conflict(location: string, message: string) {
        const logger = new Logger(location)
        logger.error(message)
        return new CustomException(message, 409)
    }

    static internalServerError(location: string, message: string) {
        const logger = new Logger(location)
        logger.error(message)
        return new CustomException(message, 500)
    }
}