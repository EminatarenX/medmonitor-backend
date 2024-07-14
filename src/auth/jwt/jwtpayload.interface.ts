export interface JWTPayload {
    sub: string;
    user: string;
    iat: number;
    exp: number;
    role?: string;
}