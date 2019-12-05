const gm = require("gm").subClass({
  imageMagick: true
});
const gmToBuffer = require("../utils/gmbuffer.js");
const fs = require("fs");

exports.run = async (message) => {
  message.channel.sendTyping();
  const image = await require("../utils/imagedetect.js")(message);
  if (image === undefined) return `${message.author.mention}, you need to provide an image to make a GameXplain thumbnail meme!`;
  const template = "./assets/images/gamexplain.png";
  const path = `/tmp/${Math.random().toString(36).substring(2, 15)}.${image.type}`;
  require("util").promisify(fs.writeFile)(path, image.data);
  const command = gm(template).out("-background").out("white").out("-gravity").out("Center").out("(").out("-clone").out("0").out("(").out(path).out("-virtual-pixel").out("transparent").out("-resize").out("1181x571!").out(")").out("-geometry").out("+0+40").out("-composite").out(")").out("+swap").out("-composite");
  const resultBuffer = await gmToBuffer(command);
  return message.channel.createMessage("", {
    file: resultBuffer,
    name: "gamexplain.png"
  });
};

exports.aliases = ["gx"];
exports.category = 5;
exports.help = "Makes a GameXplain thumbnail from an image";