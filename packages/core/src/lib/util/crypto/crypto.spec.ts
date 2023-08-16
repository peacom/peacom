import {decryptPrivate, encryptPublic} from "./crypto.util";


describe('string.util', () => {
  it('encrypt', () => {
    const dateStr = '2022'
    console.log(encryptPublic(dateStr))
  });
  it('decrypt', () => {
    const dataStr = 'gB2La9P5ARTAjy39DajtqIHZr3OT8rnsbrkZ1muXLs7Qjv0UEQWmZF8FNdfAwgH40Cs4aL0JJWD6hicmEGkkeu8zj1UUATFx4Fnn95pgqGjw9f+jNa+CgkOAaxp0+bEzjVWtHUK8HP4xznveffHB/eC9pbt/k2RWZVkT1KrpY6c=\n'
    console.log(decryptPrivate(dataStr, '/Users/lecanh/Documents/Project/Vietnam/Peacom/peacom/packages/core/data/peacom.priv.pem'))
  })
})
