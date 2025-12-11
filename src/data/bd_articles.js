// base de datos de los artículos
// Importamos las imágenes
// LION KING imports
import tshirt1_lk from "../img/merch/lk/tshirt1.png";
import tshirt2_lk from "../img/merch/lk/tshirt3.webp";
import swear1_lk from "../img/merch/lk/sweatshirt1.webp";
import swear2_lk from "../img/merch/lk/sweatshirt2.webp";
import pijama_lk from "..//img/merch/lk/pijama.png";
import vest_lk from "../img/merch/lk/vest.png";
import back_lik from "../img/merch/lk/backpack_lk.png";
import mug_lk from "../img/merch/lk/mug_lk.webp";
import bottle_lk from "../img/merch/lk/bottle_lk.png";
// WICKED imports
import tshirt1_wk from "../img/merch/wick/tshirt1_wk.png";
import tshirt2_wk from "../img/merch/wick/tshirt2_wk.png";
import long_wk from "../img/merch/wick/long_wk.png";
import bean_wk from "../img/merch/wick/beani_wk.png";
import tote_wk from "../img/merch/wick/tote_wk.png";
import pouch_wk from "../img/merch/wick/pouch_wk.png";
import button_wk from "../img/merch/wick/button_wk.png";
// ALADDIN imports
import tshirt_aladd from "../img/merch/aladd/tshirt1_aladd.webp";
import zip_aladd from "../img/merch/aladd/ziphoodie_aladd.webp";
import sweat_aladd from "../img/merch/aladd/sweat1_aladd.webp";
import poster_aladd from "../img/merch/aladd/poster1_aladd.png";
import keychain_aladd from "../img/merch/aladd/keychain_aladd.webp";
import genie_aladd from "../img/merch/aladd/genie_aladd.webp";
// WEST SIDE STORY imports
import mug_wss from "../img/merch/wss/mug_wss.png";
import makeupbag_wss from "../img/merch/wss/makeupbag_wss.webp";
import tshirt_wss from "../img/merch/wss/tshirt_wss.png";
import vinil_wss from "../img/merch/wss/vinil_wss.webp";
// MISERABLES imports
import tshirt_mis from "../img/merch/mis/tshirt1_mis.png";
import tshirt2_mis from "../img/merch/mis/tshirt2_mis.png";
import keychain_mis from "../img/merch/mis/keychain_mis.png";
import tote_mis from "../img/merch/mis/tote_mis.png";


export const PRODUCTS_DB = [
  {
      id: 1,
      name: 'LION KING SWEATSHIRT',
      img: swear1_lk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 55.99,
      tag: 'Lion King',
  },
  {
      id: 2,
      name: 'ALADDIN ZIP-SHIRT',
      img: zip_aladd,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 62.5,
      tag: 'Aladdin',
  },
  {
      id: 3,
      name: 'ALADDIN SWEATSHIRT',
      img: sweat_aladd,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 58,
      tag: 'Aladdin',
  },
  {
      id: 4,
      name: 'LION KING FUR SWEAT',
      img: swear2_lk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 59.9,
      tag: 'Lion King',
  },
  {
      id: 5,
      name: 'LION KING VEST',
      img: vest_lk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 54.99,
      tag: 'Lion King',
  },
  {
      id: 6,
      name: 'LION KING T-SHIRT',
      img: tshirt1_lk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 32.99,
      tag: 'Lion King',
  },
  {
      id: 7,
      name: 'WICKED T-SHIRT',
      img: tshirt1_wk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 29.5,
      tag: 'Wicked',
  },
  {
      id: 8,
      name: 'ALADDIN T-SHIRT',
      img: tshirt_aladd,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 31,
      tag: 'Aladdin',
  },
  {
      id: 9,
      name: 'LES MISÉRABLES T-SHIRT',
      img: tshirt_mis,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 30.99,
      tag: 'Les Misérables',
  },
  {
      id: 10,
      name: 'WEST SIDE STORY T-SHIRT',
      img: tshirt_wss,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 33.5,
      tag: 'West Side Story',
  },
  {
      id: 11,
      name: 'LION KING T-SHIRT',
      img: tshirt2_lk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 32.99,
      tag: 'Lion King',
  },
  {
      id: 12,
      name: 'LES MISÉRABLES T-SHIRT',
      img: tshirt2_mis,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 28.99,
      tag: 'Les Misérables',
  },
  {
      id: 13,
      name: 'WICKED T-SHIRT',
      img: tshirt2_wk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 29.5,
      tag: 'Wicked',
  },
  {
      id: 14,
      name: 'WICKED LONG SLEEVES SHIRT',
      img: long_wk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 38,
      tag: 'Wicked',
  },
  {
      id: 15,
      name: 'ALADDIN GENIE FIGURE',
      img: genie_aladd,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 34.9,
      tag: 'Aladdin',
  },
  {
      id: 16,
      name: 'LION KING PIJAMA SET',
      img: pijama_lk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 39,
      tag: 'Lion King',
  },
  {
      id: 17,
      name: 'LION KING BACKPACK',
      img: back_lik,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 45,
      tag: 'Lion King',
  },
  {
      id: 18,
      name: 'WICKED BEANI',
      img: bean_wk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 30.5,
      tag: 'Wicked',
  },
  {
      id: 19,
      name: 'WEST SIDE STORY MUG',
      img: mug_wss,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 18.99,
      tag: 'West Side Story',
  },
  {
      id: 20,
      name: 'WICKED POUCHE',
      img: pouch_wk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 20.5,
      tag: 'Wicked',
  },
  {
      id: 21,
      name: 'LES MISÉRABLES TOTEBAG',
      img: tote_mis,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 22,
      tag: 'Les Misérables',
  },
  {
      id: 22,
      name: 'WICKED TOTE BAG',
      img: tote_wk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 21.5,
      tag: 'Wicked',
  },
  {
      id: 23,
      name: 'LION KING BOTTLE',
      img: bottle_lk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 25,
      tag: 'Lion King',
  },
  {
      id: 24,
      name: 'LION KING MUG',
      img: mug_lk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 17.99,
      tag: 'Lion King',
  },
  {
      id: 25,
      name: 'WEST SIDE STORY MAKEUP BAG',
      img: makeupbag_wss,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 23.9,
      tag: 'West Side Story',
  },
  {
      id: 26,
      name: 'WEST SIDE STORY VINIL',
      img: vinil_wss,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 26.99,
      tag: 'West Side Story',
  },
  {
      id: 27,
      name: 'ALADDIN POSTER',
      img: poster_aladd,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 24.5,
      tag: 'Aladdin',
  },
  {
      id: 28,
      name: 'LES MISÉRABLES KEYCHAIN',
      img: keychain_mis,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 12.99,
      tag: 'Les Misérables',
  },
  {
      id: 29,
      name: 'ALADDIN KEYCHAIN',
      img: keychain_aladd,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 14,
      tag: 'Aladdin',
  },
  {
      id: 30,
      name: 'WICKED BUTTON PACK',
      img: button_wk,
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 15.5,
      tag: 'Wicked',
  },
];