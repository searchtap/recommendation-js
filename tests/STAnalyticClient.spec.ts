import {suite, test, timeout} from "mocha-typescript";
import StEventTrackingClient from "../src/StEventTrackingClient";
import {expect} from 'chai'

const nock = require('nock');

@suite("STAnalyticClientSpec", timeout(100000))
export class STAnalyticClientSpec {

  before() {
    require('dotenv').config({path: `./.env.default`})
  }

  @test("test tracking server url")
  async testStAnalytics() {
   expect(process.env.ST_TRACKING_SERVER).equals("http://localhost:3004/v2")
  }
}