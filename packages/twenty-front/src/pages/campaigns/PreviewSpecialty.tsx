import styled from '@emotion/styled';
import { Section } from '@react-email/components';
import { TextInput } from 'tsup.ui.index';

import { H2Title } from '@/ui/display/typography/components/H2Title';

const StyledComboInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  > * + * {
    margin-left: ${({ theme }) => theme.spacing(4)};
  }
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const StyledPreviewSpecialty = styled.span`
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  width: 100%;
`;

export const PreviewSpecialty = () => {
  return (
    <>
      <StyledPreviewSpecialty>
        <StyledComboInputContainer>
          <Section>
            <H2Title
              title="Specialty Type "
              description="Selected Specialty Type"
            />
            <TextInput
              placeholder={'Enter campaign name'}
              name="campaignName"
              value={'Healthy Joints Healthy Lives'}
              disabled
            />
          </Section>
          <Section>
            <H2Title
              title="Subspecialty Type "
              description="Selected Subspecialty of selected Specialty Type"
            />
            <TextInput
              placeholder={'Enter campaign name'}
              name="campaignName"
              value={'Healthy Joints Healthy Lives'}
              disabled
            />
          </Section>
        </StyledComboInputContainer>
      </StyledPreviewSpecialty>
    </>
  );
};