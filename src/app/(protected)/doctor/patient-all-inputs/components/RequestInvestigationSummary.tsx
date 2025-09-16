
import { momentBrowserTimezone } from '@/utils/utils';
import { Box, Flex, Text } from '@mantine/core';
import React from 'react';
import { validateTest } from './utils';
import { appColors } from '@/theme/colors';
import { GetInvestigationRequestsResponse } from '@/types/index';

interface RequestInvestigationSummaryProps {
  investigationRequest: GetInvestigationRequestsResponse[];
}

const RequestInvestigationSummary = (
  props: RequestInvestigationSummaryProps
) => {
  const { investigationRequest } = props;
  return (
    <Box className="attribute-container main-col">
      <Flex ml={16} direction={'column'} mb={10}>
        {investigationRequest?.map(
          (
            {
              name,
              urgent,
              notes,
              withContrast,
              specimen,
              bodyPart,
              views,
              specificOrganism,
              isDeleted,
              deletionTime,
              deletedUser,
            },
            indx
          ) => {
            const itemCount = investigationRequest?.length ?? 0;
            return (
              <React.Fragment key={indx}>
                <Flex wrap={'wrap'} fw={500} color="#0B0C7D">
                  {urgent && (
                    <Text
                      sx={{
                        textDecoration: isDeleted ? 'line-through' : 'none',
                        color: appColors.fadeRed,
                      }}
                    >
                      Urgent{' '}
                    </Text>
                  )}
                  <Text
                    sx={{
                      textDecoration: isDeleted ? 'line-through' : 'none',
                    }}
                  >
                    {urgent && ' - '}
                    {bodyPart || ''}{' '}
                    {validateTest(name as string, specificOrganism as string)}{' '}
                  </Text>
                  {withContrast && (
                    <Text
                      c={{ color: appColors.purple }}
                      sx={{
                        textDecoration: isDeleted ? 'line-through' : 'none',
                      }}
                      mx={2}
                    >
                      with Contrast
                    </Text>
                  )}
                  <Text
                    sx={{
                      textDecoration: isDeleted ? 'line-through' : 'none',
                    }}
                    ml={
                      notes ? 0 : specimen || specificOrganism || views ? 5 : 0
                    }
                  >
                    {'  '}
                    {specimen && ` [${specimen}]`}
                    {specificOrganism &&
                    !name?.startsWith('[Specific organism]')
                      ? ', '
                      : ''}
                    {specificOrganism &&
                    !name?.startsWith('[Specific organism]')
                      ? specificOrganism
                      : ''}
                    {views && ` [${views}] `}
                    {notes && `. ${notes}`}
                    {!isDeleted && name && indx < itemCount - 1 ? ', ' : ''}
                  </Text>
                </Flex>
                {deletedUser && (
                  <Box>
                    <Text fw={500} color={appColors.text}>
                      Deleted by {deletedUser}{' '}
                      {deletionTime === null ? (
                        ''
                      ) : (
                        <>
                          |&nbsp;
                          {momentBrowserTimezone(deletionTime as string).format(
                            'hh:mm A'
                          )}{' '}
                          {momentBrowserTimezone(deletionTime as string)
                            .startOf('day')
                            .isSame(momentBrowserTimezone().startOf('day'))
                            ? 'Today'
                            : `on ${momentBrowserTimezone(
                                deletionTime as string
                              ).format('LL')}`}
                        </>
                      )}
                    </Text>
                  </Box>
                )}
              </React.Fragment>
            );
          }
        )}
      </Flex>
    </Box>
  );
};

export default RequestInvestigationSummary;
