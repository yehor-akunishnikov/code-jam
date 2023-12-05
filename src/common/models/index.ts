export interface RequestWithAuthPayload extends Request {
    user: {
        username: string
    },
}