/** @format */

import { gql } from "@apollo/client";

export const CATEGORY = gql`
  query ($input: CategoryInput) {
    category(input: $input ){
      products{
        id
        name
        gallery
        prices {
          currency{
            symbol
            label
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        category
        inStock
      }
    }
}
`;

export const PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      brand
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
}
`;

// export const CATEGORIES = gql`
//   query {
//     categories {
//       name
//     }
// }
// `;

export const CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
}
`