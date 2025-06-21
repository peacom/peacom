import {getHostName} from "./system.util";
import { toLowerCaseNonAccentVietnamese, toNonAccentVietnamese } from '@peacom/model';

describe('system.util', () => {

  it("getHostName", () => {
    console.log(getHostName())
  })
  it("toLowerCaseNonAccentVietnamese", () => {
    console.log(toLowerCaseNonAccentVietnamese("a"));
    console.log(toNonAccentVietnamese("à"));
  })
});
