import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export const metadata = {
  description:
    'Sometimes learning authentication flows is tough. We make it easy by providing tools to help you get started fast!',
}

export default async function Home() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Identity should be easy.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Sometimes learning authentication flows is tough. We make it easy by
            providing tools to help you get started fast!
          </p>
        </FadeIn>
      </Container>
    </>
  )
}
