import { CookieOptions, Response } from "express"
import { NODE_ENV } from "../constants/env.js"
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date.js"

export const REFRESH_PATH = "/auth"

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: NODE_ENV !== "development",
}

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
})

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
})

type Params = {
  res: Response
  accessToken: string
  refreshToken: string
}

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions())

export const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { ...defaults, path: REFRESH_PATH })
