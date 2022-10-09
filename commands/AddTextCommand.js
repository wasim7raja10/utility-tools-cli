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
    files.forEach(async file => {
      try {
        const image = sharp(pathInput + temp + file);
        const metadata = await image.metadata(); // geeting metadata of image
        const width = metadata.width / 2; // getting width of image
        const height = metadata.height / 5;
        const textFontSize =
          text.length < 10 && metadata.width < 1000 ? width / 5 : width / 10; // setting font size of text

        const svgImage = `
        <svg width="${width}" height="${height}"  >
        <style>   
          .title { fill: #ffff; font-size: ${textFontSize}; font-weight: bold; }
        </style>
        <text x="50%" y="50%" text-anchor="middle"  class="title">${text}</text>
        </svg>
        `;
        const svgBuffer = Buffer.from(svgImage); // converting svg to buffer
        await image
          .composite([
            {
              input: svgBuffer,
              gravity: sharp.gravity.southeast,
            },
          ])
          .toFile(file.split(".")[0] + "_watermark" + ".webp");
      } catch (err) {
        console.error(`Failed  ${err.message}`);
      }
    });
    this.result = fs.readdirSync(pathInput);
  }
}

module.exports = AddText;
