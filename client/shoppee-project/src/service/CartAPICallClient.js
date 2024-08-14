import axios from "axios";
import { DomainPath } from "../../../../admin/src/Path/path";
export const DeleteCartItem = async (userid, itemid) => {
  const response = await axios.post(
    `${DomainPath.cart}/delete-item`,
    {},
    {
      withCredentials: true,
      params: {
        userId: userid,
        itemId: itemid,
      },
    }
  );
  console.log("updated user in delete item: ", response.data.updatedUser);
  return response;
};

export const ModifyQuantity = async (index, type, itemId, user) => {
  const newCartItem = await axios.post(
    `${DomainPath.cart}/update-cart`,
    {},
    {
      withCredentials: true,
      params: {
        index,
        type,
        id: user._id,
        itemId,
      },
    }
  );
  console.log("newCartItem: ", newCartItem);
  return newCartItem;
};

export const PickedItem = async (userId, pickedItemArr) => {
  const response = await axios.post(
    `${DomainPath.cart}/delete-items`,
    {
      userId: userId,
      itemIds: pickedItemArr,
    },
    {
      withCredentials: true,
    }
  );
  console.log("updated user in delete item: ", response);
  return response;
};

export const BuyItem = async (pickedItemArr, userId) => {
  const response = await axios.post(
    `${DomainPath.cart}/buy`,
    {
      userId,
      itemIds: pickedItemArr,
    },
    {
      withCredentials: true,
    }
  );
  console.log("response in handleBuy: ", response);
  return response;
};

export const addCartItem = async (userDataFromLocal, CartItem) => {
  const response = await axios.post(
    `${DomainPath.cart}/add-cart-item`,
    CartItem,
    {
      withCredentials: true,
      params: {
        _id: userDataFromLocal._id,
      },
    }
  );
  console.log("response from add cart item: ", response);
  return response;
};
