import { ICsvService, IEncryptService, IUserDb } from './usecase.deps'

type Input = void
type Output = Promise<void>

export class UseCase {
  constructor(
    private readonly userDb: IUserDb,
    private readonly encryptService: IEncryptService,
    private readonly csvService: ICsvService
  ) {}

  public async execute(input: Input): Promise<Output> {
    const users = await this.userDb.getAllUsers()

    const decodedUsers = users.map(user => {
      const decodedAccessToken = this.encryptService.decrypt(user.accessToken)

      return {
        id: user.id,
        name: user.name,
        accessToken: decodedAccessToken
      }
    })

    const csvContent = {
      header: ['Id', 'Name', 'AccessToken'],
      data: decodedUsers
    }
    this.csvService.createFile(
      'Wisesight Trend Facebook User Access Token',
      csvContent
    )
  }
}
