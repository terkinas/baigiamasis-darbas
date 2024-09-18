import { IClientMessage } from "../../types/client/message.interface";
import prisma from "../../utils/prisma";


export class LivechatRepository {

    async recentMessages(): Promise<IClientMessage[] | undefined>{
        try {
            const messages = await prisma.message.findMany({
                take: 10,
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            })

            return messages;
        } catch (error) {
            console.error('Error while getting recent messages:', error);
            if (error instanceof Error) {
                throw error;
            }
        }
    }

    async addMessage({ userId, message }: { userId: string, message: string }): Promise<IClientMessage | undefined> {
        try {
            const newMessage = await prisma.message.create({
                data: {
                    content: message,
                    userId
                },
                select: {
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            });

            return newMessage;
        } catch (error) {
            console.error('Error while adding message:', error);
            if (error instanceof Error) {
                throw error;
            }
        }
    }

}