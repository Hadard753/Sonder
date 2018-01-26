import {Document, model, Model, Schema, Promise} from "mongoose";
import {isEmail} from 'validator';
import * as passwordHash from 'password-hash';
import * as jwt from 'jsonwebtoken';
import * as _ from 'underscore';

import {TOKEN_SECRET} from '../config';
import {User} from '../interfaces/user';

export interface UserDocument extends User,Document {
    // declare any instance methods here
    generateAuthToken(): Promise<string>;
}

export interface UserModelInterface extends Model<UserDocument> {
    // declare any static methods here
    findByToken(token: string): Promise<UserDocument>; // this should be changed to the correct return type if possible.
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

UserSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) {
        user.password = passwordHash.generate(user.password);
    }        
    next();
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
};

UserSchema.statics.findByToken = function (token: string): Promise<UserDocument> {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, TOKEN_SECRET);
    } catch (error) {
        return Promise.reject();
    }
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

// export const UserModel: Model<UserDocument> = model<UserDocument>('User', UserSchema);

// Note the type on the variable, and the two type arguments (instead of one).
export const UserModel: UserModelInterface = model<UserDocument, UserModelInterface>('User', UserSchema);