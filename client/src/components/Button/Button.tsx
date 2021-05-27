import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled, {
  css,
  StyledComponentProps,
  DefaultTheme,
} from "styled-components";
import { useAppSelector } from "app/hooks";
import { theme, getComputedBorder } from "styles/theme";
import { bounceExpand, bounceReturn } from "styles/animations";
import { clickSound } from "styles/sound";
import { border, borderActive, fabBorder, fabBorderActive } from "./borders";

enum Variants {
  default = "default",
  fab = "fab",
}

type Props = StyledComponentProps<
  "button",
  DefaultTheme,
  {
    variant?: keyof typeof Variants;
    fullWidth?: boolean;
    onClick?: () => void;
    children?: ReactNode;
  } & StyledProps,
  never
>;

export const Button = ({ onClick = () => {}, ...rest }: Props) => {
  const isSFXOn = useAppSelector((state) => state.playhouse.isSFXOn);

  const onButtonClick = () => {
    if (isSFXOn) clickSound.play();
    onClick();
  };

  return <StyledButton type="button" onClick={onButtonClick} {...rest} />;
};

type StyledProps = {
  fullWidth?: boolean;
  variant?: keyof typeof Variants;
};

const renderRegularStyles = () => {
  return css`
    transition: transform 0.2s ease;
    padding: ${theme.spacings(4)};
    border-image-slice: 4 4 3 5 fill;
    border-image-width: 5px;
    border-image-outset: 0;
    border-image-repeat: stretch stretch;
    border-image-source: ${({ theme: { isDarkMode } }) =>
      `url("${border(getComputedBorder(isDarkMode))}")`};
    min-width: 100px;
    animation: ${bounceReturn} 1s;
    &:hover {
      animation: ${bounceExpand} 1s;
      border-image-source: ${({ theme: { isDarkMode } }) =>
        `url("${borderActive(getComputedBorder(isDarkMode))}")`};
    }
    &:active {
      animation: ${bounceReturn} 1s;
      border-image-source: ${({ theme: { isDarkMode } }) =>
        `url("${borderActive(getComputedBorder(isDarkMode))}")`};
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      &:hover {
        border-image-source: ${({ theme: { isDarkMode } }) =>
          `url("${border(getComputedBorder(isDarkMode))}")`};
      }
    }
  `;
};

const renderFabStyles = () => {
  return css`
    transition: transform 0.2s ease;
    padding: ${theme.spacings(1)};
    background-repeat: no-repeat;
    background-size: contain;
    background-image: ${({ theme: { isDarkMode } }) =>
      `url("data:image/svg+xml,${fabBorder(getComputedBorder(isDarkMode))}")`};
    animation: ${bounceReturn} 1s;
    &:hover {
      animation: ${bounceExpand} 1s;
      background-image: ${({ theme: { isDarkMode } }) =>
        `url("data:image/svg+xml,${fabBorderActive(
          getComputedBorder(isDarkMode)
        )}")`};
    }
    &:active {
      animation: ${bounceReturn} 1s;
      background-image: ${({ theme: { isDarkMode } }) =>
        `url("data:image/svg+xml,${fabBorderActive(
          getComputedBorder(isDarkMode)
        )}")`};
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      &:hover {
        background-image: ${({ theme: { isDarkMode } }) =>
          `url("data:image/svg+xml,${fabBorder(
            getComputedBorder(isDarkMode)
          )}")`};
      }
    }
  `;
};

export const StyledButton = styled.button<StyledProps>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  ${({ variant = Variants.default }) =>
    variant === Variants.default ? renderRegularStyles() : renderFabStyles()}
`;

export const ButtonLink = styled.a<StyledProps>`
  text-align: center;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  ${({ variant = Variants.default }) =>
    variant === Variants.default ? renderRegularStyles() : renderFabStyles()}
`;

export const ButtonLinkNative = styled(Link)`
  ${renderRegularStyles()}
`;
