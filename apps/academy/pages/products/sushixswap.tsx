import { LinkIcon } from '@heroicons/react/24/outline'
import {
  ArbitrumCircle,
  AvalancheCircle,
  BinanceCircle,
  Button,
  classNames,
  Container,
  EthereumCircle,
  FantomCircle,
  HarmonyCircle,
  Link,
  MoonbeamCircle,
  MoonriverCircle,
  OptimismCircle,
  PolygonCircle,
  Typography,
} from '@sushiswap/ui'
import {
  ProductArticles,
  ProductBackground,
  ProductCards,
  ProductFaq,
  ProductStats,
  ProductTechnicalDoc,
} from 'common/components'
import { defaultSidePadding } from 'common/helpers'
import {
  AcademyIcon,
  MoneyBagIcon,
  MoneyHandIcon,
  MoneyTreeIcon,
  PuzzlePieceIcon,
  TilesIcon,
  WideTriangle,
} from 'common/icons'
import { getLatestAndRelevantArticles, getProducts } from 'lib/api'
import { InferGetStaticPropsType } from 'next'
import { FC } from 'react'
import useSWR from 'swr'

import { ArticleEntity } from '.mesh'

const productSlug = 'sushixswap'
const color = '#FF9A5F'
const accentColor = '#C56D3A'
const productStats = [
  { value: '20', name: 'Projects Launched' },
  { value: '$500m', name: 'Funds Raised' },
  { value: '13k', name: 'Users Participated' },
  { value: '$4m', name: 'Volume Generated' },
]
const cards = [
  {
    Icon: () => <AcademyIcon color={accentColor} Icon={TilesIcon} />,
    title: 'Utilize funds in multiple DeFi apps',
    subtitle:
      'Bento’s innovation is its ability to track the user’s deposits via artificial balance, which is used to account for their idle funds...',
  },
  {
    Icon: () => <AcademyIcon color={accentColor} Icon={MoneyTreeIcon} />,
    title: 'Earn some of the highest yield in DeFi',
    subtitle: 'Being the foundation for multiple DeFi apps, Bentobox can attract more capital than simple vaults.',
  },
  {
    Icon: () => <AcademyIcon color={accentColor} Icon={MoneyHandIcon} />,
    title: 'Flashloans',
    subtitle:
      'The funds in Bento can also be used in flash loans, which can add more passive value to the user’s underutilized capital.',
  },
  {
    Icon: () => <AcademyIcon color={accentColor} Icon={PuzzlePieceIcon} />,
    title: 'Plug’n’play interest pools for your DeFi app',
    subtitle: 'Build your own DeFi apps on top of Bento, to instantly utilize the 500m+ TVL',
  },
  {
    Icon: () => <AcademyIcon color={accentColor} Icon={MoneyBagIcon} />,
    title: 'Capital efficiency',
    subtitle: 'Profit from efficiencies of a growing protocol, by saving on gas fees on each dApp deployed on Bento.',
  },
  {
    Icon: () => <AcademyIcon color={accentColor} Icon={MoneyBagIcon} />,
    title: 'Capital efficiency',
    subtitle: 'Profit from efficiencies of a growing protocol, by saving on gas fees on each dApp deployed on Bento.',
  },
  {
    Icon: () => <AcademyIcon color={accentColor} Icon={MoneyBagIcon} />,
    title: 'Capital efficiency',
    subtitle: 'Profit from efficiencies of a growing protocol, by saving on gas fees on each dApp deployed on Bento.',
  },
  {
    Icon: () => <AcademyIcon color={accentColor} Icon={MoneyBagIcon} />,
    title: 'Capital efficiency',
    subtitle: 'Profit from efficiencies of a growing protocol, by saving on gas fees on each dApp deployed on Bento.',
  },
]

const chains = [
  { Icon: EthereumCircle, name: 'Ethereum', url: 'https://app.sushi.com/miso' },
  { Icon: OptimismCircle, name: 'Optimism', url: '' },
  { Icon: ArbitrumCircle, name: 'Arbitrum', url: 'https://arbitrum.sushi.com/miso' },
  { Icon: FantomCircle, name: 'Fantom', url: 'https://fantom.sushi.com/miso' },
  { Icon: BinanceCircle, name: 'Binance', url: 'https://bsc.sushi.com/miso' },
  { Icon: AvalancheCircle, name: 'Avalanche', url: 'https://avalanche.sushi.com/miso' },
  { Icon: PolygonCircle, name: 'Polygon', url: 'https://polygon.sushi.com/miso' },
  { Icon: HarmonyCircle, name: 'Harmony', url: 'https://harmony.sushi.com/miso' },
  { Icon: MoonbeamCircle, name: 'Moonbeam', url: 'https://moonbeam.sushi.com/miso' },
  { Icon: MoonriverCircle, name: 'Moonriver', url: 'https://moonriver.sushi.com/miso' },
]

