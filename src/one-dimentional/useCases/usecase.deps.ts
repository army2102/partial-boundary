// User
export type User = {
  id: string
  name: string
  accessToken: string
}
export interface IUserDb {
  getAllUsers(): Promise<User[]>
}

// Encrypt
export interface IEncryptService {
  decrypt(text: string): string
}

// Csv
export type CsvContent = {
  header: string[]
  data: object[]
}
export interface ICsvService {
  createFile(filename: string, content: CsvContent): void
}
