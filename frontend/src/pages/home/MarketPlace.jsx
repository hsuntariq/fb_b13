import React, { useState } from "react";
import Header from "../../components/home/Header";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../../components/home/Sidebar";
import Items from "./Items";
import axios from "axios";

const MarketPlace = () => {
  const items = [
    {
      id: 1,
      price: 475,
      title: "HP Core i7 Laptop Low Price",
      location: "Rawalpindi, Pakistan",
      description:
        "HP Laptop core i7 1st generation, 4GB DDR3 RAM, 300GB HDD. 17-inch FHD display. Battery lasts 2 hours. Wifi, camera, Bluetooth, DVD all working. Issues: Hinge cover missing, and one key slightly damaged.",
      condition: "Used – like new",
      seller: {
        name: "Harun Riaz",
        joined: "2023",
      },
      imgSrc: "https://techterms.com/img/xl/laptop_586.png", // Replace with actual URL
    },
    {
      id: 2,
      price: 358,
      title: "Dell Latitude E5470",
      location: "Lahore, Pakistan",
      description:
        "Dell Latitude E5470, Intel Core i5 6th Gen, 8GB RAM, 256GB SSD. Great for office and educational use. Battery timing: 4 hours. Perfect condition.",
      condition: "Used – excellent",
      seller: {
        name: "Ali Khan",
        joined: "2021",
      },
      imgSrc: "https://www.asus.com/media/Odin/Websites/global/Series/9.png", // Replace with actual URL
    },
    {
      id: 3,
      price: 7,
      title: "Apple MacBook Pro 2015",
      location: "Karachi, Pakistan",
      description:
        "Apple MacBook Pro (Retina, 13-inch, Early 2015). Core i5, 8GB RAM, 256GB SSD. Excellent condition, no scratches, all features working perfectly.",
      condition: "Used – very good",
      seller: {
        name: "Sara Ahmed",
        joined: "2020",
      },
      imgSrc:
        "https://laptopmart.pk/wp-content/uploads/2024/10/hp-victus-15-fa1657nr-gaming-laptop-e1730109588139.png", // Replace with actual URL
    },
    {
      id: 4,
      price: 77,
      title: "Lenovo ThinkPad T430",
      location: "Faisalabad, Pakistan",
      description:
        "Lenovo ThinkPad T430, Intel Core i5 3rd Gen, 4GB RAM, 500GB HDD. Durable build, perfect for work and study. Issues: Minor scratches on body.",
      condition: "Used – good",
      seller: {
        name: "Umar Raza",
        joined: "2018",
      },
      imgSrc:
        "https://intelcorp.scene7.com/is/image/intelcorp/2-in-1-product-image-transparent-background:1920-1080?wid=576&hei=324&fmt=webp-alpha", // Replace with actual URL
    },
    {
      id: 5,
      price: 64,
      title: "HP Pavilion Gaming Laptop",
      location: "Islamabad, Pakistan",
      description:
        "HP Pavilion Gaming Laptop, Core i5 9th Gen, 8GB RAM, 1TB HDD + 128GB SSD. GTX 1050 3GB graphics card. Ideal for gaming and multimedia tasks.",
      condition: "Used – excellent",
      seller: {
        name: "Ayesha Malik",
        joined: "2022",
      },
      imgSrc: "https://mrlaptop.pk/wp-content/uploads/2022/05/1024.png", // Replace with actual URL
    },
    {
      id: 6,
      price: 26,
      title: "Acer Aspire 5742",
      location: "Peshawar, Pakistan",
      description:
        "Acer Aspire 5742, Core i3 2nd Gen, 4GB RAM, 320GB HDD. Works well for basic tasks. Battery timing: 1 hour. Issues: Slightly cracked body.",
      condition: "Used – fair",
      seller: {
        name: "Faisal Ahmed",
        joined: "2017",
      },
      imgSrc:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/9345/media-gallery/touch/gray/notebook-xps-13-9345-t-gray-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1355&qlt=100,1&resMode=sharp2&size=1355,804&chrss=full", // Replace with actual URL
    },
    {
      id: 7,
      price: 191,
      title: "Asus VivoBook 14",
      location: "Multan, Pakistan",
      description:
        "Asus VivoBook 14, Intel Core i3 10th Gen, 4GB RAM, 1TB HDD. Slim and lightweight, perfect for students and professionals.",
      condition: "Used – excellent",
      seller: {
        name: "Hassan Ali",
        joined: "2021",
      },
      imgSrc:
        "https://laptopmart.pk/wp-content/uploads/2024/07/Lenovo_V15_G3_IAP_CT1_01-e1719840815623.png", // Replace with actual URL
    },
    {
      id: 8,
      price: 25,
      title: "HP Spectre x360",
      location: "Quetta, Pakistan",
      description:
        "HP Spectre x360 Convertible Laptop, Core i7 8th Gen, 8GB RAM, 512GB SSD. Touchscreen with stylus support. Battery life: 7 hours. Like new.",
      condition: "Used – excellent",
      seller: {
        name: "Zara Khan",
        joined: "2019",
      },
      imgSrc:
        "https://www.techtarget.com/rms/onlineimages/Dell_Latitude_7320_Detachable_mobile.png", // Replace with actual URL
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleCheckOut = async (item) => {
    const response = await axios.post(
      "http://localhost:3001/api/payment/checkout",
      {
        name: item?.title,
        price: item?.price,
        imgSrc: item?.imgSrc,
      }
    );
    window.location.assign(response.data.url.url);
  };

  return (
    <>
      <Header />
      <Row>
        <Col xl={2} lg={2} md={0} className="d-none d-lg-block">
          <Sidebar />
        </Col>
        <Col
          xl={10}
          lg={10}
          md={12}
          className="p-md-5 p-sm-2 p-xl-0 p-lg-0 p-4"
        >
          <div className="container my-4">
            <h2 className="mb-4">Today's Picks</h2>
            <div className="row g-3">
              {items.map((item) => (
                <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                  <div
                    className="card h-100"
                    onClick={() => handleCardClick(item)}
                  >
                    <img
                      src={item.imgSrc}
                      className="card-img-top"
                      alt={item.title}
                      style={{
                        height: "150px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-truncate">{item.price}</h5>
                      <p className="card-text text-truncate">{item.title}</p>
                      <p className="text-muted small mb-0">{item.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal */}
            {selectedItem && (
              <div
                className="modal fade show"
                style={{ display: "block" }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="itemModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">{selectedItem.title}</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-6">
                          <img
                            src={selectedItem.imgSrc}
                            alt={selectedItem.title}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>Price:</strong> {selectedItem.price}
                          </p>
                          <p>
                            <strong>Condition:</strong> {selectedItem.condition}
                          </p>
                          <p>
                            <strong>Location:</strong> {selectedItem.location}
                          </p>
                          <p>{selectedItem.description}</p>
                          <hr />
                          <p>
                            <strong>Seller Information:</strong>
                          </p>
                          <p>{selectedItem.seller.name}</p>
                          <p>Joined Facebook in {selectedItem.seller.joined}</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div className="d-flex gap-4 align-items-center">
                        <button
                          onClick={() => handleCheckOut(selectedItem)}
                          type="button"
                          className="btn text-white btn-info"
                        >
                          Buy Now
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Backdrop for Modal */}
            {selectedItem && (
              <div
                className="modal-backdrop fade show"
                onClick={closeModal}
                style={{ cursor: "pointer" }}
              ></div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MarketPlace;
