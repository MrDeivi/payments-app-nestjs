import { ObjectId } from 'mongodb';

export const roles = [
	{
		_id: new ObjectId('668c92824249a7de2b7e7504'),
		name: 'admin',
		permissions: [''],
	},
	{
		_id: new ObjectId('668c92824249a7de2b7e7507'),
		name: 'user',
		permissions: ['create_payment_request'],
	},
]

export const users = [
	{
		"_id": new ObjectId("668ca7dd4249a7de2b7e7a9f"),
		"name": "Alice Johnson",
		"email": "alice.johnson@example.com",
		"passwordHash": "$2b$10$KIXQWZSBv1jljUe5z1mEiO5/ntIab34JcP.8zS1EdxZK0S2b7/b8G",
		"roles": [new ObjectId("668c92824249a7de2b7e7504")]
	},
	{
		"_id": new ObjectId("668ca7dd4249a7de2b7e7aa2"),
		"name": "Bob Smith",
		"email": "bob.smith@example.com",
		"passwordHash": "$2b$10$RibozvF9jH6.x5/VLgPRGO5c0X/4eRyT3GjfwafNqCl4Zg.PiUu6C",
		"roles": [new ObjectId("668c92824249a7de2b7e7507")]
	},
	{
		"_id": new ObjectId("668ca7dd4249a7de2b7e7aa5"),
		"name": "Charlie Brown",
		"email": "charlie.brown@example.com",
		"passwordHash": "$2b$10$wqT/N4aIHIKMvWTj5N6OzuZGGcSsa/rhoO.4eyS93u74/v56mO8ti",
		"roles": [new ObjectId("668c92824249a7de2b7e7507")]
	}
]

export const balances = [
	{ user: "668ca7dd4249a7de2b7e7a9f", balance: 1500, currency: 'USD' },
	{ user: "668ca7dd4249a7de2b7e7aa2", balance: 2000, currency: 'USD' },
	{ user: "668ca7dd4249a7de2b7e7aa5", balance: 400, currency: 'USD' },
]
