import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import imagePng from "@/images/hero-right.png";

export interface LogoProps {
  img?: StaticImageData;
  imgLight?: StaticImageData;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "w-24",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      {/*<LogoSvgLight />*/}
      {/*<LogoSvg />*/}

      {img ? (
          <Image className={`block max-h-12 ${imgLight ? "dark:hidden" : ""}`} src={img} alt="Logo" priority />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
          <Image className="hidden max-h-12 dark:block" src={imgLight} alt="Logo-Light" priority />
      )}
    </Link>
  );
};

export default Logo;
