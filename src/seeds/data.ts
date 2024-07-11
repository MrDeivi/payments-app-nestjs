import { ObjectId } from 'mongodb';

export const roles = [
	{
		"_id": new ObjectId("668c92824249a7de2b7e7504"),
		"name": "admin",
		"permissions": [
			"findAll_payment_request",
			"update_payment_request"
		]
	},
	{
		"_id": new ObjectId("668c92824249a7de2b7e7507"),
		"name": "user",
		"permissions": [
			"create_payment_request",
			"get_user_payments",
			"findById_payment_request"
		]
	}

]

export const users = [
	{
		"_id": new ObjectId("668dc395b9180ffe626d248d"),
		"_deleted": false,
		"name": "David Alfonso",
		"email": "dalfonsogcia@gmail.com",
		"passwordHash": "$2a$10$s0oy5EM2v.tfIcYR26JHQusIArzUcWdTt.RsEHlSSJJrC9SiosXBO",
		"roles": [
			new ObjectId("668c92824249a7de2b7e7504"),
			new ObjectId("668c92824249a7de2b7e7507")
		],
		"createdAt": "2024-07-09T23:11:17.954Z",
		"updatedAt": "2024-07-09T23:11:17.954Z",
	},
	{
		"_id": new ObjectId("668eedbe21b6fc736779097d"),
		"_deleted": false,
		"name": "Daniel",
		"email": "daniel@gmail.com",
		"passwordHash": "$2a$10$/xGJ1X8Ytbi3SnHiAB6Ol.lfRbR5w1gH.xbfbiVo9rbrU25vZuTLC",
		"roles": [
			new ObjectId("668c92824249a7de2b7e7507")
		],
		"createdAt": "2024-07-10T20:23:26.782Z",
		"updatedAt": "2024-07-10T20:23:26.782Z",
	}

]

export const balances = [
	{
		"_id": new ObjectId("668dc2214249a7de2b7e9626"),
		"currency": "EUR",
		"user": new ObjectId("668dc395b9180ffe626d248d"),
		"balance": 1465,
		"_deleted": false,
		"updatedAt": "2024-07-10T18:53:34.061Z"
	},
	{
		"_id": new ObjectId("668dc2214249a7de2b7e9629"),
		"currency": "USD",
		"user": new ObjectId("668dc395b9180ffe626d248d"),
		"balance": 1365,
		"_deleted": false,
		"updatedAt": "2024-07-10T19:10:01.988Z"
	}
]
