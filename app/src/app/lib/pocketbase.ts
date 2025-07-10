import PocketBase from 'pocketbase';

const client = new PocketBase(process.env.NEXT_PUBLIC_PB_URL || 'http://127.0.0.1:8080');

export default client;