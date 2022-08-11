import bcrypt from 'bcryptjs'

function hashSynced(passwords: string) {
   return bcrypt.hashSync(passwords, 10);
}

export async function hashPassword(myPlaintextPassword: string){
   return bcrypt.hashSync(myPlaintextPassword, 10);
}

export async function comparePassword(inputtedPassword: string, realPassword: string) {
   return bcrypt.compareSync(inputtedPassword, realPassword)
}
