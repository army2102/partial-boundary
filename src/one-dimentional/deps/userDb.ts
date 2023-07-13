import { Collection, ObjectId } from 'mongodb'

import { IUserDb, User } from '../useCases/usecase.deps'

export type UserSchema = {
  _id: ObjectId
  name: string
  accessToken: string
}

export class UserDb implements IUserDb {
  constructor(private readonly connection: Collection<UserSchema>) {}

  public async getAllUsers(): Promise<User[]> {
    const result = await this.connection.find({ channel: 'facebook' }).toArray()

    const users = result.map(u => {
      return {
        id: u._id.toHexString(),
        name: u.name,
        accessToken: u.accessToken
      }
    })

    return users
  }
}
