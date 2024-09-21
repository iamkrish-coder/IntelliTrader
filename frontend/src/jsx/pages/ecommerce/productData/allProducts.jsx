//** Import Images */
import image01 from "../../../../assets/images/product/1.jpg";
import image02 from "../../../../assets/images/product/2.jpg";
import image03 from "../../../../assets/images/product/3.jpg";
import image04 from "../../../../assets/images/product/4.jpg";
import image05 from "../../../../assets/images/product/5.jpg";
import image06 from "../../../../assets/images/product/6.jpg";
import image07 from "../../../../assets/images/product/7.jpg";

import listImg01 from "../../../../assets/images/tab/1.jpg";
import listImg02 from "../../../../assets/images/tab/2.jpg";
import listImg03 from "../../../../assets/images/tab/3.jpg";
import listImg04 from "../../../../assets/images/tab/4.jpg";

//** Import Rating Start */
import { starOne, starTwo, starThree, starFour, starFive } from "./ProductStar";

var allProduct = [
   {
      key: "E11381DDCE6E4",
      previewImg: image01,
      imageList: [listImg01, listImg02, listImg03, listImg04],
      title: "Bitcoin: Decoding",
      rating: starOne,
      price: "761.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "B617D5334A7F4",
      previewImg: image02,
      //imageList: [listImg01, listImg02, listImg03, listImg04],
      title: "Bitcoin: Currency",
      rating: starTwo,
      price: "159.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "A5B1AC21CEFA9",
      previewImg: image03,
      //imageList: [listImg01, listImg02, listImg03, listImg04],
      title: "Bitcoin: Digital Gold",
      rating: starThree,
      price: "357.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "FB695A3B5CE53",
      previewImg: image04,
      //imageList: [listImg01, listImg02, listImg03, listImg04],
      title: "Crypto King Bitcoin",
      rating: starOne,
      price: "654.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "B3B5CE53F695A",
      previewImg: image05,
     // imageList: [listImg01, listImg02, listImg03, listImg04],
      title: "Chair Grey",
      rating: starFour,
      price: "369.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "C21CEFA9A5B1A",
      previewImg: image06,
      //imageList: [listImg01, listImg02, listImg03, listImg04],
      title: "Chair Grey",
      rating: starTwo,
      price: "245.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "D5334A7F4B617",
      previewImg: image07,
      //imageList: [listImg01, listImg02, listImg03, listImg04],
      title: "Crypto King Bitcoin",
      rating: starFour,
      price: "364.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "DDCE6EE113814",
      previewImg: image01,
      //imageList: [listImg01, listImg02, listImg03, listImg04],
      title: "FLARE DRESS",
      rating: starFive,
      price: "548.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "FB630A3B5CE53",
      previewImg: image03,
     // imageList: [listImg01, listImg02, listImg03, listImg04],
      title: "Back Bag",
      rating: starOne,
      price: "654.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "B3B5CE53F643A",
      previewImg: image01,
      //imageList: [listImg01, listImg02, listImg03, listImg04],
      title: "Bitcoin: Decoding",
      rating: starFour,
      price: "369.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "B3B5CE53F741A",
      previewImg: image06,      
      title: "Bitcoin: Currency",
      rating: starFour,
      price: "369.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
   {
      key: "B3B5CE53F125A",
      previewImg: image07,      
      title: "Crypto King Bitcoin",
      rating: starFour,
      price: "369.00",
      availability: "In stock",
      productCode: "0405689",
      brand: "Lee",
      tags: ["bags", "clothes", "shoes", "dresses"],
      des:
         "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.",
   },
];

export default allProduct;
