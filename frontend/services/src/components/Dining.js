import React, { useState } from "react";
import Navbar from "../navbar";
import diningimg from "../assets/food.jpg";

function Dining() {
  const [selectedMenu, setSelectedMenu] = useState("breakfast");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Navbar />
      <header
        style={{
          textAlign: "center",
          padding: "10px 0",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${diningimg})`,
          WebkitBackgroundSize: "100% 100%",
          color: "white",
          marginTop: "90px",
        }}
      >
        <h1>Dining Menu</h1>
        <p>(BLOCK A / BLOCK B / BLOCK C)</p>
      </header>

      <section
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          gap: "200px",
          marginBottom: "40px",
          flexWrap: "wrap", // Added for responsive behavior
        }}
      >
        <MenuSection
          title="☕ BREAKFAST"
          isActive={selectedMenu === "breakfast"}
          onClick={() => handleMenuClick("breakfast")}
        />
        <MenuSection
          title="🍛 LUNCH"
          isActive={selectedMenu === "lunch"}
          onClick={() => handleMenuClick("lunch")}
        />
        <MenuSection
          title="🍽 DINNER"
          isActive={selectedMenu === "dinner"}
          onClick={() => handleMenuClick("dinner")}
        />
      </section>

      <div style={{ marginTop: "20px" }}>
        {selectedMenu === "breakfast" && <BreakfastMenu />}
        {selectedMenu === "lunch" && <LunchMenu />}
        {selectedMenu === "dinner" && <DinnerMenu />}
      </div>
    </div>
  );
}

function MenuSection({ title, isActive, onClick }) {
  return (
    <div
      style={{
        margin: "0 15px",
        cursor: "pointer",
        position: "relative",
        paddingBottom: "5px",
        fontFamily: "Georgia, serif",
        fontSize: "1.2em",
        color: isActive ? "#2c3e50" : "#555",
      }}
      onClick={onClick}
    >
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      {isActive && (
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-35%)",
            width: "50%",
            height: "4px",
            backgroundColor: "#2c3e50",
            borderRadius: "2px",
          }}
        />
      )}
    </div>
  );
}

function BreakfastMenu() {
  return (
    <MenuItems
      items={[
        {
          title: "Breakfast Menu No. 1",
          price: "₹100 + GST",
          items: ["Paratha with Curd", "Bread Butter Jam", "Fruits", "Tea/Coffee"],
        },
        {
          title: "Breakfast Menu No. 2",
          price: "₹120 + GST",
          items: ["Pancakes", "Omelette", "Fresh Juice", "Yogurt with Honey"],
        },
        {
          title: "Breakfast Menu No. 3",
          price: "₹150 + GST",
          items: ["Idli with Sambar", "Dosa", "Coconut Chutney", "Filter Coffee"],
        },
      ]}
    />
  );
}

function LunchMenu() {
  return (
    <MenuItems
      items={[
        {
          title: "Lunch Menu No. 1",
          price: "₹150 + GST",
          items: ["Soup", "Paneer", "Dry Vegetable", "Dal Makhni", "Rice", "Salad"],
        },
        {
          title: "Lunch Menu No. 2",
          price: "₹175 + GST",
          items: ["Juice", "Soup", "Paneer", "Dry Vegetable", "Rice", "Salad"],
        },
        {
          title: "Lunch Menu No. 3 (Non Veg.)",
          price: "₹210 + GST",
          items: ["Juice", "Egg curry", "Vegetable", "Dal", "Rice", "Salad"],
        },
      ]}
    />
  );
}

function DinnerMenu() {
  return (
    <MenuItems
      items={[
        {
          title: "Dinner Menu No. 1",
          price: "₹200 + GST",
          items: ["Soup", "Grilled Chicken", "Biryani", "Raita", "Salad"],
        },
        {
          title: "Dinner Menu No. 2",
          price: "₹220 + GST",
          items: ["Soup", "Fish Curry", "Rice", "Chapatti", "Dessert"],
        },
        {
          title: "Dinner Menu No. 3",
          price: "₹250 + GST",
          items: ["Soup", "Lamb Curry", "Naan", "Salad", "Gulab Jamun"],
        },
      ]}
    />
  );
}

function MenuItems({ items }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {items.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          price={item.price}
          items={item.items}
        />
      ))}
    </div>
  );
}

function MenuItem({ title, price, items }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        flex: "1 1 300px",
        border: isHovered ? "2px solid orange" : "1px solid #ddd",
        borderRadius: "5px",
        padding: "10px",
        minWidth: "280px",
        transition: "border-color 0.3s ease", // Transition for smooth border color change
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <h4 style={{ fontSize: "1em", fontWeight: "bold", color: "#333" }}>
          {title}
        </h4>
        <span style={{ color: "#555", fontWeight: "bold" }}>{price}</span>
      </div>
      <ul style={{ paddingLeft: "20px", color: "#555", margin: 0 }}>
        {items.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "5px" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dining;