const faq = [
  {
    question: 'Lorem Ipsum',
    answer: (
      <>
        <Typography>
          Trident is a production framework for building and deploying AMMs, but it is not an AMM itself. While AMMs can
          be created using the Trident code, there isn’t a specific AMM at the center of Trident. Instead, there is a
          framework for creating any AMM anyone would ever need.
        </Typography>
        <Typography className="mt-9">Trident is able to produce the following pool types:</Typography>
        <ul className="list-disc list-inside">
          <li>
            <Typography weight={700} className="text-white" as="span">
              Classic pool{' '}
            </Typography>
            <Typography as="span">
              = constant product pool (x * y = k). Classic pools are composed 50% of one token and 50% of another.
              They’re best for pairing tokens that are unpredictable.
            </Typography>
          </li>
          <li>
            <Typography weight={700} className="text-white" as="span">
              Concentrated pool{' '}
            </Typography>
            <Typography as="span">
              = these pools also use two tokens. The difference is that the liquidity in each pool is determined by the
              ranges set by the pool creator.
            </Typography>
          </li>
          <li>
            <Typography weight={700} className="text-white" as="span">
              Stable pools{' '}
            </Typography>
            <Typography as="span">
              = are ideal for pooling “like-kind” assets. These tokens are usually stable coins like USDC and USDT, or
              other pegged tokens like ETH and stETH, or renBTC and WBTC.
            </Typography>
          </li>
          <li>
            <Typography weight={700} className="text-white" as="span">
              Index pools{' '}
            </Typography>
            <Typography as="span">
              = these pools are usually used to create baskets of assets or decentralized index funds; hence the name.
              These pools can be made of any percentage of tokens equalling 100.
            </Typography>
          </li>
        </ul>
      </>
    ),
  },
]

export const getStaticProps = async () => {
  const data = await getProducts({ filters: { slug: { eq: productSlug } } })
  const product = data?.products?.data?.[0].attributes

  return { props: product }
}

const ProductPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  name,
  url,
  description,
  slug,
  relevantArticleIds,
}) => {
  const { data, isValidating } = useSWR(
    [`/bentobox-articles`],
    async () => await getLatestAndRelevantArticles(slug, relevantArticleIds),
    { revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false }
  )

  const latestArticles = (data?.articles?.data ?? []) as ArticleEntity[]
  const relevantArticles = (data?.relevantArticles?.data ?? []) as ArticleEntity[]

  return (
    <Container maxWidth="6xl" className={classNames('mx-auto pt-10 pb-24', defaultSidePadding)}>
      <ProductBackground color={color} />
      <section className="py-[75px]">
        <h1 className="leading-[78px] flex gap-2 text-6xl font-bold text-slate-50">
          <span>Sushi</span>
          <span className="flex items-center">
            <WideTriangle fill="#F7EA75" className="-mr-2" />
            X
            <WideTriangle fill="#FF9A5F" className="-ml-2 rotate-180" />
          </span>
          <span>Swap</span>
        </h1>
        <h3 className="mt-1.5 text-2xl font-medium text-gray-500">{description}</h3>

        <Link.External href={url}>
          <Button
            size="lg"
            className="mt-16 rounded-lg"
            startIcon={<LinkIcon width={20} height={20} strokeWidth={2} />}
          >
            <Typography weight={500}>Link to SushiXSwap</Typography>
          </Button>
        </Link.External>
        <ProductStats productStats={productStats} />
      </section>
      <ProductCards
        name={name}
        description="BentoBox is unique token vault that generates yield (interest) on your tokens, while also allowing you to utilize them in DeFi protocols like lending markets ir liquidity pools."
        cards={cards}
        gradientBorderColor={color}
      />
      <ProductArticles
        title="Articles"
        subtitle="Read more about the latest releases"
        articles={latestArticles}
        productName={productSlug}
        isLoading={isValidating}
      />
      <section className="py-[75px] flex items-center flex-col gap-[70px]">
        <h3 className="text-4xl font-bold">Chains you can trade on</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {chains.map(({ Icon, name }) => (
            <div key={name} className="pl-2.5 pr-5 h-[68px] bg-slate-800 rounded-3xl flex gap-4 items-center">
              <div className="w-12 h-12 overflow-hidden rounded-xl">
                <Icon />
              </div>
              <span className="text-2xl font-bold">{name}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="py-[75px] flex items-center">
        <div className="py-10 px-[60px] bg-slate-800 rounded-[20px] flex flex-col items-center gap-[70px] mx-auto">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-slate-50">Trade and Earn Yield on any chain</h3>
            <p className="mt-2 text-lg text-slate-400">
              To use Sushi on these chains, follow our unique chainlinks. For Miso eg. head over to:
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-[60px] gap-y-7">
            {chains.map(({ Icon, name, url }) => (
              <div key={name} className="px-2.5 h-[82px] flex gap-6 items-center">
                <div className="w-12 h-12 overflow-hidden rounded-xl">
                  <Icon />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{name}</span>
                  <a
                    href={url}
                    rel="noreferrer"
                    target="_blank"
                    className="text-lg text-slate-400 hover:underline hover:text-blue-500"
                  >
                    {url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProductArticles
        title={`Learn about ${name}`}
        subtitle="Check out our tutorials and explainers"
        articles={relevantArticles}
        productName={productSlug}
        isLoading={isValidating}
      />
      <ProductTechnicalDoc color={color} secondaryColor="#FEC464" />
      <ProductFaq faq={faq} />
    </Container>
  )
}

export default ProductPage
