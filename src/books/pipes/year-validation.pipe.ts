import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class YearValidationPipe implements PipeTransform {
  transform(value: number) {
    if (value < 1900 || value > 2025) {
      throw new BadRequestException('Year must be between 1900 and 2025');
    }
    return value;
  }
}
