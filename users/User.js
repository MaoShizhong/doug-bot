const { gold } = require('../emojis/general_emojis.js');

class User {
    static goldClaimCooldownInMS = 3600000;
    static goldClaimAmount = 500;
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
        douggedPercentage = '00.00%',
        gold = 250,
        lastGoldClaim = 0,
        profileColor = 0xffffff
    ) {
        this.name = name;
        this.id = id;
        this.avatar = avatar;
        this.totalMessages = totalMessages;
        this.douggedMessages = douggedMessages;
        this.douggedPercentage = douggedPercentage;
        this.gold = gold;
        this.lastGoldClaim = lastGoldClaim;
        this.profileColor = profileColor;
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
        this.updateDougPercentage();
    }

    increaseDougMessages() {
        this.douggedMessages++;
        this.updateDougPercentage();
    }

    updateDougPercentage() {
        const proportion = this.douggedMessages / this.totalMessages;
        this.douggedPercentage =
            proportion === 1
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
        console.log(currentTime);

        return currentTime - this.lastGoldClaim >= User.goldClaimCooldownInMS;
    }

    get insufficientGoldMessage() {
        return {
            content: `Not enough${gold}! You currently have ${this.gold.toLocaleString(
                'en-US'
            )}${gold}`,
            allowedMentions: { repliedUser: false },
        };
    }
}

exports.User = User;
