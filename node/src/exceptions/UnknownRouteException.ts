import { AppController } from './../app.controller';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { AppService } from 'app.service';

@Catch(UnknownRouteException)
export class UnknownRouteException implements ExceptionFilter {

    constructor(private readonly appController: AppController, private readonly appService: AppService) { }

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        // console.log('exception response: ', response);
        // console.log('exception request:', request);
        response
            .status(status)
            .json({
                statusCode: exception.getStatus(),
                timestamp: new Date().toISOString(),
                path: request.url,
                you: 'hi'
            });
        // tslint:disable:no-console
        // console.log('UnknownRouteException', this.appService.index);
        // return this.appController.index();
    }
}