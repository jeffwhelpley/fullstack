import {Collection, field} from '../service_decorators';
import {Model} from '../../core/interfaces';

@Collection({ name: 'user' })
export class User implements Model {

    @field({ required: true })
    _id: any;

    @field({ required: true, match: /^[a-zA-Z0-9\-_]+$/, minSize: 4, maxSize: 24 })
    username: string;

    @field({ required: true })
    usernameLower: string;

    previousUsernames: string[];
    usernamePrefix: string;

    @field({ required: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })
    email: string;

    @field({ required: true })
    emailLower: string;

    @field({ 'default': false })
    emailConfirmed: boolean;

    emailToken: string;
    ipAddress: string;
    phone: string;

    @field({ required: true, 'enum': ['facebook', 'google', 'token', 'local'] })
    authType: string;

    authToken: string;
    password: string;
    passwordToken: string;
    passwordTokenExpire: Date;
    failedPasswordAttempts: Date[];
    secret: string;
    socialToken: string;
    refreshToken: string;
    authId: string;
    googleAuthData: any;
    fbAuthData: any;
    profileImg: string;
    cdnProfileImg: string;
    gender: string;
    location: string;
    locale: string;
    timezone: string;
    deleteReason: string;

    name: {
        firstName: string;
        lastName: string;
        middleName: string;
        displayName: string;
    };

    @field({ required: true, 'enum': ['admin', 'user', 'partner'] })
    role: string;

    permissions: string[];

    // todo: add other fields
}
