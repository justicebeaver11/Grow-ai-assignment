import React from "react";
import Card from "@/components/Card";
import styles from "@/components/Card.module.css";

const cardData = [
  {
    title: "Boost Your Leads",
    description: "Harness AI for Effective Campaigns",
    cta: "Learn More",
    image:
      "https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg",

    
  },
  {
    title: "Boost Your Leads",
    description: "Harness AI for Effective Campaigns",
    cta: "Learn More",
    image:
      "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/9/square.png",

    
  },
  {
    title: "Boost Your Leads",
    description: "Harness AI for Effective Campaigns",
    cta: "Learn More",
    image:
      "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png",

    
  },
  {
    title: "Boost Your Leads",
    description: "Harness AI for Effective Campaigns",
    cta: "Learn More",
    image:
      "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/15/square.png",

    
  },
];

const Home: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#48AAAD",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className={styles.container}>
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            cta={card.cta}
            image={card.image}
            index={index}
            onEdit={() => console.log("Edit button clicked")}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
