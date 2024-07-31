import type { MultiRoute, RPool, RouteLeg } from '../../tines/index.js'
import { LiquidityProviders } from '../liquidity-providers/index.js'

// TODO: optimize RP6 if-else
export enum RP6PoolType {
  UniV2 = 0,
  UniV3 = 1,
  UniV4 = 2,
  Curve = 3,
  WrapNative = 4,
  BentoBridge = 5,
  Trident = 6,
}

// RPool extention for RP coding
export abstract class PoolCode {
  pool: RPool
  liquidityProvider: LiquidityProviders
  poolName: string

  constructor(
    pool: RPool,
    liquidityProvider: LiquidityProviders,
    poolName: string,
  ) {
    this.pool = pool
    this.liquidityProvider = liquidityProvider
    this.poolName = poolName
  }

  static RouteProcessorAddress = 'RouteProcessor'

  // the address where should be swap amount of liquidity before the swap
  // returns RouteProcessorAddress if it is a RouteProcessor
  getStartPoint(_leg: RouteLeg, _route: MultiRoute): string {
    return this.pool.address
  }

  abstract getSwapCodeForRouteProcessor(
    leg: RouteLeg,
    route: MultiRoute,
    to: string,
    exactAmount?: bigint,
  ): string

  getSwapCodeForRouteProcessor2(
    _leg: RouteLeg,
    _route: MultiRoute,
    _to: string,
  ): string {
    return 'unimplemented'
  }

  getSwapCodeForRouteProcessor4(
    leg: RouteLeg,
    route: MultiRoute,
    to: string,
  ): string {
    return this.getSwapCodeForRouteProcessor2(leg, route, to)
  }
}
