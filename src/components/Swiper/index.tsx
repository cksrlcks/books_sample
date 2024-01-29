"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import "swiper/css";

interface Props extends SwiperOptions {
  children: React.ReactNode;
}

export default function Slider({ children, ...props }: Props) {
  return (
    <Swiper {...props} style={{ overflow: "visible" }}>
      {React.Children.map(children, (child) => (
        <SwiperSlide style={{ width: "auto" }}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}
