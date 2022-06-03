import { gql } from '@apollo/client';

export const zipCodeService = {
  getZipCodeInfo: () => gql`
    query GetZipCodeInfo($countryCode: String!, $zipCode: String!) {
      zipCodeInfo(countryCode: $countryCode, zipCode: $zipCode) {
        postCode
        country
        countryAbbreviation
        places {
          placeName
          longitude
          state
          stateAbbreviation
          latitude
        }
      }
    }
  `
};
