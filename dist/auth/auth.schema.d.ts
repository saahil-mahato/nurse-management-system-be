import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';
export type authDocument = HydratedDocument<Auth>;
export declare class Auth {
    user: User;
    passwordHash: string;
}
export declare const AuthSchema: mongoose.Schema<Auth, mongoose.Model<Auth, any, any, any, any>, {}, {}, {}, {}, "type", Auth>;
