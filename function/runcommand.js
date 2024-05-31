import { readFileSync } from 'fs'
import { Client } from 'ssh2'
import { config } from 'dotenv';

function runcommand (command){
config();
const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec(`./scripts/runcommand.sh '${command}'`, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
    host: `${process.env.HOST}`,
    port: process.env.PORT,
    username: `${process.env.USERNAME}`,
    privateKey: readFileSync(`${process.env.KEYPATH}`),
    passphrase: `${process.env.PASSPHRASE}`
  });
}
export {runcommand};
