import React, { FC } from "react";
import rightImgPng from "@/images/our-features.png";
import Image, { StaticImageData } from "next/image";
import Badge from "@/shared/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <Image src={rightImg} alt="" />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          Beneficios
        </span>
        <h2 className="font-semibold text-4xl mt-5">Carmobile </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Información" />
            <span className="block text-xl font-semibold">
              Información detallada
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Ofrecemos información detallada, imágenes y características destacadas para que los compradores tengan una visión completa y transparente de cada automóvil. Además, todos los vehículos pasan por un riguroso proceso de verificación de seguridad.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Facilidad " />
            <span className="block text-xl font-semibold">
              Facilidad de búsqueda:
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Los filtros avanzados ahorran tiempo y esfuerzo al permitir la búsqueda de autos específicos según las preferencias del comprador, como ubicación, tipo de vehículo y kilometraje.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Ahorro" />
            <span className="block text-xl font-semibold">
              Ahorro de tiempo y costos
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Vender un automóvil en línea es más cómodo, económico y evita desplazamientos innecesarios al mostrar el vehículo a múltiples compradores.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
