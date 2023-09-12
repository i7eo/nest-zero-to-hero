import AppDataSource from './ormconfig'

import { User } from './user/user.entity'

AppDataSource.initialize()
  .then(async () => {
    const user = await AppDataSource.manager.find(User)
    console.log('Here you can setup and run express / fastify / any other framework.', user)
  })
  .catch((error) => console.log(error))
