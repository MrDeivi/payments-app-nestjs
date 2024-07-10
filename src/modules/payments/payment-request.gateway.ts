import { OnEvent } from '@nestjs/event-emitter'
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: '*' } })
export class PaymentsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
	@WebSocketServer()
	server: Server

	@SubscribeMessage('connect')
	handleEvent(@MessageBody() data: string): boolean {
		return true;
	}

	//  Hears new event from consumer
	@OnEvent('updatedPayment')
	async updatedPayment({ paymentRequest }) {
		// NOTE: In a real app secure this with authentication over websockets 
		// Only the user that made the payment should receive this event :)
		this.server.emit('updatedPayment', paymentRequest)
	}

	handleConnection(client: any, ...args: any[]) {
		console.log('User connected')
	}

	handleDisconnect(client: any) {
		console.log('User disconnected')
	}

	afterInit(server: any) {
		console.log('Socket is live')
	}
}
