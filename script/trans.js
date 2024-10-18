module.exports.config = {
  name: "trans",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "Text translation",
  usages: "trans [tl, en] [promt]",
  credits: "𝗔𝗘𝗦𝗧𝗛𝗘𝗥",
  cooldowns: 5,
};
module.exports.run = async ({
  api,
  event,
  args,
  prefix
}) => {
  const request = require("request");
  const targetLanguage = args[0];
  const content = args.slice(1).join(" ");
  try {
    if (content.length === 0 && event.type !== "message_reply") return api.sendMessage(`🚧 𝗥𝗘𝗣𝗟𝗬 or 𝗣𝗥𝗢𝗩𝗜𝗗𝗘 𝗧𝗘𝗫𝗧\n\n⭕trans + [PROMPT] `, event.threadID, event.messageID);
    let translateThis, lang;
    if (event.type === "message_reply") {
      translateThis = event.messageReply.body;
      lang = targetLanguage || 'fr';
    } else {
      translateThis = content;
      lang = targetLanguage || 'fr';
    }
    return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
      if (err) return api.sendMessage("An error has occurred!", event.threadID, event.messageID);
      const retrieve = JSON.parse(body);
      let text = '';
      retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
      const fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0];
      api.sendMessage(`ฅ^•ﻌ•^ฅ 𝗧𝗥𝗔𝗡𝗦𝗟𝗔𝗧𝗜𝗢𝗡 :\n\n${text}\n - ⌨︎ ${fromLang} to ${lang}`, event.threadID, event.messageID);
    });
  } catch (error) {
    api.sendMessage(error.message, event.threadID, event.messageID);
  }
};
