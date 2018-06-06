import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import UsersController from './controllers/usersController';
import LoginController from './controllers/loginController';


const port = process.env.PORT || 4008

const app = createKoaServer({
  controllers: [
    UsersController,
    LoginController
  ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port} from users/src/index.ts`))
  })
.catch(err => console.error(err))