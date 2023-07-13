import CryptoJS from 'crypto-js'

import { IEncryptService } from '../useCases/usecase.deps'

export class EncryptService implements IEncryptService {
  constructor(private readonly secret: string) {}

  public decrypt(text: string): string {
    const decodedText = CryptoJS.AES.decrypt(text, this.secret).toString(
      CryptoJS.enc.Utf8
    )

    return decodedText
  }
}
