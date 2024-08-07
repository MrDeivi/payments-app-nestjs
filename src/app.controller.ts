import {
	Controller,
	Get
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  health(): { status: string; uptime: number } {
    return {
      status: 'ok',
      uptime: process.uptime(),
    }
  }
}
