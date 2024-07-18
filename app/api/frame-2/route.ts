import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const text = message.input || '';
  let state = {
    page: 0,
  };
  try {
    state = JSON.parse(decodeURIComponent(message.state?.serialized));
  } catch (e) {
    console.error(e);
  }

  /**
   * Use this code to redirect to a different page
   */
  if (message?.button === 3) {
    return NextResponse.redirect(
      'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
      { status: 302 },
    );
  }


  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
            action: 'link',
            label: 'Mint',
            target: `https://zora.co/collect/base:0x5d20bc7ede3858e340887a2cde0db030fc37af2d/2`,
            
          },

          {
            label: `Next`,
            target: `${NEXT_PUBLIC_URL}/api/frame-3`,
          },
      ],
     
      image: {
        src: `${NEXT_PUBLIC_URL}/mode.png`,
        aspectRatio: '1.91:1',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame-3`,

    }),
  );
}


export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
