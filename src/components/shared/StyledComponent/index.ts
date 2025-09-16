import styled from "@emotion/styled";
import { Flex, FlexProps, Select } from "@mantine/core";

export const GridWrapperThreeCol = styled.div<{
    mb?: number;
    mt?: number;
    isMoble?: boolean;
  }>`
    display: grid;
    column-gap: 1rem;
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : `${0}px`)};
    margin-top: ${({ mt }) => (mt ? `${mt}px` : `${0}px`)};
    align-items: baseline;
    grid-template-columns: ${({ isMoble }) =>
      isMoble ? `5em 1fr 2rem` : `5em 1fr auto`};
    .attribute-container {
      display: grid;
      grid-template-columns: repeat(
        auto-fit,
        minmax(var(--column-width-min), 1fr)
      );
    }
    .date-col {
      --column-width-min: 4em;
      text-align: left;
    }
    .main-col {
      --column-width-min: 4em;
      text-align: left;
    }
    .caret-col {
      --column-width-min: 1em;
      justify-content: center;
      display: flex;
    }
  `;

  export const AvatarButton = styled.button`
  display: block;
  background: none;
  border: none;
  width: 5px;
  cursor: pointer;
`;

export const SuggestedItems = styled(Flex)<FlexProps>`
  margin-bottom: 20px;
  &:last-of-type {
    margin-bottom: 0px;
  }
  cursor: pointer;
`;
export const AvailableButton = styled.div`
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #3fb772;
  background-color: #e2f8eb;
  border-radius: 15px;
  font-weight: 700;
`;

export const SavedGroupHeader = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
  color: '#677597';
`;
export const InvestigationsContainer = styled.div`
  background-color: #fff;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 10px;
`;
export const PrescriptionContainer = styled.div`
  background-color: #fff;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 10px;
  margin-bottom: 24px;
`;

export const SearchWrapper = styled(Flex)`
  background: #ffffff;
  border-radius: 10px;
`;

export const SortSelection = styled(Select)`
  font-weight: 600 !important;
  & .mantine-Select-input {
    font-weight: 500 !important;
    &::placeholder {
      color: #051438 !important;
    }
  }
  & .mantine-Input-rightSection {
    display: none;
  }
`;