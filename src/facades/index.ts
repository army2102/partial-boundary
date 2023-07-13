import { Facades } from './facades'

const main = async () => {
  const facades = new Facades()

  const users = await facades.getAllUsers()

  const decodedUsers = users.map(user => {
    const decodedAccessToken = facades.decrypt(user.accessToken)

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
  facades.createCsvFile(
    'Wisesight Trend Facebook User Access Token',
    csvContent
  )
}

main()
