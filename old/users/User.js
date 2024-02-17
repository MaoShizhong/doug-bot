const { gold } = require('../emojis/general_emojis.js');

class User {
    static lowGoldThreshold = 100000;
    static goldClaimCooldownInMS = 3600000;
    static goldClaimAmount = 250;
    static users = [];

    static createUser(member) {
        const name = member.nickname ?? member.user.username;
        const id = member.user.id;
        const avatar = member.user.displayAvatarURL();
        User.users.push(new User(name, id, avatar));
    }

    constructor(
        name,
        id,
        avatar,
        totalMessages = 0,
        douggedMessages = 0,
        gold = 250,
        lastGoldClaim = 0,
        profileColor = 0xffffff
    ) {
        this.name = name;
        this.id = id;
        this.avatar = avatar;
        this.totalMessages = totalMessages;
        this.douggedMessages = douggedMessages;
        this.gold = gold;
        this.lastGoldClaim = lastGoldClaim;
        this.profileColor = profileColor;
    }

    get goldString() {
        return this.gold.toLocaleString('en-GB');
    }

    get hasLowGold() {
        return this.gold < User.lowGoldThreshold;
    }

    giveGold(gold) {
        this.gold += gold;
    }

    takeGold(gold) {
        if (this.gold >= gold) {
            this.gold -= gold;
        } else {
            throw 'Not enough gold!';
        }
    }

    increaseTotalMessages() {
        this.totalMessages++;
    }

    increaseDougMessages() {
        this.douggedMessages++;
    }

    get douggedPercentage() {
        const proportion = this.totalMessages ? this.douggedMessages / this.totalMessages : 0;
        return proportion === 1
            ? '100.0%'
            : proportion
                  .toLocaleString('en-GB', {
                      trailingZeroDisplay: 'auto',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      style: 'percent',
                  })
                  .padStart(6, '0');
    }

    get hasGoldClaimAvailable() {
        const currentTime = Date.now();

        return currentTime - this.lastGoldClaim >= User.goldClaimCooldownInMS;
    }

    get insufficientGoldMessage() {
        return {
            content: `Not enough${gold}! You currently have ${this.goldString}${gold}`,
            allowedMentions: { repliedUser: false },
        };
    }
}

exports.User = User;
