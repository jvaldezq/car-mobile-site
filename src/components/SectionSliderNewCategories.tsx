"use client";

import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "@/data/types";
import CardCategory3 from "@/components/CardCategory3";
import CardCategory4 from "@/components/CardCategory4";
import CardCategory5 from "@/components/CardCategory5";
import Heading from "@/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";
import { variants } from "@/utils/animationVariants";
import { useWindowSize } from "react-use";
import Guanacaste from '@/images/Guanacaste.png';
import Limon from '@/images/Limon.png';
import Alajuela from '@/images/Alajuela.png';
import Cartago from '@/images/Cartago.png';
import Heredia from '@/images/Heredia.png';
import Puntarenas from '@/images/Puntarenas.png';
import San_Jose from '@/images/San_Jose.png';

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-car-map?location=San Jose",
    name: "San Jose",
    taxonomy: "category",
    count: 723,
    thumbnail: San_Jose.src
  },
  {
    id: "2",
    href: "/listing-car-map?location=Heredia",
    name: "Heredia",
    taxonomy: "category",
    count: 420,
    thumbnail: Heredia.src,
  },
  {
    id: "3",
    href: "/listing-car-map?location=Alajuela",
    name: "Alajuela",
    taxonomy: "category",
    count: 305,
    thumbnail: Alajuela.src,
  },
  {
    id: "4",
    href: "/listing-car-map?location=Cartago",
    name: "Cartago",
    taxonomy: "category",
    count: 650,
    thumbnail: Cartago.src,
  },
  {
    id: "5",
    href: "/listing-car-map?location=Puntarenas",
    name: "Puntarenas",
    taxonomy: "category",
    count: 170,
    thumbnail: Puntarenas.src,
  },
  {
    id: "6",
    href: "/listing-car-map?location=Guanacaste",
    name: "Guanacaste",
    taxonomy: "category",
    count: 284,
    thumbnail: Guanacaste.src,
  },
  {
    id: "7",
    href: "/listing-car-map?location=Limon",
    name: "Limon",
    taxonomy: "category",
    count: 294,
    thumbnail: Limon.src,
  },
];

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Sugerencias para descubrir",
  subHeading = "Encuentra tu próximo auto por provincia",
  className = "",
  itemClassName = "",
  categories = DEMO_CATS,
  itemPerRow = 5,
  categoryCardType = "card3",
  sliderStyle = "style1",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(0);

  const windowWidth = useWindowSize().width;
  useEffect(() => {
    if (windowWidth < 320) {
      return setNumberOfitem(1);
    }
    if (windowWidth < 500) {
      return setNumberOfitem(itemPerRow - 3);
    }
    if (windowWidth < 1024) {
      return setNumberOfitem(itemPerRow - 2);
    }
    if (windowWidth < 1280) {
      return setNumberOfitem(itemPerRow - 1);
    }

    setNumberOfitem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < categories?.length - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  const renderCard = (item: TaxonomyType) => {
    return <CardCategory5 taxonomy={item} />;
    // switch (categoryCardType) {
    //   case "card3":
    //     return <CardCategory3 taxonomy={item} />;
    //   case "card4":
    //     return <CardCategory4 taxonomy={item} />;
    //   case "card5":
    //     return <CardCategory5 taxonomy={item} />;
    //   default:
    //     return <CardCategory3 taxonomy={item} />;
    // }
  };

  if (!numberOfItems) return null;

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <Heading desc={subHeading} isCenter={sliderStyle === "style2"}>
        {heading}
      </Heading>
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className={`relative flow-root`} {...handlers}>
          <div className={`flow-root overflow-hidden rounded-xl`}>
            <motion.ul
              initial={false}
              className="relative whitespace-nowrap -mx-2 xl:-mx-4"
            >
              <AnimatePresence initial={false} custom={direction}>
                {categories.map((item, indx) => (
                  <motion.li
                    className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                    custom={direction}
                    initial={{
                      x: `${(currentIndex - 1) * -100}%`,
                    }}
                    animate={{
                      x: `${currentIndex * -100}%`,
                    }}
                    variants={variants(200, 1)}
                    key={indx}
                    style={{
                      width: `calc(1/${numberOfItems} * 100%)`,
                    }}
                  >
                    {renderCard(item)}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {currentIndex ? (
            <PrevBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex - 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}

          {categories.length > currentIndex + numberOfItems ? (
            <NextBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex + 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}
        </div>
      </MotionConfig>
    </div>
  );
};

export default SectionSliderNewCategories;
