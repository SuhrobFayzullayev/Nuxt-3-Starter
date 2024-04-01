export default (
  value: string,
  mask: string,
  masked = true,
  tokens: { [key: string]: any }
) => {
  value = value || "";
  mask = mask || "";
  let iMask = 0;
  let iValue = 0;
  let output = "";
  while (iMask < mask.length && iValue < value.length) {
    let cMask = mask[iMask];
    const masker = tokens[cMask];
    const cValue = value[iValue];
    if (masker && !masker.escape) {
      if (masker.pattern.test(cValue)) {
        output += masker.transform ? masker.transform(cValue) : cValue;
        iMask++;
      }
      iValue++;
    } else {
      if (masker && masker.escape) {
        iMask++;
        cMask = mask[iMask];
      }
      if (masked) {
        output += cMask;
      }
      if (cValue === cMask) {
        iValue++;
      }
      iMask++;
    }
  }
  let restOutput = "";
  if (masked) {
    while (iMask < mask.length) {
      const cMask = mask[iMask];
      if (tokens[cMask]) {
        restOutput = "";
        break;
      }
      restOutput += cMask;
      iMask++;
    }
  }
  return output + restOutput;
};
