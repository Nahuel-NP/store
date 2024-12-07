
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';
import { db, Role, User, Product, ProductImage } from 'astro:db';
import { seedProducts } from './seed-data';


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

	const nahuel = {
		id: UUID(),
		name: 'Nahuel Pedroso',
		email: 'pedroso.nahuel.dev@gmail.com',
		password: bcrypt.hashSync('123456'),
		role: 'admin'

	}

	await db.insert(Role).values(roles);
	await db.insert(User).values([johnDoe, janeDoe, nahuel]);


	const queries: any = [];

	seedProducts.forEach(product => {
		const newProduct = {
			id: UUID(),
			description: product.description,
			stock: product.stock,
			price: product.price,
			sizes: product.sizes.join(','),
			slug: product.slug,
			tags: product.tags.join(','),
			title: product.title,
			type: product.type,
			gender: product.gender,
			user: nahuel.id
		};

		queries.push(db.insert(Product).values(newProduct));

		product.images.forEach(image => {
			const newImage = {
				id: UUID(),
				productID: newProduct.id,
				image
			};

			queries.push(db.insert(ProductImage).values(newImage));
		});
	})

	await db.batch(queries)
}
