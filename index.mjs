import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();

const startingBalance = stdlib.parseCurrency(100);
const accAlice = await stdlib.newTestAccount(startingBalance);

// launch contract
console.log('Launching Contract ...')
const ctcAlice = accAlice.contract(backend);

const apiUsers = []


const startBobs = async (bobCount) => {  
  const createBob = async (bob) => {
    const newAcc = await stdlib.newTestAccount(startingBalance);
    const newCtc = newAcc.contract(backend, ctcAlice.getInfo());
    apiUsers.push(newAcc.getAddress())
  }

  for(let i=0; i<bobCount; i++){
    console.log(`Creating Bob ${i+1}`);
    await createBob(`Bob ${i+1}`);
  }
  
  console.log('API USERS:', apiUsers);
}


await ctcAlice.p.Alice({
  ready: ()=> {
    console.log('Alice is Ready!')
    startBobs(5);
  }
})
