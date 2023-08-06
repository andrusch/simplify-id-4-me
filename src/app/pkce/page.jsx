'use client';
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import imageLaptop from '@/images/laptop.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'
import { SuccessMessage } from '../../components/ClientIdFormSuccess'
import { useState } from 'react';
import { JsonViewer } from '@textea/json-viewer';
import { dynamic } from 'next/dynamic';
import ClientIdForm from '../../components/ClientIdForm';

function Section({ title, image, children }) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function TokenResponse(props) {
  const { token } = props;
  return (
    <Section title="Token Response" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          First look at the response object you received back from your {' '}
          <strong className="font-semibold text-neutral-950">identity provider</strong>. 
          Notice whether it has an access_token and or an identity_token. Depending on the 
          scopes you requested, some or all of these properties exist.
        </p>
        <JsonViewer value={token} />
      </div>
    </Section>
  )
}

function AccessToken(props) {
  const { token } = props;
  const parts = token.split('.');
  return (
    <Section title="Access Token" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Now look at the access token you received.
        </p>
        <p>
          {token}
        </p>
        <JsonViewer value={JSON.parse(atob(parts[1]))} />
      </div>
    </Section>
  )
}

function IdToken(props) {
  const { token } = props;
  const parts = token.split('.');
  return (
    <Section title="Id Token" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Now look at the id token you received.
        </p>
        <p>
          {token}
        </p>
        <JsonViewer value={JSON.parse(atob(parts[1]))} />
      </div>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="Our values"
        title="Balancing reliability and innovation"
      >
        <p>
          We strive to stay at the forefront of emerging trends and
          technologies, while completely ignoring them and forking that old
          Rails project we feel comfortable using. We stand by our core values
          to justify that decision.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Meticulous">
            The first part of any partnership is getting our designer to put
            your logo in our template. The second step is getting them to do the
            colors.
          </GridListItem>
          <GridListItem title="Efficient">
            We pride ourselves on never missing a deadline which is easy because
            most of the work was done years ago.
          </GridListItem>
          <GridListItem title="Adaptable">
            Every business has unique needs and our greatest challenge is
            shoe-horning those needs into something we already built.
          </GridListItem>
          <GridListItem title="Honest">
            We are transparent about all of our processes, banking on the simple
            fact our clients never actually read anything.
          </GridListItem>
          <GridListItem title="Loyal">
            We foster long-term relationships with our clients that go beyond
            just delivering a product, allowing us to invoice them for decades.
          </GridListItem>
          <GridListItem title="Innovative">
            The technological landscape is always evolving and so are we. We are
            constantly on the lookout for new open source projects to clone.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}
const PKCE = () => {  
  const [tokenResponse, setTokenResponse] = useState('');
  const title=tokenResponse ? "Awesome, it worked!" :  "Learn how it works";
  return (
    <>
      <PageIntro eyebrow="OpenID Connect with PKCE" title={title}>
        {<ClientIdForm onTokenUpdate={(t) => {setTokenResponse(t);}} /> }
        {tokenResponse && <SuccessMessage />}
      </PageIntro>

      {tokenResponse && (
        <>
          <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
            <TokenResponse token={tokenResponse} />
            {tokenResponse && tokenResponse.access_token && <AccessToken token={tokenResponse.access_token }/> }
            {tokenResponse && tokenResponse.id_token && <IdToken token={tokenResponse.id_token }/> }
          </div>

          {/* <Values /> */}
          {/* <ContactSection /> */}
        </>
      )}
    </>
  )
}
export default PKCE;
