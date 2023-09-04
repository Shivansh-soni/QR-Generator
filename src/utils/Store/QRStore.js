import { create } from "zustand";

export const useQRStore = create((set) => ({
  inputText: "https://tap-n.in",
  heading: "Website URL",
  url: "https://tap-n.in",
  activeButton: 0,
  domain: "",
  generated: false,
  setGenerated: (input) => set(() => ({ generated: input })),
  setActiveButton: (input) => set(() => ({ activeButton: input })),
  setUrl: (input) => set(() => ({ url: input })),
  setUrlText: (input) => set(() => ({ heading: input })),
  setInputText: (input) => set(() => ({ inputText: input })),
  setDomain: (input) => set(() => ({ domain: input })),
}));

export const useStyleStore = create((set) => ({
  style: {
    color: "#000000",
    cornerColor: "#000000",
    cornerDotsColor: "#000000",
    dots: "classy",
    corner: "extra-rounded",
    backgroundColor: "#ffffff",
    image: "",
    cornerDots: "",
    backgroundDots: false,
    width: "180",
  },
  frame: {
    border: "",
    activate: false,
    frameColor: "#000000",
    frameStyle: "bottom",
    textColor: "#FFFFFF",
  },
  setStyle: (input) => set((state) => ({ style: input })),
  setFrame: (input) => set(() => ({ frame: input })),
}));
