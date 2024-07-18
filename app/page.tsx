import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Get & Claim Airdrop',
    },
    
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/banner.png`,
    aspectRatio: '1.91:1',
  },
  
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: '5 New Potential Aidrop',
  description: '5 Potential Airdrop',
  openGraph: {
    title: '5 New Potential Airdrop.xyz',
    description: '5 Potential Airdrop',
    images: [`${NEXT_PUBLIC_URL}/banner.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>5 New Potential Airdrop</h1>
    </>
  );
}
