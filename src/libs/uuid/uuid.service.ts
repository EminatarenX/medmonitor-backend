import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IUUID } from './uuid.interface';

@Injectable()
export class UUIDService implements IUUID{
  generate() {
    return uuidv4();
  }
}