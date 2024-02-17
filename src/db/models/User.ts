import { Schema, model, type Model } from 'mongoose';
import { STARTING_GOLD } from '../../constants/constants';
import * as servers from '../../server_IDs.json' with { type: 'json' };
import {
    calculateDouggedPercentage,
    checkGoldClaimAvailability,
    checkIfLowGold,
    generateGoldString,
    generateInsufficientGoldMessage,
} from './virtuals';

type UserVirtuals = {
    goldString: () => string;
    hasLowGold: () => string;
    douggedPercentage: () => number;
    canClaimGold: () => boolean;
    insufficientGoldMessage: () => string;
};

type UserModel = {
    discord_id: string;
    name: string;
    avatar: string;
    gold: number;
    lastGoldClaim: number;
    profileColor: number;
    messages: {
        total: number;
        dougged: number;
    };
} & UserVirtuals;

const serverModels: { [key: string]: Model<UserModel> } = {};

for (const [serverName, serverID] of Object.entries(servers)) {
    const UserSchema = new Schema<UserModel>(
        {
            discord_id: { type: String, required: true },
            name: { type: String, required: true },
            avatar: { type: String, required: true },
            gold: { type: Number, default: STARTING_GOLD },
            lastGoldClaim: { type: Number, default: 0 },
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

    serverModels[serverID] = model<UserModel>(serverName, UserSchema);
}

export { serverModels, type UserModel };
