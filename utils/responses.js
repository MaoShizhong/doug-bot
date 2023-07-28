const dougPics = [
    { content: 'Happy Doug!', files: ['./images/happy_doug.jpg'] },
    { content: 'Pilot Doug!', files: ['./images/pilot_doug.jpeg'] },
    { content: 'Smart Doug!', files: ['./images/smart_doug.jpg'] },
    { content: 'Smiley Doug!', files: ['./images/smiley_doug.jpeg'] },
    { content: 'Thinking Doug!', files: ['./images/thinking_doug.jpeg'] },
];

const davidMsgs = [
    "I'm better than David.",
    "I'm far better :muscle:",
    'What about me though?',
    ':eyes:',
    'Please spell my name correctly...',
];

function randomResponse(person) {
    const responses = person === 'doug' ? dougPics : davidMsgs;
    const randomIndex = ~~(Math.random() * responses.length);
    return responses[randomIndex];
}

exports.randomResponse = randomResponse;
