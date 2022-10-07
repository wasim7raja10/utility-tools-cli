const sharp = require("sharp");
const { Command } = require("./Command");
const fs = require("fs");

class AddText extends Command {
  constructor() {
    super("rt", "add short text on images", [["<path>"], ["<text>"]]);
  }

  action(pathInput, text) {
    const temp = "/";
    const files = fs.readdirSync(pathInput);
    // const text = "Watermark Image ";
    const svgImage = `
        <svg class="vg">
        <style>
        .vg{ height: 100px; width: 100%;}
        .title { fill: #ffff; font-size: 70px; font-weight: bold; }
        </style>
        <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
        </svg>
        `;
    const svgBuffer = Buffer.from(svgImage);

    files.forEach(async file => {
      await sharp(pathInput + temp + file)
        .composite([
          {
            input: svgBuffer,
            gravity: sharp.gravity.southeast,
          },
        ])
        .toFile(file.split(".")[0] + "_watermark" + ".webp");
    });
    this.result = fs.readdirSync(pathInput);
  }
}

module.exports = AddText;
