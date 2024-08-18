import mongoose, { Schema, model, type Model } from 'mongoose';
import mongooseLong from 'mongoose-long';
import { STARTING_GOLD } from '../../constants/constants.js';
import {
    calculateDouggedPercentage,
    checkGoldClaimAvailability,
    checkIfLowGold,
    generateGoldString,
    generateInsufficientGoldMessage,
} from './virtuals.js';

mongooseLong(mongoose);

type Int64 = mongoose.Types.Long | number;

type UserVirtuals = {
    goldString: string;
    hasLowGold: string;
    douggedPercentage: number;
    canClaimGold: boolean;
    insufficientGoldMessage: string;
};

type UserModel = {
    _id: string;
    name: string;
    avatar: string;
    gold: Int64;
    lastGoldClaim: Int64;
    profileColor: number;
    messages: {
        total: number;
        dougged: number;
    };
} & UserVirtuals;

const servers: { [key: string]: string } = JSON.parse(process.env.SERVER_IDS ?? '{}');
const User: { [key: string]: Model<UserModel> } = {};

// Make separate collection for each server the bot is in
for (const [serverName, serverID] of Object.entries(servers)) {
    const UserSchema = new Schema<UserModel>(
        {
            _id: { type: String, required: true },
            name: { type: String, required: true },
            avatar: { type: String, required: true },
            gold: { type: Schema.Types.Long, default: STARTING_GOLD },
            lastGoldClaim: { type: Schema.Types.Long, default: 0 },
            profileColor: { type: Number, default: 0xffffff },
            messages: {
                total: { type: Number, default: 0 },
                dougged: { type: Number, default: 0 },
            },
        },
        { collection: `${serverName}-${serverID}`, versionKey: false }
    );

    UserSchema.virtual('goldString').get(generateGoldString);
    UserSchema.virtual('hasLowGold').get(checkIfLowGold);
    UserSchema.virtual('douggedPercentage').get(calculateDouggedPercentage);
    UserSchema.virtual('canClaimGold').get(checkGoldClaimAvailability);
    UserSchema.virtual('insufficientGoldMessage').get(generateInsufficientGoldMessage);

    User[serverID] = model<UserModel>(serverName, UserSchema);
}

export { User, type UserModel };
