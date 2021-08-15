import pkg from 'ts-jest/utils/index.js'
import { readJSONFileSync } from 'extra-filesystem'

const { pathsToModuleNameMapper } = pkg
const { compilerOptions } = readJSONFileSync('./tsconfig.base.json')

export default {
  preset: 'ts-jest/presets/default-esm'
, globals: {
    'ts-jest': {
      useESM: true
    }
  }
, testEnvironment: 'node'
, resolver: 'jest-ts-webcompat-resolver'
, testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)']
, moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
}
