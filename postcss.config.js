// Turns px into rem when the site builds, so everything can grow on big screens.
// You keep writing px like normal. The size of 1rem is set in src/index.css (html font-size).
import pxtorem from 'postcss-pxtorem'

export default {
  plugins: [
    pxtorem({
      rootValue: 16,      // 16px = 1rem
      propList: ['*'],    // convert every property
      minPixelValue: 2,   // leave 1px lines alone
      mediaQuery: false,  // breakpoints stay in px
    }),
  ],
}
