import mongoose, { Schema, model } from 'mongoose';
import mongooseLong from 'mongoose-long';
import { STARTING_GOLD } from '../../constants/constants';
import servers from '../../server_IDs.json' with { type: 'json' };
import { calculateDouggedPercentage, checkGoldClaimAvailability, checkIfLowGold, generateGoldString, generateInsufficientGoldMessage, } from './virtuals';
mongooseLong(mongoose);
const User = {};
// Make separate collection for each server the bot is in
for (const [serverName, serverID] of Object.entries(servers)) {
    const UserSchema = new Schema({
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
    }, { collection: `${serverName}-${serverID}`, versionKey: false });
    UserSchema.virtual('goldString').get(generateGoldString);
    UserSchema.virtual('hasLowGold').get(checkIfLowGold);
    UserSchema.virtual('douggedPercentage').get(calculateDouggedPercentage);
    UserSchema.virtual('canClaimGold').get(checkGoldClaimAvailability);
    UserSchema.virtual('insufficientGoldMessage').get(generateInsufficientGoldMessage);
    User[serverID] = model(serverName, UserSchema);
}
export { User };
