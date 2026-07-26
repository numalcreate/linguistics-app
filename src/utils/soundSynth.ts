// Web Audio API Formant & Noise Synthesizer for Phonetic Demonstration

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a synthesized vowel sound using two formant frequencies (F1, F2).
 */
export function playVowelSound(f1: number = 500, f2: number = 1500, duration: number = 0.6) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Glottal source (harmonic rich sawtooth wave or pulse train)
    const fundamental = 130; // ~130 Hz male/female average fundamental pitch
    const source = ctx.createOscillator();
    source.type = 'sawtooth';
    source.frequency.setValueAtTime(fundamental, now);

    // Formant 1 Filter (Bandpass)
    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(f1, now);
    filter1.Q.setValueAtTime(5, now);

    // Formant 2 Filter (Bandpass)
    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(f2, now);
    filter2.Q.setValueAtTime(6, now);

    // Envelope Gain
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Routing
    source.connect(filter1);
    source.connect(filter2);
    filter1.connect(gainNode);
    filter2.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(now);
    source.stop(now + duration + 0.05);
  } catch (err) {
    console.warn('Audio synthesis unavailable:', err);
  }
}

/**
 * Play a synthesized consonant sound (plosive, fricative, nasal, or approximant).
 */
export function playConsonantSound(
  manner: string = 'Fricative',
  voiced: boolean = false,
  place: string = 'Alveolar',
  duration: number = 0.5
) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (manner.includes('Fricative')) {
      // Noise buffer for fricatives
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Filter frequency based on place of articulation
      let cutoff = 4000;
      if (place.includes('Bilabial') || place.includes('Labiodental')) cutoff = 2000;
      if (place.includes('Postalveolar') || place.includes('Palatal')) cutoff = 3000;
      if (place.includes('Alveolar') || place.includes('Dental')) cutoff = 6000;
      if (place.includes('Velar') || place.includes('Glottal')) cutoff = 1200;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(cutoff, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);

      if (voiced) {
        // Add voiced fundamental tone
        const voiceOsc = ctx.createOscillator();
        voiceOsc.type = 'triangle';
        voiceOsc.frequency.setValueAtTime(120, now);
        const voiceGain = ctx.createGain();
        voiceGain.gain.setValueAtTime(0.15, now);
        voiceGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        voiceOsc.connect(voiceGain);
        voiceGain.connect(ctx.destination);
        voiceOsc.start(now);
        voiceOsc.stop(now + duration);
      }

      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + duration);
    } else if (manner.includes('Plosive')) {
      // Plosive release burst
      const burstOsc = ctx.createOscillator();
      burstOsc.type = 'sine';
      let burstFreq = 1500;
      if (place.includes('Bilabial')) burstFreq = 600;
      if (place.includes('Alveolar')) burstFreq = 3000;
      if (place.includes('Velar')) burstFreq = 1800;

      burstOsc.frequency.setValueAtTime(burstFreq, now);
      burstOsc.frequency.exponentialRampToValueAtTime(100, now + 0.08);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      burstOsc.connect(gain);
      gain.connect(ctx.destination);

      if (voiced) {
        const voiceOsc = ctx.createOscillator();
        voiceOsc.type = 'sine';
        voiceOsc.frequency.setValueAtTime(110, now);
        const voiceGain = ctx.createGain();
        voiceGain.gain.setValueAtTime(0.3, now);
        voiceGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        voiceOsc.connect(voiceGain);
        voiceGain.connect(ctx.destination);
        voiceOsc.start(now);
        voiceOsc.stop(now + 0.2);
      }

      burstOsc.start(now);
      burstOsc.stop(now + 0.12);
    } else {
      // Default approximant/nasal hum
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(voiced ? 140 : 280, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    }
  } catch (err) {
    console.warn('Audio synthesis unavailable:', err);
  }
}
