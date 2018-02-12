/// <reference types="mongoose" />
import { Document, Model } from "mongoose";
import { User } from '../interfaces/user';
export interface UserDocument extends User, Document {
    generateAuthToken(): Promise<string>;
    removeToken(token: string): Promise<void>;
}
export interface UserModelInterface extends Model<UserDocument> {
    findByToken(token: string): Promise<UserDocument>;
    findByCredentials(email: string, password: string): Promise<UserDocument>;
}
export declare const UserModel: UserModelInterface;
