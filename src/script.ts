import { config } from 'dotenv-flow';
// import fetch, { Headers } from 'node-fetch';
import { sendRaffleTweet } from './tweet.js';

config();

const go = async () => {
  const slugs = ['final-bosu-4x-wl-o9e29v', 'groopys-world-35x-wl-alik0j'];

  for (const slug of slugs) {
    const raffleResp = await fetch(
      `https://api.alphabot.app/v1/raffles/${slug}`,
      {
        headers: new Headers({
          authorization: `Bearer ${process.env.ALPHABOT_API_KEY}`,
        }),
      }
    );

    const json = (await raffleResp.json()) as any;

    if (!json?.data?.raffle) {
      console.log('INVALID RAFFLE RESPONSE', json);
      return;
    }

    console.log('TWEETING', json.data.raffle);

    await sendRaffleTweet(json.data.raffle);
  }
};

go().then(() => process.exit(0));
