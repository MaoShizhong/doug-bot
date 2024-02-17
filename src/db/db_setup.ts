import { connect, set } from 'mongoose';

export default async function (): Promise<void> {
    const { DB_URL, MODE } = process.env;
    if (MODE === 'dev') set('debug', true);

    try {
        if (!DB_URL) throw new Error('No MongoDB URL!');
        await connect(DB_URL);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
