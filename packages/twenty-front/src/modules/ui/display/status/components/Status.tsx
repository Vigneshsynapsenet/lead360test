import styled from '@emotion/styled';

import { ThemeColor } from '@/ui/theme/constants/MainColorNames';
import { themeColorSchema } from '@/ui/theme/utils/themeColorSchema';

const StyledStatus = styled.h3<{
  color: ThemeColor;
  weight: 'regular' | 'medium';
}>`
  align-items: center;
  background: ${({ color, theme }) => theme.tag.background[color]};
  border-radius: ${({ theme }) => theme.border.radius.pill};
  color: ${({ color, theme }) => theme.tag.text[color]};
  display: inline-flex;
  font-size: ${({ theme }) => theme.font.size.md};
  font-style: normal;
  font-weight: ${({ theme, weight }) => theme.font.weight[weight]};
  gap: ${({ theme }) => theme.spacing(1)};
  height: ${({ theme }) => theme.spacing(5)};
  margin: 0;
  overflow: hidden;
  padding: 0 ${({ theme }) => theme.spacing(2)};

  &:before {
    background-color: ${({ color, theme }) => theme.tag.text[color]};
    border-radius: ${({ theme }) => theme.border.radius.rounded};
    content: '';
    display: block;
    flex-shrink: 0;
    height: ${({ theme }) => theme.spacing(1)};
    width: ${({ theme }) => theme.spacing(1)};
  }
`;

const StyledContent = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

type StatusProps = {
  className?: string;
  color: ThemeColor;
  text: string;
  onClick?: () => void;
  weight?: 'regular' | 'medium';
};

export const Status = ({
  className,
  color,
  text,
  onClick,
  weight = 'regular',
}: StatusProps) => (
  <StyledStatus
    className={className}
    color={themeColorSchema.catch('gray').parse(color)}
    onClick={onClick}
    weight={weight}
  >
    <StyledContent>{text}</StyledContent>
  </StyledStatus>
);
