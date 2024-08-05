import React, { useEffect, useState } from "react";
import "./checkBox.css";
import axios from "axios";
import { updateUserInformation } from "../../redux/userReducer";
import { useDispatch } from "react-redux";
import CustomModal from "../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { ConvertNumber, formatNumber } from "../../utils/ParseNumber";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { setLocalStorageItem } from "../../utils/localStorage";

const Cart = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  console.log("localuser: ", localUser);
  const Cart = localUser.cartItems;

  console.log("Cart: ", Cart);
  const [isChecked, setIsChecked] = useState(
    new Array(Cart.length).fill(false)
  );
  console.log("ischecked: ", isChecked);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [render, setRender] = useState(0);
  const [pickedItem, setPickedItem] = useState(new Array(Cart.length).fill(0));
  const dispatch = useDispatch();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const titleCss = "text-gray-500, text-sm, text-center";
  const alignHeight = " text-center my-auto";
  const modifyQuantity = "px-3 leading-9 bg-gray-300 border border-gray-500";

  // useEffect(() => {
  //   let newPickedItems = [];
  //   isChecked.forEach((item, index) => {
  //     if (item) {
  //       console.log("quantity: ", Cart[index].quantity);
  //       newPickedItems.push(
  //         Number(ConvertNumber(Cart[index].price)) * Cart[index].quantity
  //       );
  //     }
  //   });
  //   setPickedItem(newPickedItems);
  // }, [Cart]);

  const handleCheckboxChange = (index, price) => {
    let newIsCheckedArr = [...isChecked];
    let newPickedItems = [...pickedItem];
    newIsCheckedArr[index] = !isChecked[index];
    if (!isChecked[index]) {
      newPickedItems[index] = price * Cart[index].quantity;
    } else {
      newPickedItems[index] = 0;
    }
    setPickedItem(newPickedItems);
    setIsChecked(newIsCheckedArr);
    if (newIsCheckedArr.every((num) => num === true)) setIsAllChecked(true);
    else setIsAllChecked(false);
  };

  console.log("re render");

  const handleDeleteCartItem = async (itemid, userid = localUser._id) => {
    try {
      let deletedId;
      Cart.forEach((item, index) => {
        if (item._id === itemid) {
          deletedId = index;
        }
      });
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/delete-item",
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
      const newPickedCartItem = [...pickedItem];
      newPickedCartItem[deletedId] = 0;
      setPickedItem(newPickedCartItem);
      dispatch(updateUserInformation(response.data.updatedUser));
      setRender(render + 1);
    } catch (error) {
      console.log("error from deleting cart item!", error);
    }
  };

  const handleModifyQuantity = async (index, type, itemId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user id: ", user);
      if (!user || !user._id) {
        throw new Error("User not found in localStorage");
      }
      const newCartItem = await axios.post(
        "http://localhost:8000/api/v1/user/update-cart",
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
      if (isChecked[index]) {
        const newPickedCartItems = [...pickedItem];
        const { price, quantity } =
          newCartItem.data.updatedUser.cartItems[index];
        newPickedCartItems[index] = Number(ConvertNumber(price)) * quantity;
        setPickedItem(newPickedCartItems);
      }
      dispatch(updateUserInformation(newCartItem.data.updatedUser));
      setLocalStorageItem("user", newCartItem.data.updatedUser);
      setRender(render + 1);
    } catch (error) {
      console.log("error in update cart: ", error);
    }
  };

  const renderToTalPrice = () => {
    let res = 0;
    pickedItem.forEach((item) => {
      res += item;
      console.log("res: ", res);
    });
    return formatNumber(res);
  };

  const renderMinusButton = (value, itemid, index) => {
    if (value === 1) {
      return (
        <CustomModal
          reason="Xóa món hàng"
          contents="Bạn có chắc muốn xóa món hàng này?"
          type="delCartItem"
          handleDeleteCartItem={handleDeleteCartItem}
          buttonName="-"
          userId={localUser._id}
          itemId={itemid}
        />
      );
    } else
      return (
        <button
          className={`${modifyQuantity} hover:bg-gray-200`}
          onClick={() => handleModifyQuantity(index, "false", itemid)}
        >
          -
        </button>
      );
  };

  const renderNumberOfPickedItem = () => {
    const count = pickedItem.filter((item) => {
      return item !== 0;
    });
    return count.length;
  };

  const renderCartItems = () => {
    return Cart.map((item, index) => {
      return (
        <div
          className="grid grid-cols-8 p-5 bg-white my-5 boxShadowTitle"
          key={item._id}
        >
          <div className="firstItem flex items-center gap-2 col-span-4">
            <div className="firstItem_infor flex  space-x-1">
              <span className="checkbox_container col-span-4">
                <label className="custom-checkbox-container">
                  <input
                    type="checkbox"
                    checked={isChecked[index]}
                    onChange={() =>
                      handleCheckboxChange(
                        index,
                        Number(ConvertNumber(item.price))
                      )
                    }
                  />
                  <span className="custom-checkbox"></span>
                </label>
                <span className="mx-5"></span>
              </span>
              <div>
                <img
                  src={item.thumb}
                  alt="anh thumb"
                  className="w-24 object-contain"
                />
              </div>
              <div className="pt-3 max-w-52">
                <span className="mb-1 inline-block">{item.name}</span>
                <br />
                <span className="mb-1 inline-block py-1 border border-red-600 px-1 text-sm text-red-600">
                  Đổi trả miễn phí 15 ngày
                </span>
                <div>
                  <img
                    src="https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lxwb8gbt10ij99"
                    alt="hinh giam gia"
                    className="h-5"
                  />
                </div>
              </div>
            </div>
            <div className="firstItem_category text-gray-500">
              <p className="mb-0">Phân Loại Hàng: </p>
              <span>Vàng</span>
            </div>
          </div>
          <span className={`${alignHeight} text-red-500`}>{item.price}</span>
          <p className={`flex h-9 mx-auto ${alignHeight}`}>
            {renderMinusButton(item.quantity, item._id, index)}
            <span className={`${modifyQuantity}`}>{item.quantity}</span>
            <button
              className={`${modifyQuantity} hover:bg-gray-200`}
              onClick={() => handleModifyQuantity(index, "true", item._id)}
            >
              +
            </button>
          </p>
          <span className={`${alignHeight} text-red-500`}>
            {formatNumber(ConvertNumber(item.price) * item.quantity)}
          </span>
          <button
            className={`text-white w-8 h-8 text-center px-2 py-2 leading-5 bg-red-600 mx-auto rounded-md my-auto hover:bg-red-400`}
            onClick={() => handleDeleteCartItem(item._id)}
          >
            X
          </button>
        </div>
      );
    });
  };

  const handleAllChecked = () => {
    setIsAllChecked((prev) => {
      if (!prev === true) {
        setIsChecked(new Array(Cart.length).fill(true));
        let newPickedItem = [];
        Cart.forEach((item) => {
          newPickedItem.push(Number(ConvertNumber(item.price)) * item.quantity);
        });
        setPickedItem(newPickedItem);
      } else {
        setPickedItem(new Array(Cart.length).fill(0));
        setIsChecked(new Array(Cart.length).fill(false));
      }
      return !prev;
    });
  };

  const handleDeletePickedItem = async (userId) => {
    if (isChecked.every((num) => num === false)) handleShowWarning();
    else {
      try {
        let pickedItemArr = [],
          pickedIndexItem = [];
        Cart.forEach((item, index) => {
          console.log("item: ", item);
          if (isChecked[index]) {
            console.log("item._id: ", item._id);
            pickedItemArr.push(item._id);
            pickedIndexItem.push(index);
          }
        });
        console.log("pickedItemArr: ", pickedItemArr);
        const response = await axios.post(
          "http://localhost:8000/api/v1/user/delete-items",
          {
            userId: userId,
            itemIds: pickedItemArr,
          },
          {
            withCredentials: true,
          }
        );
        console.log("updated user in delete item: ", response);

        setLocalStorageItem("user", response.data.updatedUser);
        setIsChecked(
          new Array(Cart.length - pickedIndexItem.length).fill(false)
        );
        setPickedItem(new Array(Cart.length - pickedIndexItem.length).fill(0));
      } catch (error) {
        console.log("error from handle delete picked item: ", error);
      }
    }
  };

  const handleShowWarning = () => {
    setShowDeleteWarning(true);
    setTimeout(() => {
      setShowDeleteWarning(false);
    }, 2000);
  };

  const handleBuy = async (userId) => {
    if (isChecked.every((item) => item === false)) handleShowWarning();
    else {
      let pickedItemArr = [],
        pickedIndexItem = [];
      Cart.forEach((item, index) => {
        console.log("item: ", item);
        if (isChecked[index]) {
          console.log("item._id: ", item._id);
          pickedItemArr.push(item._id);
          pickedIndexItem.push(index);
        }
      });
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/user/buy",
          {
            userId,
            itemIds: pickedItemArr,
          },
          {
            withCredentials: true,
          }
        );
        console.log("response in handleBuy: ", response);
        setLocalStorageItem("user", response.data.updatedUser);
        setIsChecked(
          new Array(Cart.length - pickedIndexItem.length).fill(false)
        );
        setPickedItem(new Array(Cart.length - pickedIndexItem.length).fill(0));
      } catch (error) {
        console.log("error in handleBuy: ", error);
      }
    }
  };
  return (
    <>
      <div
        className={`w-48 h-20 flex flex-col justify-center items-center bg-slate-400 rounded-md text-center warningDeleteEmpty ${
          showDeleteWarning ? "inline-block" : "hidden"
        }`}
        // style={{ lineHeight: "80px" }}
      >
        <FontAwesomeIcon
          icon={faExclamation}
          className="w-5 h-5 rounded-full bg-gray-300 p-1"
        />
        <span>Vui lòng chọn sản phẩm</span>
      </div>
      <div className="bg-gray-300 py-3">
        <div className="container_">
          <div className="grid grid-cols-8 p-5 bg-white my-5 boxShadowTitle">
            <span className="checkbox_container col-span-4">
              <label className="custom-checkbox-container">Sản phẩm</label>
              <span className="mx-5"></span>
            </span>
            <span className={titleCss}>Đơn giá</span>
            <span className={titleCss}>Số lượng</span>
            <span className={titleCss}>Số tiền</span>
            <span className={titleCss}>Thao tác</span>
          </div>
          {renderCartItems()}

          <div className="container_">
            <div className="topMost grid grid-cols-2 pt-3 bg-gray-200 border-b-gray-300 border">
              <div className=""></div>
              <div className="flex justify-between ps-14 pe-6">
                <span>
                  <FontAwesomeIcon
                    icon={faTicket}
                    className="w-5 object-contain text-orange-500 me-2"
                  />
                  <span>Shopee Voucher</span>
                </span>
                <p
                  style={{ color: "#0055AA" }}
                  className="hover:cursor-pointer "
                >
                  Chọn hoặc nhập mã
                </p>
              </div>
            </div>
            <div className="middlePart grid grid-cols-2 py-3 bg-gray-200 border-b-gray-300 border">
              <div></div>
              <div className="flex justify-between ps-4 pe-6">
                <div className="flex justify-around items-center">
                  <span className="checkbox_container col-span-4">
                    <label className="custom-checkbox-container">
                      <input type="checkbox" className="input--disable" />
                      <span className="custom-checkbox w-5 h-5 cursor-no-drop custome-checkbox-disable bg-gray-200"></span>
                    </label>
                    <span className="mx-5"></span>
                  </span>
                  <span className="me-2">
                    <FontAwesomeIcon
                      icon={faS}
                      className="opacity-30 w-4 h-4 object-contain text-yellow-500 border-2 border-yellow-500 rounded-full "
                    />
                  </span>
                  <p className="mb-0 me-3 text-gray-200">shopee xu</p>
                  <p className="mb-0">Bạn chưa có shopee xu</p>
                </div>
                <span>0đ</span>
              </div>
            </div>
            <div className="bottomMost flex justify-between py-4 bg-gray-200 border-b-gray-300 border ">
              <div className="bottomMost_left flex items-center justify-around space-x-3">
                <span className="checkbox_container col-span-4 ms-4">
                  <label className="custom-checkbox-container">
                    <input
                      type="checkbox"
                      checked={isAllChecked}
                      onChange={handleAllChecked}
                    />
                    <span className="custom-checkbox"></span>
                  </label>
                  <span className="mx-5"></span>
                </span>
                <span
                  className="hover:cursor-pointer"
                  onClick={handleAllChecked}
                >
                  Chọn tất cả ({Cart.length})
                </span>
                <span
                  className="text-red-500 hover:cursor-pointer"
                  onClick={() => handleDeletePickedItem(localUser._id)}
                >
                  Xóa
                </span>
              </div>
              <div className="bottomMost_right pe-6">
                <span className="space-x-3">
                  Tổng thanh toán ({renderNumberOfPickedItem()} Sản phẩm):
                  <span className="text-red-600 ms-2">
                    đ{renderToTalPrice()}
                  </span>
                  <button
                    className="py-3 px-6 bg-orange-500 text-white rounded-sm hover:bg-orange-400"
                    onClick={() => handleBuy(localUser._id)}
                  >
                    Mua Hàng
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
