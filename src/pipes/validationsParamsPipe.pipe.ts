import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class validationsParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`value: ${value} e metadata: ${metadata.type}`);
    if (!value) {
      throw new BadRequestException(
        `The value of the parameter ${metadata.data} must be informed`,
      );
    }
    return value;
  }
}
