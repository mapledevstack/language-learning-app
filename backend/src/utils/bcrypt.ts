import bcrypt from "bcrypt"

export const hashValue = async (value: string, saltRounds: number = 10) =>
  bcrypt.hash(value, saltRounds)

export const compareValue = async (value: string, hashValue: string) =>
  bcrypt.compare(value, hashValue)
