import {formatDateTimeTZ, FormError} from "@peacom/core";
import {FieldError} from "./FieldError";

describe('field.error', () => {
  it('from JSON', () => {
    try {
      throw new FormError({name: 'test', code: 'abc', message: '1234'})
    } catch (e) {
      console.log(e)
    }
  });
  it('From FIELD ERROR', () => {
    try {
      throw new FormError(new FieldError('test', 'abc', '1234'));
    } catch (e) {
      console.log(e)
    }
  });
})
