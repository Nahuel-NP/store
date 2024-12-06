
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';
import { db, Role, User } from 'astro:db';


export default async function seed() {


	const roles = [
		{
			id: 'admin',
			name: 'Admin'
		},
		{
			id: 'user',
			name: 'User'
		}
	]

	const johnDoe = {
		id: UUID(),
		name: 'John Doe',
		email: 'john.doe@example.com',
		password: bcrypt.hashSync('123456'),
		role: 'admin'
	}

	const janeDoe = {
		id: UUID(),
		name: 'Jane Doe',
		email: 'jane.doe@example.com',
		password: bcrypt.hashSync('123456'),
		role: 'user'
	}
	
	const nahuel ={
		id: UUID(),
		name: 'Nahuel Pedroso',
		email: 'pedroso.nahuel.dev@gmail.com',
		password: bcrypt.hashSync('123456'),
		role: 'user'

	}

	await db.insert(Role).values(roles);
	await db.insert(User).values([johnDoe, janeDoe,nahuel]);

}
