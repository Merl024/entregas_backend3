import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor')
    .option('--persist <mode>', 'Modo de persistencia', 'mongo')
program.parse()

console.log('Mode option: ', program.opts().mode);

const enviroment = program.opts().mode

dotenv.config({
    path: enviroment == 'production' ? './src/config/.env.production' : './src/config/.env.development'
})

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL
}