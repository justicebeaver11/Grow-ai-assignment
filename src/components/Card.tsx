/* !To move between the image carousel in the drop down menu you can use the arrow keys*/


import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./Card.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaEdit } from "react-icons/fa";

interface CardProps {
  title: string;
  description: string;
  cta: string;
  image: string;
  index: number;
  onEdit?: () => void;
}

const imageOptions = [
  "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/5/square.png",
  "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/9/square.png",
  "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png",
  "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/15/square.png",
  "https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg",
  "https://www.fujitsu.com/global/imagesgig5/ai-banner-800x450_tcm100-7204059_tcm100-6286607-32.jpg",
  "https://www.zdnet.com/a/img/resize/ca306ff391abf8e12f1bb1283538c31b83e957c2/2023/04/18/c34e2364-1512-4cf8-b89f-8156376a7fbf/particle-data-forming-ai-robot-face-stock-photo.jpg?auto=webp&fit=crop&height=360&width=640",
  "https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg",
];

const Card: React.FC<CardProps> = ({
  title,
  description,
  cta,
  image,
  index,
  onEdit,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState<string>(title);
  const [cardDescription, setCardDescription] = useState<string>(description);
  const [cardImage, setCardImage] = useState<string>(image);

  let sliderRef = React.useRef<Slider>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        sliderRef.current?.slickPrev();
      } else if (event.key === "ArrowRight") {
        sliderRef.current?.slickNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newImageUrl = URL.createObjectURL(event.target.files[0]);
      setCardImage(newImageUrl);
    }
  };

  const handleSaveChanges = () => {
    console.log("Changes saved");
    setDropdownOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cardImage;
    link.download = "downloaded-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleCTAClick = () => {
    window.location.href = "https://groweasy.ai/";
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const ctaButtonClass = `${styles.ctaButton} ${styles[`ctaButton${index + 1}`]}`;
  const titleClass = `${styles.title} ${styles[`titleStyle${index + 1}`]}`;
  const descriptionClass = `${styles.description} ${styles[`descriptionStyle${index + 1}`]}`;

  return (
    <>
      <div className={styles.card}>
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${cardImage})` }}
        >
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h2 className={titleClass}>{cardTitle}</h2>
            <p className={descriptionClass}>{cardDescription}</p>
            <div className={`${styles.flexContainer} flex items-center justify-between mt-auto`}>
              <button className={ctaButtonClass} onClick={handleCTAClick}>
                {cta}
              </button>
              <FaEdit onClick={toggleDropdown} className={styles.editIcon} />
            </div>
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdownBackdrop} onClick={toggleDropdown}>
          <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={toggleDropdown}>
              &times;
            </button>
            <h3 className={styles.dropdownTitle}>Edit Banner</h3>
            <div className={styles.imageContainer}>
              <div
                className={`${styles.bgImage} ${styles.dropdownBgImage}`}
                style={{ backgroundImage: `url(${cardImage})` }}
              >
                <div className={styles.imageContent}>
                  <h2 className={titleClass}>{cardTitle}</h2>
                  <p className={descriptionClass}>{cardDescription}</p>
                  <button className={ctaButtonClass}>{cta}</button>
                </div>
              </div>
            </div>
            <Slider ref={sliderRef} {...settings} className={styles.imageList}>
              {imageOptions.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Option ${index + 1}`}
                  className={imgUrl === cardImage ? styles.selected : ""}
                  onClick={() => setCardImage(imgUrl)}
                />
              ))}
            </Slider>
            <label className={`${styles.label} block mb-4`}>
              Upload Image:
              <input
                type="file"
                onChange={handleImageChange}
                className={styles.input}
              />
            </label>
            <label className={`${styles.label} block mb-4`}>
              Change Title:
              <input
                type="text"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                className={styles.input}
              />
            </label>
            <label className={`${styles.label} block mb-4`}>
              Change Description:
              <input
                type="text"
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                className={styles.input}
              />
            </label>
            <div className={styles.dropdownActions}>
              <button className={styles.doneButton} onClick={handleSaveChanges}>
                Done
              </button>
              <button
                className={styles.downloadButton}
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
















