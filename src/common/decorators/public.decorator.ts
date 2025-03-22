import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = '$ecretKey';
export const Public = () => SetMetadata(PUBLIC_KEY, true);
