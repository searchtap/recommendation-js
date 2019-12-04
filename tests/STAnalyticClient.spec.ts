import {suite, test, timeout} from "mocha-typescript";
import StRecommendationTracker from "../src/StRecommendationTracker";
import {expect} from 'chai'

const nock = require('nock');

@suite("STRecommendationClientSpec", timeout(100000))
export class STRecommendationClientSpec {

  before() {
    require('dotenv').config({path: `./.env.default`})
  }

  @test("test tracking server url")
  async testStAnalytics() {
   expect(process.env.ST_TRACKING_SERVER).equals("http://localhost:3000/v2")
  }
}