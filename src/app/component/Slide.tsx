import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img_chatapp_1 from "../acsset/img_chatapp1-removebg.png";
import img_chatapp_2 from "../acsset/bannerchat.png";
import img_chatapp_3 from "../acsset/banner_2.png";
import Image from "next/image";
const Slide = () => {
  const [text] = useState([img_chatapp_1, img_chatapp_2, img_chatapp_3]);
  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  console.log(text);
  return (
    <>
      <div>
        <Slider {...settings}>
          {text.map((item: any, key) => (
            <div key={key}>
              <Image
                src={item}
                quality={100}
                alt="bg"
                priority={true}
                style={{
                  width: "80%",
                  height: "30%",
                }}
              ></Image>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
export default Slide;
