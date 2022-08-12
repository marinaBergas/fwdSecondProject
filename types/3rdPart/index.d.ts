import _ from 'lodash';
declare module 'lodash'{
    interface LoDashStatic {
        /**
         * Multiply two numbers.
         * @param multiplier The first number in a multiplication.
         * @param multiplicand The second number in a multiplication.
         * @returns Returns the product.
         */
        multiply(multiplier: (number|string), multiplicand: number): number;
    }
}