import {Document, model, Model, Schema} from "mongoose";
import {isEmail} from 'validator';
import * as jwt from 'jsonwebtoken';
import * as _ from 'underscore';

import {TOKEN_SECRET} from '../config';
import {User} from '../interfaces/user';

export interface UserDocument extends User,Document {
    generateAuthToken(): Promise<string>;
}

var UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 4,
        unique: true,
        validate: {
            validator: isEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, TOKEN_SECRET);

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
}

export const UserModel: Model<UserDocument> = model<UserDocument>('User', UserSchema);
