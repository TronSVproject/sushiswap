import type { VariablesOf } from 'gql.tada'

import { request, type RequestOptions } from 'src/lib/request'
import { graphql } from '../../graphql'
import { isSteerStrategy, type SteerStrategy } from '@sushiswap/steer-sdk'
import type { ChainId } from 'sushi'
import type { Address } from 'viem'

export const SmartPoolsQuery = graphql(
  `
  query SmartPools($chainId: Int!) {
    smartPools(chainId: $chainId) {
      id
      address
      chainId
      poolAddress
      address
      swapFee
      strategy
      protocol
      token0 {
        id
        chainId
        address
        name
        symbol
        decimals
      }
      token1 {
        id
        chainId
        address
        name
        symbol
        decimals
      }
      liquidityUSD
      vaultLiquidityUSD
      feeUSD1d
      feeApr1d
      feeAndIncentiveApr1d
      stakedApr1d
      stakedAndIncentiveApr1d
      incentiveApr
      wasIncentivized
      isIncentivized

      isEnabled
      wasEnabled
      isDeprecated
    }
  }
`,
)

export type GetSmartPools = VariablesOf<typeof SmartPoolsQuery>

export async function getSmartPools(
  variables: GetSmartPools,
  options?: RequestOptions,
) {
  const url = `https://data-api-production-acb1.up.railway.app/graphql/`

  const result = await request(
    { url, document: SmartPoolsQuery, variables },
    options,
  )

  if (result) {
    return result.smartPools
      .filter((v) => isSteerStrategy(v.strategy))
      .map((pool) => ({
        ...pool,
        chainId: pool.chainId as ChainId,
        id: pool.id as `${string}:0x${string}`,
        strategy: pool.strategy as SteerStrategy,
        token0: {
          id: pool.token0.id as `${string}:0x${string}`,
          address: pool.token0.address as Address,
          chainId: pool.token0.chainId as ChainId,
          decimals: pool.token0.decimals,
          name: pool.token0.name,
          symbol: pool.token0.symbol,
        },
        token1: {
          id: pool.token1.id as `${string}:0x${string}`,
          address: pool.token1.address as Address,
          chainId: pool.token1.chainId as ChainId,
          decimals: pool.token1.decimals,
          name: pool.token1.name,
          symbol: pool.token1.symbol,
        },
      }))
  }

  throw new Error('No smart pools found')
}

export type SmartPoolsV1 = Awaited<ReturnType<typeof getSmartPools>>
