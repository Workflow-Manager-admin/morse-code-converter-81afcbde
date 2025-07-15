import React, { useState, useRef } from 'react';
import styles from './MorseCodeConverter.module.css';

/*
  Morse code dictionary for A-Z, 0-9 and basic punctuation.
  Space: "/" in Morse.
  Only basic set for simplicity; extensible for more.
*/
const MORSE_MAP = {
  // Letters
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  // Numbers
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....',
  6: '-....', 7: '--...', 8: '---..', 9: '----.',
  // Punctuation (basic)
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
  ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
  '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/',
};

// Reverse Morse-to-Letter mapping, for decoding.
const LETTER_MAP = {};
for (const [letter, morse] of Object.entries(MORSE_MAP)) {
  LETTER_MAP[morse] = letter;
}

// PUBLIC_INTERFACE
/**
 * MorseCodeConverter - Feature-rich converter (Text <-> Morse), copy result, and responsive UI matching Figma as much as possible.
 */
function MorseCodeConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('text-to-morse'); // or 'morse-to-text'
  const [copyStatus, setCopyStatus] = useState(''); // For copy feedback
  const inputRef = useRef();

  // Utility: text → morse
  const textToMorse = (s) =>
    s
      .toUpperCase()
      .split('')
      .map((ch) =>
        Object.prototype.hasOwnProperty.call(MORSE_MAP, ch)
          ? MORSE_MAP[ch]
          : ''
      )
      .join(' ')
      .replace(/ +/g, ' ')
      .trim();

  // Utility: morse → text (splitting on spaces for letters, "/" for word boundary)
  const morseToText = (s) =>
    s
      .replace(/\//g, ' / ') // ensure spacing around slash
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map((code) => (code === '/' ? ' ' : LETTER_MAP[code] || '?'))
      .join('')
      .replace(/\s+/g, ' ')
      .replace(/^\s+|\s+$/g, '');

  // Called when user types
  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    let result;
    if (mode === 'text-to-morse') {
      result = textToMorse(value);
    } else {
      result = morseToText(value);
    }
    setOutput(result);
  };

  // Mode toggle
  const handleModeSwitch = () => {
    setMode((cur) =>
      cur === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse'
    );
    // Also reset
    setInput('');
    setOutput('');
    setCopyStatus('');
    if (inputRef.current) inputRef.current.focus();
  };

  // Copy to clipboard handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 1200);
    } catch {
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus(''), 1200);
    }
  };

  // Labels for input/output
  const inputLabel = mode === 'text-to-morse' ? 'Input (Text)' : 'Input (Morse)';
  const outputLabel = mode === 'text-to-morse' ? 'Output (Morse)' : 'Output (Text)';
  const inputPlaceholder = mode === 'text-to-morse' ? 'Type your message here' : 'Type Morse code (.- ..- -.)';
  const outputPlaceholder =
    output.length > 0 ? output : mode === 'text-to-morse' ? 'Translated Morse code' : 'Translated text';

  // Stretch: Responsive Figma-inspired layout using absolute and flex with CSS module.

  return (
    <div className={styles.figmaFrame}>
      {/* Main panel styled background */}
      <div className={styles.mainBackground}>
        {/* Responsive conversion area */}
        <div className={styles.converterArea}>
          <div className={styles.labelsRow}>
            <label className={styles.inputLabel} htmlFor="inputBox">
              {inputLabel}
            </label>
            <label className={styles.outputLabel} htmlFor="outputBox">
              {outputLabel}
            </label>
            <button
              className={styles.modeBtn}
              onClick={handleModeSwitch}
              aria-label={
                mode === 'text-to-morse'
                  ? 'Switch to Morse-to-Text'
                  : 'Switch to Text-to-Morse'
              }
            >
              ↔︎ Switch
            </button>
          </div>

          <div className={styles.areasWrap}>
            <textarea
              ref={inputRef}
              id="inputBox"
              className={styles.inputArea}
              placeholder={inputPlaceholder}
              value={input}
              spellCheck={mode === 'text-to-morse'}
              autoComplete="off"
              onChange={handleInput}
              rows={mode === 'text-to-morse' ? 3 : 4}
              aria-label={inputLabel}
              autoFocus
              dir={mode === 'morse-to-text' ? 'ltr' : undefined}
            />
            <div className={styles.outputAreaBox}>
              <div
                id="outputBox"
                className={styles.outputArea}
                tabIndex={0}
                aria-label={outputLabel}
                style={{
                  minHeight: '3em',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {outputPlaceholder}
              </div>
              <button
                className={styles.copyBtn}
                onClick={handleCopy}
                disabled={!output}
                type="button"
                aria-label="Copy translated result"
              >
                {copyStatus ? copyStatus : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Figma-background stylized keys and graphics for visual authenticity */}
      <span className={styles.inputLabel + ' ' + styles.figmaAbs}>{inputLabel}</span>
      <span className={styles.outputLabel + ' ' + styles.figmaAbs}>{outputLabel}</span>
      <span className={styles.inputPlaceholder + ' ' + styles.figmaAbs}>
        {inputPlaceholder}
      </span>
      <span className={styles.outputPlaceholder + ' ' + styles.figmaAbs}>
        {output.length > 0 ? '' : outputPlaceholder}
      </span>

      {/* Decorative keys & Figma vector UI */}
      <div className={`${styles.rectKey} ${styles.rectKey1}`}></div>
      <div className={`${styles.rectKey} ${styles.rectKey2}`}></div>
      <div className={`${styles.rectKey} ${styles.rectKey3}`}></div>
      <div className={`${styles.rectKey} ${styles.rectKey4}`}></div>
      {/* Polygon "send" icon */}
      <div className={styles.polygonKey}></div>

      {/* Top-left logo/title group */}
      <img
        className={styles.logoTitleGroup}
        src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/133b7df0-eb4b-4ce4-bda3-e3bd6570412f"
        alt="MorseCodeConverter AI"
      />

      {/* Figma visual group, right */}
      <div className={styles.group1}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/62cb76b1-374e-439d-8b8e-6f49b7baa079"
          alt="Group 1"
          style={{ width: 35, height: 51 }}
        />
      </div>
      <div className={styles.vectorGraphic}></div>
      <div className={styles.rectKey5}></div>

      {/* Key rows */}
      <div className={styles.keyRow} style={{ top: '128px' }}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9d03a0f8-9c5e-470c-ad24-148d8c129bd0"
          alt="Row1"
          style={{ width: 600, height: 98 }}
        />
      </div>
      <div className={styles.keyRow} style={{ top: '266px' }}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d2f73117-4545-499c-ae10-1e05dd574846"
          alt="Row2"
          style={{ width: 600, height: 98 }}
        />
      </div>
      <div className={styles.keyRow} style={{ top: '404px' }}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5e4d9a37-6ae0-4352-908e-d74af4263b6c"
          alt="Row3"
          style={{ width: 600, height: 98 }}
        />
      </div>
    </div>
  );
}

export default MorseCodeConverter;
