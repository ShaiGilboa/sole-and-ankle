import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const SHOE_VARIANTS = {
  NewRelease: "new-release",
  OnSale: "on-sale",
  Default: "default",
};

const TAG_LABEL_COLOR = {
  [SHOE_VARIANTS.NewRelease]: COLORS.secondary,
  [SHOE_VARIANTS.OnSale]: COLORS.primary,
};
const TAG_LABEL_TEXT = {
  [SHOE_VARIANTS.NewRelease]: "Just Released!",
  [SHOE_VARIANTS.OnSale]: "Sale",
};

const SHOE_CARD_VARIANTS = {
  [SHOE_VARIANTS.NewRelease]: {
    color: TAG_LABEL_COLOR[SHOE_VARIANTS.NewRelease],
    text: TAG_LABEL_TEXT[SHOE_VARIANTS.NewRelease],
  },
  [SHOE_VARIANTS.OnSale]: {
    color: TAG_LABEL_COLOR[SHOE_VARIANTS.OnSale],
    text: TAG_LABEL_TEXT[SHOE_VARIANTS.OnSale],
  },
  [SHOE_VARIANTS.Default]: {},
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? SHOE_VARIANTS.OnSale
    : isNewShoe(releaseDate)
      ? SHOE_VARIANTS.NewRelease
      : SHOE_VARIANTS.Default

  const style = SHOE_CARD_VARIANTS[variant];

  if (!style) {
    throw new Error(`Unknown shoe variant: ${variant}`);
  }

  console.log({
    slug,
    name,
    imageSrc,
    price,
    salePrice,
    releaseDate,
    numOfColors,
  });

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <StyledTag style={{ "--color": style.color }}>{style.text}</StyledTag>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price sale={!!salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {salePrice ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1;
  min-width: 280px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const StyledTag = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 8px;
  background-color: var(--color);
  color: white;
  border-radius: 2px;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${({ sale }) => (sale ? "line-through" : "none")};
  color: ${({ sale }) => (sale ? COLORS.gray[700] : COLORS.gray[900])};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
