import client from '../client';
export default {
	Mutation: {
		createMenu: (_, { title, price }) =>
			client.coffee.create({
				data: {
					title,
					price,
				},
			}),
		deleteMenu: (_, { id }) => client.coffee.delete({ where: { id } }),
		updateMenu: (_, { id, price }) =>
			client.coffee.update({ where: { id }, data: { price } }),
	},
};
