import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="py-10">
      <div className="container w-3/4 mx-auto">
        <div className=" grid grid-cols-5 gap-3">
          <div className="item">
            <span className="font-semibold title inline-block mb-3">
              CHĂM SÓC KHÁCH HÀNG
            </span>
            <ul className="list-none list">
              <li>
                <a href="#">Trung Tâm Trợ Giúp</a>
              </li>
              <li>
                <a href="#">Shopee Blog</a>
              </li>
              <li>
                <a href="#">Shopee Mall</a>
              </li>
              <li>
                <a href="#">Hướng Dẫn Mua Hàng</a>
              </li>
              <li>
                <a href="#">Hướng Dẫn Bán Hàng</a>
              </li>
            </ul>
          </div>
          <div className="item">
            <span className="font-semibold mb-3 inline-block">VỀ SHOPEE</span>
            <ul className="list-none list">
              <li>
                <a href="#">Giới Thiệu Về Shopee Việt Nam</a>
              </li>
              <li>
                <a href="#">Tuyển Dụng</a>
              </li>
              <li>
                <a href="#">Điều Khoản Shopee</a>
              </li>
              <li>
                <a href="#">Chính Sách Bảo Mật</a>
              </li>
              <li>
                <a href="#">Chính Hãng</a>
              </li>
            </ul>
          </div>
          <div className="grid grid-rows-2 item_pay">
            <div className="flex flex-col">
              <span className="font-semibold mb-3 inline-block">
                THANH TOÁN
              </span>
              <div className="grid grid-cols-3 gap-2  p-3">
                <img
                  src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8"
                  alt="hinh thanh toan_1"
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16"
                  alt
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08"
                  alt
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c"
                  alt
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281"
                  alt
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09"
                  alt
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold mb-3 inline-block">
                ĐƠN VỊ VẬN CHUYỂN
              </span>
              <div className="grid grid-cols-3 gap-2  p-3">
                <img
                  src="https://down-vn.img.susercontent.com/file/vn-50009109-159200e3e365de418aae52b840f24185"
                  alt="hinh thanh toan_1"
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2"
                  alt
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/vn-50009109-64f0b242486a67a3d29fd4bcf024a8c6"
                  alt
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f"
                  alt
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c"
                  alt
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63"
                  alt
                />
              </div>
            </div>
          </div>
          <div className="">
            <span className="font-semibold mb-3 inline-block">
              THEO DÕI CHÚNG TÔI TRÊN
            </span>
            <div className="grid grid-rows-3 gap-2">
              <div>
                <a href="https://www.facebook.com/ShopeeVN" target="blank">
                  <FontAwesomeIcon icon={faFacebook} />
                  <span className="ms-2">Facebook</span>
                </a>
              </div>
              <div>
                <a href="https://instagram.com/Shopee_VN" target="blank">
                  <FontAwesomeIcon icon={faInstagram} />
                  <span className="ms-2">Instagram</span>
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/company/shopee"
                  target="blank"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                  <span className="ms-2">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          <div className="download_item">
            <span className="font-semibold mb-3 inline-block">
              TẢI ỨNG DỤNG SHOPEE NGAY THÔI
            </span>
            <div className="grid grid-cols-2">
              <img
                className="row-span-3 h-100"
                src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
                alt="qr"
              />
              <div className="grid grid-rows-3 download_detailed_item gap-3">
                <img
                  src="https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163"
                  alt="appstore"
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def"
                  alt="ggplay"
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0"
                  alt="appgallery"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
