import React from "react";

export const useStorage = (what, key, data = {}) => {
  if (what === "set") {
    const dataToWrite = JSON.stringify(data);
    localStorage.setItem(key, dataToWrite);
  }
  if (what === "get") {
    const receivedData = JSON.parse(localStorage.getItem(key));
    return receivedData;
  }
};
