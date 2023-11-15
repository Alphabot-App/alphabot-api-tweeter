import { config } from 'dotenv-flow';
// import fetch, { Headers } from 'node-fetch';
import { sendRaffleTweet } from './tweet.js';

config();

const go = async () => {
  const slug =
    'birthmark-tiki-calendar-15x-guaranteed-and-75x-allowlist-gielpn';
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
};

go().then(() => process.exit(0));
