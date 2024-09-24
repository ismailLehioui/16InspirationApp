import React, { useEffect, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LandingPageComponent.css";
import Card from "./Card";
import LoadingComponent from "../LoadingComponents/LoadingComponent";
import request from "../../utils/request"; // Importer l'instance Axios

const LandingPageCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const arr = [1, 2, 3, 4];

  const settings = {
    swipe: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const url = "courses/all"; // Mettez seulement le chemin ici
    setLoading(true);

    request.get(url)
      .then((response) => {
        setCourse(response.data.course); // Utiliser response.data pour obtenir les données
        // console.log(response.data.course); // Assurez-vous que le bon contenu est affiché
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Flex direction={"column"} width="80%" p={"20px"} m={"auto"}>
      <Slider {...settings}>
        {!loading
          ? course?.map((el) => <Card {...el} key={el._id} />)
          : arr.map((el, i) => <LoadingComponent key={i} />)}
      </Slider>
    </Flex>
  );
};

export default LandingPageCarousel;
