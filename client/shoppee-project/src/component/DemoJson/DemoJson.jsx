import axios from "axios";
import React, { useEffect } from "react";
import fs from "fs";
const DemoJson = () => {
  useEffect(() => {
    axios
      .get("./../../../ecommerce.json")
      .then((res) => {
        const datajson = res.data;
        console.log("json data: ", datajson);
        if (datajson) {
          const productArray = Object.entries(datajson)
            .filter(([key, value]) => key !== "_id")
            .map(([key, value]) => ({ category: key, ...value }));
          console.log("processed: ", productArray);
          const transformedData = productArray.map((item) => {
            const transformedItem = { category: item.category };

            Object.keys(item).forEach((key, index) => {
              if (key !== "category") {
                // Create a custom name for each URL field
                const customName = `product_${index}`;
                transformedItem[customName] = item[key];
              } else {
                transformedItem[key] = transformedItem[key].replace(
                  /\s*\(\d+\)/,

                  ""
                );
              }
            });

            return transformedItem;
          });
          console.log("chỉnh tên product tùy ý: ", transformedData);
          const jsonData = JSON.stringify(transformedData, null, 2); // Convert data to JSON string with formatting
          console.log("data json: ", jsonData);
          fetch("/ecommerce.json", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              console.log("Data saved successfully");
            })
            .catch((error) => {
              console.error("There was a problem saving the data:", error);
            });
        }
      })
      .catch((err) => {
        console.log("lỗi lấy json data: ", err);
      });
  });
  return <div>lấy json data</div>;
};

export default DemoJson;
