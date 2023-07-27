function randomDougPic() {
    const num = Math.floor(Math.random() * 5);
    switch (num) {
        case 0:
            return { content: 'Happy Doug!', files: ['./images/happy_doug.jpg'] };
        case 1:
            return { content: 'Pilot Doug!', files: ['./images/pilot_doug.jpeg'] };
        case 2:
            return { content: 'Smart Doug!', files: ['./images/smart_doug.jpg'] };
        case 3:
            return { content: 'Smiley Doug!', files: ['./images/smiley_doug.jpeg'] };
        case 4:
            return { content: 'Thinking Doug!', files: ['./images/thinking_doug.jpeg'] };
        default:
    }
}

function randomDavidMsg() {
    const num = Math.floor(Math.random() * 5);
    switch (num) {
        case 0:
            return "I'm better than David.";
        case 1:
            return "I'm far better :muscle:";
        case 2:
            return 'What about me though?';
        case 3:
            return ':eyes:';
        case 4:
            return 'Please spell my name correctly...';
        default:
    }
}

exports.randomDougPic = randomDougPic;
exports.randomDavidMsg = randomDavidMsg;
