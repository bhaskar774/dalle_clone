import { surpriseMePrompts } from "../constrants";
import FileSaver from "file-saver";

export function generateRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomIndex];

  //   check if the prompt does not comes two times in a row
  if (randomPrompt === prompt) return generateRandomPrompt(prompt);
  return randomPrompt;
}

export function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
