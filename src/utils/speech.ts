export const speak = (text: string) => {
  const synth = window.speechSynthesis;
  if (!synth) return;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
};
